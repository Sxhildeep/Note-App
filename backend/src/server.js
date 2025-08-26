import express from 'express';
import notesRouter from './routes/routes.js';
import { connectDB } from '../config/db.js';
import dotenv from "dotenv"
import rateLimiter from '../middleware/rateLimiter.js';
import cors from "cors";

import path from "path"

dotenv.config();// db setup

const app = express();
const port = process.env.PORT;
const __dirname = path.resolve()
if (process.env.NODE_ENV !== "production") {
    app.use(cors({
        origin:"http://localhost:5173"
    }));
}
 // to fix cors error
app.use(express.json()); // access client side json data
app.use(rateLimiter); // custom middleware


app.use("/api/notes", notesRouter); // using our routes

if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname,"../frontend/dist")));

    app.get("*",(req,res)=> {
        res.sendFile(path.join(__dirname,"../frontend","dist","index.html"))
})
}


connectDB().then(()=> { // connect to db then start server
    app.listen(port,()=> {
        console.log("Server Started on Port:", port)
    })
})

