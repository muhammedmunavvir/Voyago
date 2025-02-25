import mongoose from "mongoose";
import { chatmodel } from "../models/Chatschema.js";
import { packagermodel } from "../models/usermodel.js";
import { trasignmodel } from "../models/usermodel.js";

export const messagecontroller = async (req, res) => {
  console.log(req.body);
  try {
    const { senderId, receiverId, message } = req.body;

    // Ensure all fields are provided
    if (!senderId || !receiverId || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newMessage = await chatmodel.create({
      senderId: senderId,
      receiverId: receiverId,
      message: message,
    });

    // Emit the message to the receiver via WebSocket
    req.io.to(receiverId).emit("receive_message", newMessage);

    res.status(201).json(newMessage);
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ error: "Error sending message" });
  }
};

//get conversation
export const getconversations = async (req, res) => {
  const { id } = req.params; // Logged-in user ID

  try {
    const conversations = await chatmodel
      .find({
        $or: [{ senderId: id }, { receiverId: id }]
      })
      .populate({ path: "senderId", model: "Traveler", select: "username email" })  // ✅ FIXED
      .populate({ path: "receiverId", model: "packager", select: "businessName email" })  // ✅ FIXED
      .lean(); // Convert to plain objects

    // Extract unique users from messages
    const userMap = new Map();
    conversations.forEach((chat) => {
      if (chat.senderId && chat.senderId._id.toString() !== id) {
        userMap.set(chat.senderId._id.toString(), chat.senderId);
      }
      if (chat.receiverId && chat.receiverId._id.toString() !== id) {
        userMap.set(chat.receiverId._id.toString(), chat.receiverId);
      }
    });

    const uniqueUsers = Array.from(userMap.values());

    res.status(200).json({
      status: "success",
      message: "Conversations retrieved",
      data: uniqueUsers
    });
  } catch (error) {
    console.log("Error fetching conversations:", error);
    res.status(500).json({ status: "error", message: "Failed to get conversations" });
  }
};




export const selectConversation = async (req, res) => {
  console.log(req.url)
  try {
    console.log(req.params)
    const { senderId, receiverId } = req.params; 
    console.log(senderId,'jaskdjflkajsdkfj')// User who is selecting the conversation

    if (!senderId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    // Find all unique users the given user has had conversations with
    const conversations = await chatmodel.aggregate([
      {
        $match: {
          $or: [{ senderId: senderId }, { receiverId: receiverId }],
        },
      },
      {
        $group: {
          _id: null,
          users: {
            $addToSet: {
              $cond: [
                { $eq: ["$senderId", senderId] },
                "$receiverId",
                "$senderId",
              ],
            },
          },
        },
      },
    ]);

    // If no conversations found, return empty array
    const usersList = conversations.length > 0 ? conversations[0].users : [];

    res.status(200).json({ data: usersList });
  } catch (error) {
    console.error("Error fetching conversations:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
