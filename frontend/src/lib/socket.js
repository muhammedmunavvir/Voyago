import { io } from "socket.io-client";

const SOCKET_URL = "wss://voyago-znut.onrender.com"; // Update with your backend URL
export const socket = io(SOCKET_URL, { autoConnect: false });
