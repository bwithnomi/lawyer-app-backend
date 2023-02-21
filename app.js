import express from "express";
import cors from 'cors';
import dotenv from "dotenv";
import AppRouter from "./routes/router.js";
import mongoose from "mongoose";
import mongoDb from "./database/connection.js"
import multer from "multer";
// const upload = multer({ dest: "uploads/" });

dotenv.config();

const app = express();
const port = 8000;
const corsOptions = {
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.post('/testing', (req, res) => {
  res.send(req.body);
}); 
app.use(AppRouter);

app.listen(port, () => console.log(`app is listening on port ${port}.`));