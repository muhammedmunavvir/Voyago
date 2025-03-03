import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { socket } from "../../lib/socket";


export const TravelerChat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const location = useLocation();
  const receiverId = location.state?.packagerId || "";
  const packagername = location.state?.packagername || "";
  const senderId = localStorage.getItem("userid");

  useEffect(() => {
    if (senderId) {
      socket.connect();
      socket.emit("user_connected", senderId);
    }

    socket.on("receive_message", (newMessage) => {
      console.log("📩 New message received:", newMessage);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    return () => {
      socket.off("receive_message");
      socket.disconnect();
    };
  }, [senderId, receiverId]);

  const sendMessage = async () => {
    if (!message || !receiverId) return;
    try {
      // const res = await axios.post(`${API_URL}/chat/messages`, {
        // message,
        // senderId,
        // receiverId,
      // });
      const sendMessage = {
        message,
        senderId,
        receiverId,
      }
      socket.emit("send_message", sendMessage);
      setMessages((prevMessages) => [...prevMessages, sendMessage]);
      setMessage("");
    } catch (error) {
      console.error("❌ Error sending message:", error);
    }
  };

  
  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-400 to-purple-500">
      <div className="bg-white shadow-2xl rounded-xl p-6 w-96">
        <h1 className="text-2xl font-semibold text-purple-700 text-center mb-4">
          Chat with packager
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
