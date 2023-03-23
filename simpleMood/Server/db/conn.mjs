import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const connectionString = process.env.URI || "";
let mongoClient = new MongoClient(connectionString);

let conn;

try{
    conn = await mongoClient.connect();
    console.log("[+] Connected To Mongo Client");
} catch(e){
    console.log(e)
}

const db = conn.db("Prototype");

export default db;