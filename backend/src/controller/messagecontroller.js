 export const messagecontroller = async (req, res) => {
  try {
    const { senderId, receiverId, message } = req.body;

    // Ensure all fields are provided
    if (!senderId || !receiverId || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Save message to database
    const newMessage = await chatmodel.create({
      senderId,
      receiverId,
      message,
    });

    // Emit the message to the receiver via WebSocket
    req.io.to(receiverId).emit("receive_message", newMessage);

    res.status(201).json(newMessage);
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ error: "Error sending message" });
  }
};
