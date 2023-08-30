import { Link } from "react-router-dom"
import { useContext } from "react";
import { SocketContext } from "../context/socket";

import { Socket } from "socket.io-client";
import { useNavigate } from 'react-router-dom';

interface propsType {
    room : roomType,
}

export default function RoomList({room} : propsType ) {
    const navigate = useNavigate();
    const socket = useContext<Socket>(SocketContext);

    const enterRoomHandler = () => {
        const enterUserData:enterUserType = {
            socketId : socket.id,
            enterCheck : true,
            enterRoomId : room.roomId,
        }
        socket.emit("enterRoom",enterUserData);
        navigate(`/room/${room.roomId}`);
    }

    // 현재 참여 수/방 참여 가능 수 이렇게 나타내기 위해 서버에서 참여 인원을 보내줘야함.
    // 더불어 방 입장 시 서버에 참가했음을 알리고 방에 참가한 인원수를 늘려서 보내줘야함.
    // Link가 아니라 div로 바꾸고 double click시 서버에 메세지 보내기 + page 이동까지
    return (
        <div>
            
            <div onDoubleClick={enterRoomHandler}>
                <div className="flex justify-between p-3">
                    <p className="px-3">{room.roomTitle}</p>
                    <p className="px-3">{room.roomCurrentPersonNumber}/{room.roomLimitNumber}명</p>
                    <p>{room.roomId}</p>
                </div>
            </div>
            <hr className="h-0.5 bg-neutral-400"/>
        </div>
    )
}