import express from "express"
import {messagecontroller} from "../controller/messagecontroller.js"
export const messageRouter=express.Router()

messageRouter.post("/messages",messagecontroller)

