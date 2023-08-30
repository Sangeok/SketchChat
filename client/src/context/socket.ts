import { io, Socket } from "socket.io-client";
import { createContext } from "react";

export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io("http://localhost:3001");
export const SocketContext = createContext<Socket>(socket);