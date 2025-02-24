import axios from "axios";
import { useEffect, useState, } from "react";
import { io } from "socket.io-client";
import { API_URL } from "../../conf/APiconfi";
import { useLocation } from "react-router-dom";
const socket = io.connect("http://localhost:9297");

export const TravelerChat = () => {
  const [message, setMessage] = useState("");
  const [receivedMessage, setReceivedMessage] = useState("");
  const [sentMessage, setSentMessage] = useState("");

  const location=useLocation()
  const receiverId=location.state
  const senderID=localStorage.getItem("userid")
  
  const sendMessage = async () => {
    try {
      const res = await axios.post(`${API_URL}/chat/messages`, { message ,senderID,receiverId});
      socket.emit("this_is_emiter", { message });
      setSentMessage(message);
      setMessage("");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setReceivedMessage(data.message);
    });
  }, []);

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-400 to-purple-500">
      <div className="bg-white shadow-2xl rounded-xl p-6 w-96">
        <h1 className="text-2xl font-semibold text-purple-700 text-center mb-4">
          Traveler Chat
        </h1>

        {/* Message Display Box */}
        <div className="h-56 overflow-y-auto p-3 bg-gray-100 rounded-lg shadow-inner flex flex-col space-y-2">
          {receivedMessage && (
            <div className="self-start bg-green-500 text-white p-2 rounded-lg max-w-[75%]">
              {receivedMessage}
            </div>
          )}
          {sentMessage && (
            <div className="self-end bg-purple-500 text-white p-2 rounded-lg max-w-[75%]">
              {sentMessage}
            </div>
          )}
        </div>

        {/* Input & Send Button */}
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
