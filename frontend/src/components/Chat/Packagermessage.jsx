import { useEffect, useState } from "react";
import { io } from "socket.io-client";
const socket=io.connect("http://localhost:9297")


export const PackagerChat = () => {
    const [message,setmessage]=useState("")
    const [receivemessage,setreceivemessage]=useState("")
  const sendmessage = () => {
    socket.emit("this_is_emiter",{message})
  };

  useEffect(()=>{
    socket.on("receive_message",(data)=>{
     setreceivemessage(data.message)
    })
  },[socket])
  return (
    <div> 
      Message
      <input  onChange={(e)=>setmessage(e.target.value)} type="text" name="" id="" className="bg-yellow-500"  />
      <button onClick={() => sendmessage()}>message</button>
      <h1> from:{receivemessage}</h1>
    </div>
  );
};