import express from "express";
import cors from 'cors';
import dotenv from "dotenv";
import AppRouter from "./routes/router.js";
import mongoose from "mongoose";
import mongoDb from "./database/connection.js"
import multer from "multer";
import http from 'http';
import { connectoToSocket } from "./utils/webSockets.js";
// const upload = multer({ dest: "uploads/" });
import { Server } from "socket.io";

dotenv.config();

const app = express();
const port = 8000;
const corsOptions = {
  optionsSuccessStatus: 200,
};
connectoToSocket(app)
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// const server = http.createServer(app);
// const io = new Server(server, {
//   cors: {
//     // origins: ['http://localhost:5713', 'http://127.0.0.1:5713']
//   }
// });
// io.on('connection', (socket) => {
//   console.log('a user connected');
// });
// server.listen(3000, () => {
//   console.log('listening on *:3000');
// });
app.use('/public',express.static("./public"));
app.post('/testing', (req, res) => {
  res.send(req.body);
}); 
app.use(AppRouter);

app.listen(port, () => console.log(`app is listening on port ${port}.`));