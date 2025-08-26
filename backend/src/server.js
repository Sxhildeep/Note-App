import express from 'express';
import notesRouter from './routes/routes.js';
import { connectDB } from '../config/db.js';
import dotenv from "dotenv"
import rateLimiter from '../middleware/rateLimiter.js';
import cors from "cors";


dotenv.config();// db setup

const app = express();
const port = process.env.PORT;


app.use(cors()); // to fix cors error
app.use(express.json()); // access client side json data
app.use(rateLimiter); // custom middleware


app.use("/api/notes", notesRouter) // using our routes

connectDB().then(()=> { // connect to db then start server
    app.listen(port,()=> {
        console.log("Server Started on Port:", port)
    })
})

