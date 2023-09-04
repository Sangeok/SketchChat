import React from 'react'
import {useState, useRef, useEffect, useContext} from 'react'
import {io, Socket} from 'socket.io-client';
import { SocketContext } from '../context/socket';

import ChatContent from './chatContent';
import ChatInput from './chatInput';
import {useRecoilState} from "recoil";
import {allMessageAtom} from "../recoil/allMessageAtom";
import { styled } from 'styled-components';

interface propsType {
    chatToggle? : string,
}

const Wrapper = styled.div`
    min-height : 63vh;
    overflow : auto;
    padding-top: 5px;
    padding-bottom: 5px;    
    /* 스크롤바 커스텀*/
    &::-webkit-scrollbar {
      width: 3px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: #757574;
      border-radius: 10px;
    }
    &::-webkit-scrollbar-track {
        background-color: #c2c2bc;
    }
`;

export default function RanChatBox({chatToggle} : propsType) {
    const socket = useContext<Socket>(SocketContext);
    const [allMessage, setAllMessage] = useRecoilState<messageType[]>(allMessageAtom);
    const [roomPerson, setRoomPerson] = useState<number>(0);

    const messagesRef = useRef<HTMLDivElement>(null);
    const effectForRef = useRef<boolean>(false);
    useEffect(()=>{
        if(effectForRef.current === false) {
            const fetchMessage = () => {
                // socket의 message를 읽음
               socket.on("server_send_message", (data)=>{
                 setAllMessage((pre)=>[...pre, data]);
               })
             }
             
             fetchMessage();
           }
       
           return () => {
             effectForRef.current = true;
           }
    },[socket])

    useEffect(()=>{
          const fetchRoomPerson = () => {
            socket.on("roomPersonData_client", (roomPersonData)=>{
                console.log(`roomPersonData : ${roomPersonData}`);
                setRoomPerson(roomPersonData);
            })
          }
          fetchRoomPerson();
    },[socket])

    // chatContent의 대화가 길어지면 자동으로 scroll이 내려가게함. 
    useEffect(()=>{
        if (messagesRef.current) {
            messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
        }
    },[allMessage]);

    // 함수로 표현하는게 좋을듯?
    useEffect(()=>{
        setAllMessage([]);
        setRoomPerson(0);
    },[chatToggle])

    return (
        <div style={{maxHeight:"72vh", width : "100%"}} className="flex flex-col overflow-hidden py-2">
            <Wrapper ref={messagesRef}>
            {
                allMessage.map((messageData,index)=>{
                    console.log(`messageData : ${messageData.message}`);
                    return (
                        <ChatContent key={index} socket={socket} messageData={messageData}/>
                    )
                })
            }
            </Wrapper>
            {
                (chatToggle === "New Conversation") ? (
                    null
                ) : ( roomPerson === 2 && 
                    <ChatInput socket={socket}/>

                )
            }
        </div>
  )
}
