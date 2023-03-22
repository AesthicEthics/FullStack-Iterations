import express from "express";
import cors from "cors";
import "./loadEnv.mjs";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json())
app.use(cors())


app.listen(PORT, () =>{
    console.log(`Server started on ${PORT}`)
})