import { saveMessage } from "../src/controller/messagecontroller.js";
const onlineUsers = new Map(); // Stores userId -> socketId mapping

export const chatSocket = (io) => {
  io.on("connection", (socket) => {
    console.log(`🔌 User connected: ${socket.id}`);

    // ✅ Track User Connection
    socket.on("user_connected", (userId) => {
      if (!userId) {
        console.error("⚠️ Missing userId on connection");
        return;
      }
      onlineUsers.set(userId, socket.id);
      console.log(`✅ User ${userId} is now online.`);
    });

    // 💬 Handle Incoming Messages
    socket.on("send_message", async (data) => {
      if (!data.receiverId || typeof data.receiverId !== "string") {
        console.error("⚠️ Invalid or missing receiver ID:", data);
        return;
      }

      const messageData = {
        ...data,
        timestamp: new Date(),
      };

      try {
        await saveMessage(messageData);
      } catch (error) {
        console.error("❌ Error saving message:", error);
        socket.emit("error_message", "Failed to save message.");
        return;
      }

      // 📡 Forward Message if Receiver is Online
      const receiverSocketId = onlineUsers.get(data.receiverId);
      console.log("Receiver Socket ID:", receiverSocketId);
      console.log("Message Data:", messageData);

      if (receiverSocketId) {
        io.to(receiverSocketId).emit("receive_message", messageData);
      }
    });

    // 🚪 Handle User Disconnection
    socket.on("disconnect", () => {
      const userId = [...onlineUsers.entries()].find(
        ([key, value]) => value === socket.id
      )?.[0];
      if (userId) {
        onlineUsers.delete(userId);
        console.log(`🚪 User ${userId} disconnected.`);
      }
    });
  });
};
