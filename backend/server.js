import express from "express";

import { dbconnection } from "./src/config/db.js";
import routes from "./src/router/app.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { Server } from "socket.io";
import http from "http";
import { chatSocket } from "./socket/chatSocket.js";
const app = express();
dotenv.config();
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

const server = http.createServer(app);
app.use(express.json());

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

app.use((req, res, next) => {
  req.io = io;
  next();
});
app.use("/api/v1", routes);

// Setup Socket.io

chatSocket(io)





const port = process.env.PORT_NUMBER;
server.listen(port, () => {
  console.log("port is running on 9297 ");
});
