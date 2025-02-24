import express from "express";

import { dbconnection } from "./src/config/db.js";
import routes from "./src/router/app.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { Server } from "socket.io";
import http from "http";
const app = express();
dotenv.config();
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

const server = http.createServer(app);
app.use(express.json());
app.use("/api/v1", routes);

// Setup Socket.io
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`user connected${socket.id}`);

  socket.on("this_is_emiter", (data) => {
    socket.broadcast.emit("receive_message",data)
  });
});

const port = process.env.PORT_NUMBER;
server.listen(port, () => {
  console.log("port is running on 9297 ");
});
