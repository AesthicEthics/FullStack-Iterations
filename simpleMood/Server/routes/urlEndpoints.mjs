import express from "express";
import db from "../db/conn.mjs";
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

router.post("/login", async (req,res) => {
    let collection = await db.collection("users");

    let {username, password} = req.body;
    console.log(username);
    let query = {user: username};
    let result = await collection.findOne();

    console.log(result);

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