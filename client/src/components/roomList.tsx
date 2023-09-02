import { Link } from "react-router-dom"
import { useContext,useEffect } from "react";
import { SocketContext } from "../context/socket";
import { useRecoilState } from "recoil";

import { Socket } from "socket.io-client";
import { useNavigate } from 'react-router-dom';

interface propsType {
    room : roomType,
}

export default function RoomList({room} : propsType ) {
    const navigate = useNavigate();
    const socket = useContext<Socket>(SocketContext);

    const enterRoomHandler = async () => {
        if(room.roomCurrentPersonNumber === room.roomLimitNumber) {
            return alert("죄송합니다, 현재 방에 입장 가능한 인원을 초과하였습니다. ");
        }
        const enterUserData:enterUserType = {
            socketId : socket.id,
            enterCheck : true,
            enterRoomId : room.roomId,
        }
        await socket.emit("enterRoom",enterUserData);
        // 입장 불가능 시, navigate를 따로 해줘야 함.
        navigate(`/room/${room.roomId}`);
    }


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