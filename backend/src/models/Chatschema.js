import mongoose from "mongoose";

const Chatscheama=new mongoose.Schema({
    senderId: String,
    receiverId: String,
    message: String,
    timestamp: { type: Date, default: Date.now },
})

export const chatmodel=mongoose.model("chat",Chatscheama) 