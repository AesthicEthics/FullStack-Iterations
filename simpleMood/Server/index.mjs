import express from "express";
import cors from "cors";
import login from "./routes/urlEndpoints.mjs"
app = express();
PORT = 5050;

app.use(cors);

app.use("/login", login);

app.listen(PORT, () => {
    console.log(`Started Server on ${PORT}`);
})