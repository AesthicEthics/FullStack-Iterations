import express from "express";
import db from "../db/conn.mjs";
import {hash,setCookie} from "./routeUtils";

const router = express.Router();

router.post("/login", async (req,res)=>{
    let collection = await  db.collection("login");
    const {username, password} = req.body;

    let hashString = hash(username+password);
    let query = {hash: hashString};

    let result = await collection.findOne(query);

    if (result){
        let collection = await db.collection("sessions");
        let sessionCookie = setCookie();
        
        // learn how to add values to DB
    }

})