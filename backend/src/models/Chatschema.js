import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema({
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: "Traveler", required: true }, // Corrected model name
  receiverId: { type: mongoose.Schema.Types.ObjectId, ref: "Packager", required: true }, // Corrected model name
  message: String,
  timestamp: { type: Date, default: Date.now },
});

export const chatmodel = mongoose.model("Chat", ChatSchema);
