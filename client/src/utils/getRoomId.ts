import { Socket } from "socket.io-client";

export default function getRoomI(socket:Socket<ServerToClientEvents, ClientToServerEvents>) {
    const getRandomNumber = (min:number, max:number) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    let randomRoomId = getRandomNumber(1,1000);
    let roomId = socket.id + randomRoomId.toString();
    return roomId;
}
