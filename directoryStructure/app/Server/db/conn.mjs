// importing the mongo client from mongoDB
import { MongoClient } from "mongodb";

// set the connectionString to the ATLAS DB URI
const connectionString = process.env.ATLAS_URI || "";

// returns a new client object to the specified string
const client = new MongoClient(connectionString);

let conn;
try{
    // wait for the client to finish connecting
    conn = await client.connect();
} catch(e) {
    // log any errors int the process
    console.error(e);
}

let db = conn.db("db_name");

// export the connected db client for use across modules
export default db;