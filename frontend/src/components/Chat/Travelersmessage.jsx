import axios from "axios";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { API_URL } from "../../conf/APiconfi";
import { useLocation } from "react-router-dom";

const socket = io("http://localhost:9297");

export const TravelerChat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const location = useLocation();
  const receiverId = location.state?.packagerId || "";
  const senderId = localStorage.getItem("userid");

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      socket.off("receive_message");
    };
  }, []);

  const sendMessage = async () => {
    try {
      const res = await axios.post(`${API_URL}/chat/messages`, {
        message,
        senderId,
        receiverId,
      });
      socket.emit("send_message", res.data);
      setMessages((prev) => [...prev, res.data]);
      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-400 to-purple-500">
      <div className="bg-white shadow-2xl rounded-xl p-6 w-96">
        <h1 className="text-2xl font-semibold text-purple-700 text-center mb-4">
          Chat with {receiverId}
        </h1>
        <div className="h-80 p-3 bg-gray-200 overflow-y-auto rounded flex flex-col">
  {Array.isArray(messages) && messages.length > 0 ? (
    messages.map((msg, index) => (
      <div
        key={index}
        className={`p-2 my-1 rounded max-w-xs ${
          msg.senderId === senderId ? "bg-blue-400 text-white self-end" : "bg-gray-300"
        }`}
      >
        {msg.message}
      </div>
    ))
  ) : (
    <p className="text-gray-500 text-center">No messages yet.</p>
  )}
</div>

        <div className="flex items-center space-x-2 mt-4">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
            placeholder="Type your message..."
          />
          <button
            onClick={sendMessage}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition duration-300"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};
