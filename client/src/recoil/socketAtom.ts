import { atom } from "recoil";
import {io, Socket} from 'socket.io-client';

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io("http://localhost:3001");

export const socketAtom = atom<Socket>({
    key : 'AllMessageDataAtom',
    default : socket,
})