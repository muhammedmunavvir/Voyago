import { io } from "socket.io-client";

const SOCKET_URL = "http://localhost:9297"; // Update with your backend URL
export const socket = io(SOCKET_URL, { autoConnect: false });
