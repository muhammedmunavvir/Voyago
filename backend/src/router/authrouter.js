import express from "express"
import { travlersignupcontroller,travlerlogincontroller } from "../controller/auth-controller.js"

const  authrouter=express.Router()

authrouter.post("/traveler/signup",travlersignupcontroller)
authrouter.post("/traveler/login",travlerlogincontroller)
export default authrouter 