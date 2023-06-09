import express from "express";
import db from "../db/conn.mjs";
import { v4 as uuidv4 } from 'uuid';
import hash from "./utils/checkHash.mjs";
import validateSession from "./utils/validateSession.mjs";
import AddFriend from "./utils/addFriend.mjs";
import getUser from "./utils/getCurrent.mjs";
import UserExists from "./utils/userExists.mjs";

const router = express.Router();

router.post("/signup", async(req,res) => {
    let collection = await db.collection("users");

    let {username,password,email} = req.body;
    const hashedString = hash(username + password);
    let checkUsername = await collection.findOne({user: username});
    let checkEmail = await(collection.findOne({emai: email}));

    if (checkUsername || checkEmail){
        res.status(401).send("Username or email not available");
    }
    else{
        const userEntry = {user: username, hash: hashedString, email: email, friends: []};
        collection.insertOne(userEntry);
        res.status(200).send("User Created");
    }
})

router.post("/login", async (req,res) => {
    let collection = await db.collection("users");

    let {username, password} = req.body;
    const hashedString = hash(username+password);
    let query = {hash: hashedString};
    let result = await collection.findOne(query);

    
    if (result){
        // the cookie is re-inserting everytime the user logins 
        // there needs to be management that is in place to handle cookie 
        // auth
        let sessionCollection = await db.collection("sessions")
        var sessionCookie = req.headers.cookie?.split('=')[1];
        console.log(req.headers.cookie);

        if (sessionCookie != undefined){
            // if the session Cookie exists, check for its existence in the db
            let cookieQuery = {cookie: sessionCookie};

            let isCookie = await sessionCollection.findOne(cookieQuery);

            if (isCookie){
                res.status(200).send("Login Success");
            }
            
            else{
                const sessionCookie = uuidv4();
                const insertCookie = {
                    cookie: sessionCookie,
                    user: username
                };
        
                sessionCollection.insertOne(insertCookie);
    
                res.cookie('session', sessionCookie);
                res.status(200).send("Login Success");       
            }
        }

        else{
            const sessionCookie = uuidv4();
            const insertCookie = {
                cookie: sessionCookie,
                user: username
            };
    
            sessionCollection.insertOne(insertCookie);

            res.cookie('session', sessionCookie);
            res.status(200).send("Login Success");       
        }
    }
    else{
        res.status(403).send("Login Failed")
    }
})

router.get("/home", async (req,res) => {
    const isSession = await validateSession(db, res, req);

    if (isSession === true){
        res.status(200).send();
    }
    else{
        res.status(403).send("Session Timed Out. Please Login Again");
    }
})

router.post("/logout", async(req, res) => {
    const sessionCookie = req.headers.cookie?.split("=")[1];

    let collection = await db.collection("sessions");
    const query = {cookie: sessionCookie};

    // delete the document with the session cookie
    collection.deleteOne(query);

    res.status(200).send();
})

router.post("/add", async(req, res) =>{
    const isSession = await validateSession(db, res, req);

    // if the session is valid 
    if (isSession){
        // extract request content 
        const {friendUsername} = req.body;

        // check if the user the person wants to add exists in the db 
        let isFriend = await UserExists(db, friendUsername);

        // if the searched user exists 
        if (isFriend){
            const currentUser = await getUser(db, req);
            // construct a query where the friends tab of the currentUser is updated
            const checkFriend = await AddFriend(db, currentUser, friendUsername);

            if (checkFriend){
                // construct a query where the friends tab of the friend is updated
                await AddFriend(db,friendUsername,currentUser);
                res.status(200).send(`${friendUsername} is now your friend!`);
            }
            else{
                res.status(200).send(`${friendUsername} and you are already friends!`);
            }

        } else{
            // otherwise return a 404 
            res.status(404).send("User Not Found");
        }

    } else {
        res.status(403).send("Must Be Logged In")
    }
})

router.get("/friends", async (req,res) => {
    const isSession = await validateSession(db, res, req);

    if (isSession) {
        let collection = await db.collection("users");
        const currentUser = await getUser(db, req);

        let loadDocument = await collection.findOne({user: currentUser});
        const userFriends = loadDocument.friends;
        
        res.json({friends: userFriends});
    }
})

router.get("/getUser", async (req, res) => {
    const isSession = await validateSession(db, res, req);

    if (isSession){
        res.status(200).send(await getUser(db, req))
    } else{
        res.status(403).send("Session Expired")
    }
})

export default router;