import express from "express";
import cors from "cors";
import router from "./routes/urlEndpoints.mjs";
import userRouter from "./routes/userEndpoints.mjs";

const app = express();
const PORT = 8080;

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));

app.use(express.json());

//
app.use("/", router);
// Use the userRouter
app.use("/users", userRouter);


app.listen(PORT, () => {
    console.log(`Started Server on ${PORT}`);
});
