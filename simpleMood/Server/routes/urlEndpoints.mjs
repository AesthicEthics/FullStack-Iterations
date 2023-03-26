import express from "express";
import db from "../db/conn.mjs";
import { v4 as uuidv4 } from 'uuid';
import hash from "./routeUtils.mjs";

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
        const userEntry = {user: username, hash: hashedString, email: email};
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
        let sessionCollection = await db.collection("sessions")
        const sessionCookie = uuidv4();

        const insertCookie = {sessionCookie: [username]}
        sessionCollection.insertOne(insertCookie);

        res.set('Set-Cookie', `session=${sessionCookie}`);
        res.status(200).send("Login Success");
    }
    else{
        res.status(403).send("Login Failed")
    }
})

export default router;