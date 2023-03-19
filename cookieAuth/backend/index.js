const express = require("express"); // reads a js file, executes it and returns the export object
const app = express();
const uuidv4 = require("uuid").v4;

app.use(express.json()); // only works when the sent request type is "application/json"

const sessions = {}; // this is basically a dictionary that stores cookies as a key-value pair

app.post('/login',(req, res) => { // the fuction defined by (req,res) => are the parameters for a function handler similar to those in Go
    const { username, password } = req.body;

    if (username !== 'admin' || password  !== 'admin'){
        console.log(username, password)
        return res.status(401).send("Invalid Login");
    }

    const sessionId = uuidv4();
    sessions[sessionId] = { username, userId: 1};
    res.set('Set-Cookie', `session=${sessionId}`);
    res.send("Login Success")
    console.log(sessions)
})

app.get("/todo", (req, res) => {
    const sessionId = req.headers.cookie?.split("=")[1]; // the "?" mark checks whether the cookie properyt is defined in req.headers
    const userSession = sessions[sessionId];
    try{
        const userId = userSession.userId;
    }
    catch (TypeError){
        return res.redirect("/login")
    }

    res.send([{
        id: userId,
        title: "Kind Cool",
    }])

})

app.listen(8080);