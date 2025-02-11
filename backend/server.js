import express from "express";
const app = express();
import { dbconnection } from "./src/config/db.js";
import routes from "./src/router/app.js";
import cors from "cors"
app.use(cors())
app.use(express.json())
app.use("/api/v1", routes);

app.listen(9297, () => {
  console.log("port is running on 9297 ");
});
