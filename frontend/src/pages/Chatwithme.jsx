import { useState } from "react";
import axios from "axios";

const EVAChat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { text: input, sender: "user" }];
    setMessages(newMessages);
    setInput("");

    try {
      const res = await axios.post("http://localhost:5000/api/chat", { message: input });
      setMessages([...newMessages, { text: res.data.reply, sender: "eva" }]);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 w-80 bg-white p-4 shadow-lg rounded-lg">
      <div className="h-64 overflow-y-auto">
        {messages.map((msg, i) => (
          <div key={i} className={msg.sender === "user" ? "text-right text-blue-500" : "text-left text-gray-700"}>
            <p className="p-2 rounded-lg">{msg.text}</p>
          </div>
        ))}
      </div>
      <div className="flex mt-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-grow p-2 border rounded-l-lg"
        />
        <button onClick={sendMessage} className="bg-blue-500 text-white p-2 rounded-r-lg">Send</button>
      </div>
    </div>
  );
};

export default EVAChat;
