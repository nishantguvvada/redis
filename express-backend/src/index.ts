import express from "express";
import { createClient } from "redis";

const app = express();
app.use(express.json());

const client = createClient();
client.connect();

app.post("/submit", async (req, res)=> {
    const {problemId, userId, code, language} = req.body;
    try {
        await client.lPush("submissions", JSON.stringify({problemId, userId, code, language}))
        res.status(200).json({message: "Submission received!"});
    } catch(err) {
        res.status(400).json({message: "Submission failed!"});
    }
    
});

app.listen(3000);