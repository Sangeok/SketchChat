import {useState, useRef, useEffect, useContext} from 'react'
import {io, Socket} from 'socket.io-client';
import { SocketContext } from '../context/socket';
import { allMessageAtom } from '../recoil/allMessageAtom';
import { useRecoilState } from 'recoil';
import RoomChatBox from '../components/roomChatBox';

const Room = () => {
    // const socket = useContext<Socket>(SocketContext);
    // const [allMessage, setAllMessage] = useRecoilState<messageType[]>(allMessageAtom);

    // 여기 방에 user가 입장하면 어떤 user가 새로 입장했는지 알림.

    
    return (
        <div>
            <RoomChatBox />
        </div>
    )
}

export default Room;
