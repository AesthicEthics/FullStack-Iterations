import express from "express";
import db from "../db/conn.mjs";
import { ObjectID } from "mongodb";

/*
Allows us to create modular Route Handlers.
Route handlers are fucntionst that are executed
Every time requests are made to a specific endpoint


similar to mux.Router in Go-lang
 */
const router = express.Router();

router.get("/", async(req, res) => {
    // wait for the collection "posts" to come up
    let collection = await db.collection("posts");
    let results = await collection.find({})
        .limit(50)
        .toArray();

    res.send(results).status(200);
});

router.get("/latest", async(req,res) =>{
    let collection = await db.collection("posts");
    let results = await collection.aggregate([
        {"$project": {"author": 1, "title": 1, "tags": 1, "date": 1}},
        {"$sort": {"date": -1}},
        {"$limit": 3}
      ]).toArray();
      res.send(results).status(200);
})

router.get("/:id", async (req,res) => {
    let collection = await db.collection("posts");
    //req.params allows us to access request parameters from the URL
    let query = {_id: ObjectID(req.params.id)};
    let result = await collection.findOne(query);

    if (!result) res.send("Not found").status(404);
    else res.send(result).status(200);
})