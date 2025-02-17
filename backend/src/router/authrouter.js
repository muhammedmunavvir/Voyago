import express from "express";
import {
  travlersignupcontroller,
  travlerlogincontroller,
  packagersignupcontroller,
  logoutcontroller,
} from "../controller/auth-controller.js";

const authrouter = express.Router();

authrouter.post("/traveler/signup", travlersignupcontroller);
authrouter.post("/packager/signup", packagersignupcontroller);
authrouter.post("/traveler/login", travlerlogincontroller);
authrouter.post("/users/logout",logoutcontroller)
export default authrouter;
