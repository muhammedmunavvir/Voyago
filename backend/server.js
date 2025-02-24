import express from "express";
const app = express();
import { dbconnection } from "./src/config/db.js";
import routes from "./src/router/app.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true,  }));
  
  
app.use(express.json());
app.use("/api/v1", routes);  

const port = process.env.PORT_NUMBER;
app.listen(port, () => {
  console.log("port is running on 9297 ");
});
