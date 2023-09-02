import {useState, useRef, useEffect, useContext} from 'react'
import {io, Socket} from 'socket.io-client';
import { SocketContext } from '../context/socket';
import { allMessageAtom } from '../recoil/allMessageAtom';
import { useRecoilState } from 'recoil';

const Room = () => {
    const socket = useContext<Socket>(SocketContext);

    const [allMessage, setAllMessage] = useRecoilState<messageType[]>(allMessageAtom);

    // 여기 방에 user가 입장하면 어떤 user가 새로 입장했는지 알림.
    useEffect(()=>{
        const fetchEnterUser = () => {
            // socket의 message를 읽음
            
        }
         
         fetchEnterUser();
    },[socket])

    
    return (
        <div>
            입장하신 room입니다.
        </div>
    )
}

export default Room;
