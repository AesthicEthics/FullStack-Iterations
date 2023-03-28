import express from "express";
import cors from "cors";
import router from "./routes/urlEndpoints.mjs"

const app = express();
const PORT = 8080;

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));

// enable cors handling for all preflight requests
// to allow for custom headers and establishing cookies
app.use(express.json());

app.use("/", router);


app.listen(PORT, () => {
    console.log(`Started Server on ${PORT}`);
})