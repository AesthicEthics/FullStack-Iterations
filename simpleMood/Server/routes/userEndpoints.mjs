console.log('Initializing userRouter');

import express from "express";
import db from "../db/conn.mjs";
import validateSession from "./utils/validateSession.mjs";
import AddFriend from "./utils/addFriend.mjs";
import getUser from "./utils/getCurrent.mjs";
import UserExists from "./utils/userExists.mjs";

const userRouter = express.Router();

userRouter.get("/:username?", async (req,res) => {
    const getUser = req.params.username;

    // check for valid session 
    const isSession = await validateSession(db,res,req);

    if (isSession){
        // check if user exists 
        const userExists = await UserExists(db, getUser);
        // if the user exists confirm that the two users are friends 
        if (userExists){
            // load user profile
            
        }

        else{
            res.send("User Does Not Exist");
        }
    }
    else{
        res.status(403).send("Session Time Out Login Again")
    }
})

export default userRouter;
