import express from "express"
import {getconversations, messagecontroller, selectConversation} from "../controller/messagecontroller.js"
export const messageRouter=express.Router()

messageRouter.post("/messages",messagecontroller)
messageRouter.get("/message/getconversations/:id",getconversations)
messageRouter.get("/messages/:senderId/:receiverId",selectConversation)

