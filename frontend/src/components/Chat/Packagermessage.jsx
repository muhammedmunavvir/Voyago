import axios from "axios";
import { useEffect, useState, useMemo } from "react";
import { io } from "socket.io-client";
import { API_URL } from "../../conf/APiconfi";
import { useQuery } from "@tanstack/react-query";

export const PackagerChat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const senderId = localStorage.getItem("userid");

  const socket = useMemo(() => io("http://localhost:9297"), []);

  useEffect(() => {
    socket.on("receive_message", (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    return () => {
      socket.off("receive_message");
    };
  }, []);

  const getConversations = async () => {
    try {
      const res = await axios.get(`${API_URL}/chat/message/getconversations/${senderId}`);
      return res.data.data;
    } catch (error) {
      console.error("Error fetching conversations:", error);
      return [];
    }
  };

  const { data: conversations = [], isLoading, isError } = useQuery({
    queryFn: getConversations,
    queryKey: ["conversations", senderId],
    enabled: !!senderId,
  });



  const selectUser = async (receiverId) => {
    setSelectedUser(receiverId);
    try {
      const res = await axios.get(`${API_URL}/chat/messages/${senderId}/${receiverId}`);
      setMessages(Array.isArray(res.data) ? res.data : []);  // Ensure messages is always an array
    } catch (error) {
      console.error("Error fetching messages:", error);
      setMessages([]);  // Set to an empty array if there's an error
    }
  };
  

  const sendMessage = async () => {
    if (!message || !selectedUser) return;
    try {
      const res = await axios.post(`${API_URL}/chat/messages`, {
        message,
        senderId,
        receiverId: selectedUser,
      });
      socket.emit("send_message", res.data);
      setMessages((prevMessages) => [...prevMessages, res.data]);
      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/3 p-4 bg-gray-100 border-r">
        <h2 className="text-xl font-bold mb-4">Conversations</h2>
        {isLoading && <p>Loading...</p>}
        {isError && <p className="text-red-600">Error fetching conversations</p>}
        {conversations.length > 0 ? (
          conversations.map((conversation) => (
            <div
              key={conversation._id} 
              className={`p-2 cursor-pointer rounded ${
                selectedUser === conversation._id ? "bg-blue-500 text-white" : "bg-white"
              }`}
              onClick={() => selectUser(conversation._id)}
            >
              {conversation.name || `User: ${conversation._id}`}
            </div>
          ))
        ) : (
          <p>No conversations found</p>
        )}
      </div>

      <div className="w-2/3 p-4 flex flex-col">
        {selectedUser ? (
          <>
            <h2 className="text-xl font-bold mb-2">Chat with {selectedUser}</h2>
            <div className="h-80 p-3 bg-gray-200 overflow-y-auto rounded flex flex-col">
              {messages?.map((msg, index) => (
                <div
                  key={index}
                  className={`p-2 my-1 rounded max-w-xs ${
                    msg.senderId === senderId ? "bg-blue-400 text-white self-end" : "bg-gray-300"
                  }`}
                >
                  {msg.message}
                </div>
              ))}
            </div>
            <div className="mt-4 flex">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1 p-2 border rounded"
                placeholder="Type your message..."
              />
              <button onClick={sendMessage} className="ml-2 px-4 py-2 bg-blue-600 text-white rounded">
                Send
              </button>
            </div>
          </>
        ) : (
          <p>Select a conversation to start chatting.</p>
        )}
      </div>
    </div>
  );
};
