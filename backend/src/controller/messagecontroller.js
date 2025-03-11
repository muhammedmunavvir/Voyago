import { chatmodel } from "../models/Chatschema.js";
import { packagermodel, trasignmodel } from "../models/usermodel.js";

export const saveMessage = async (messageData) => {
  try {
    const newMessage = await chatmodel.create({
      senderId: messageData.senderId,
      receiverId: messageData.receiverId,
      message: messageData.message,
      timestamp: messageData.timestamp,
    });

    return newMessage;
  } catch (error) {
    console.error("❌ Error saving message:", error);
    throw new Error("Failed to save message");
  }
};

//get conversation
export const getconversations = async (req, res) => {
  const { id } = req.params; // Logged-in user ID

  try {
    const conversations = await chatmodel
      .find({
        $or: [{ senderId: id }, { receiverId: id }],
      })
      .populate({
        path: "senderId",
        model: "Traveler",
        select: "username email",
      }) // ✅ FIXED
      .populate({
        path: "receiverId",
        model: "packager",
        select: "businessName email",
      }) // ✅ FIXED
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
      data: uniqueUsers,
    });
  } catch (error) {
    console.log("Error fetching conversations:", error);
    res
      .status(500)
      .json({ status: "error", message: "Failed to get conversations" });
  }
};

export const selectConversation = async (req, res) => {
  console.log(req.url);
  try {
    console.log(req.params);
    const { senderId, receiverId } = req.params;
    console.log(senderId, "jaskdjflkajsdkfj"); // User who is selecting the conversation

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
    const usersWithProfilePics = await packagermodel.find(
      { _id: { $in: usersList } },
      "name profilePic"
    );
        console.log("profile ", getProfilepic);
    
    res.status(200).json({ data: {usersList, usersWithProfilePics} });
  } catch (error) {
    console.error("Error fetching conversations:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getUserSingleChat = async (req, res) => {
  const { senderId } = req.params;
  const { receiverId } = req.query;
  console.log("ndfas ", req.params);
  console.log("ndfas ", req.query);
 
  try {
    // Fetch messages between the two users
    const messages = await chatmodel
      .find({
        $or: [
          { senderId: senderId, receiverId: receiverId },
          { senderId: receiverId, receiverId: senderId },
        ],
      })
      .sort({ timestamp: 1 });

    if (!messages.length) {
      return res.status(404).json({ error: "No messages found between users" });
    }

    res.json({ messages });
  } catch (error) {
    console.error("Error fetching single chat:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
