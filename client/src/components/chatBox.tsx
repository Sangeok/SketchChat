import React from 'react'
import {useState, useRef, useEffect} from 'react'
import {io, Socket} from 'socket.io-client';

import ChatContent from './chatContent';
import { styled } from 'styled-components';

interface propsType {
    socket: Socket<ServerToClientEvents, ClientToServerEvents>,
    chatToggle : string,
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

export default function ChatBox({socket, chatToggle} : propsType) {
    const [message, setMessage] = useState<string>("");
    const [allMessage, setAllMessage] = useState<messageType[]>([]);
    const [roomPerson, setRoomPerson] = useState<number>(0);

    const messagesRef = useRef<HTMLDivElement>(null);
    const effectForRef = useRef<boolean>(false);

    const sendMessage = async () => {
        const messageData:messageType = {
            message,
            messageId : socket.id,
            myId : "",
        }
        await socket.emit("client_send_message", messageData);
        setAllMessage((pre)=>[...pre, messageData]);
        setMessage("");
    }

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

    useEffect(()=>{
        setAllMessage([]);
    },[chatToggle])

    return (
        <div style={{maxHeight:"72vh", width : "100%"}} className="flex flex-col overflow-hidden py-2">
            <Wrapper ref={messagesRef}>
            {
                allMessage.map((messageData,index)=>{
                    messageData.myId = socket.id;
                    return (
                        <ChatContent key={index} {...messageData}/>
                    )
                })
            }
            </Wrapper>
            {
                (chatToggle === "New Conversation") ? (
                    null
                ) : ( roomPerson === 2 &&
                    <div style={{minHeight:"35px",boxShadow : "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px"}} className="flex items-center justify-between mb-6 px-3 rounded-md mr-5">
                        <div className="w-full">
                            <input
                                onChange={(e)=>setMessage(e.target.value)}
                                value={message} 
                                placeholder='Messages...' 
                                className='w-full focus:outline-none'
                            />
                        </div>
                        {/* <button onClick={sendMessage}>send</button> */}
                        <button onClick={sendMessage} className="z-50 material-symbols-outlined">send</button>
                    </div>
                )
            }
        </div>
  )
}
