import { MongoClient, TopologyDescription } from "mongodb";
import "../loadEnv.mjs";

const connectionString = process.env.URI || "";
const mongoClient =  new MongoClient(connectionString)
let conn;

try{
    conn = await mongoClient.connect();
} catch(e){
    console.error(e);
}

let db = conn.db("")

export default db;