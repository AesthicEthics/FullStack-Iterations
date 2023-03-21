import express from "express";
import cors from "cors";
import posts from "./routes/sampleRoutes.mjs";
// Loading environment variables from the loadEnv file
import "./loadEnvironment.mjs"; // importing this file allows us to use dotenv config

const PORT = process.env.PORT || 5050;
const app = express();

// app.use() helps specify and create functions 
// that run on every request

// cors will be used for every request and response
app.use(cors());

// express json will run as middleware
// for every request and response
app.use(express.json());

// the posts function will be used only for
// functions for the /posts endpoint
app.use("/posts", posts)


// general form would be https://URL:PORT/posts/* 
// the * is replaced by the endpoints in sampleRoutes.js 
// e.g. https://URL:PORT/posts/latest

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`)
})