import express from "express";
import db from "../db/conn.mjs";

const router = express.Router();

router.post("/login", async (req,res) => {
    let collection = db.collection("users");
    let {username, password} = req.body;

    let query = {user: username};
    let result = collection.findOne(query);

    if (result){
        res.status(200).send("Login Success");
    }
})