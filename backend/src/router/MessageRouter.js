import express from "express"
import {getconversations,  getUserSingleChat,  selectConversation} from "../controller/messagecontroller.js"
import { jwtverification } from "../middlewares/jwtverification.js"
export const messageRouter=express.Router()

// messageRouter.post("/messages",messagecontroller)
messageRouter.get("/messages/:senderId/:receiverId",selectConversation)
messageRouter.get("/message/getconversations/:id",getconversations)

messageRouter.get("/messages/:senderId",getUserSingleChat)

