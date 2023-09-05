import React from 'react'
import {useState, useRef, useEffect, useContext} from 'react';
import { Socket } from 'socket.io-client';
import { SocketContext } from '../context/socket';
import { allMessageAtom } from '../recoil/allMessageAtom';
import { useRecoilState } from 'recoil';
import { styled } from 'styled-components';

import ChatContent from './chatContent';
import ChatInput from './chatInput';

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

const RoomChatBox = () => {
    const socket = useContext<Socket>(SocketContext);
    const [allMessage, setAllMessage] = useRecoilState<messageType[]>(allMessageAtom);
    // const [roomPerson, setRoomPerson] = useState<number>(0);

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
            const fetchEnterRoom = () => {
                socket.on("enterRoomSucess", (enterPersonId)=>{
                        const enterMessage:messageType = {
                            message : `${enterPersonId}님이 입장하셨습니다.`,
                            messageId : socket.id, // 이 부분을 broadcast면 가장 가운데에 나오게 하면 좋을듯
                            notification : true,
                        }
                    setAllMessage((pre)=>[...pre, enterMessage]);
                })
            }
            fetchEnterRoom();
            fetchMessage();
        }
       
           return () => {
             effectForRef.current = true;
           }
    },[socket])

    // useEffect(()=>{
    //       const fetchEnterRoom = () => {
    //         socket.on("enterRoomSucess", (enterPersonId)=>{
    //             const enterMessage:messageType = {
    //                 message : `${enterPersonId}님이 입장하셨습니다.`,
    //                 messageId : socket.id, // 이 부분을 broadcast면 가장 가운데에 나오게 하면 좋을듯
    //                 messageDataType : "roomChat",
    //             }
    //             setAllMessage((pre)=>[...pre, enterMessage]);
    //         })
    //       }
    //       fetchEnterRoom();
    // },[socket])

    // useEffect(()=>{
    //       const fetchRoomPerson = () => {
    //         socket.on("roomPersonData_client", (roomPersonData)=>{
    //             console.log(`roomPersonData : ${roomPersonData}`);
    //             setRoomPerson(roomPersonData);
    //         })
    //       }
    //       fetchRoomPerson();
    // },[socket])

    // chatContent의 대화가 길어지면 자동으로 scroll이 내려가게함. 
    useEffect(()=>{
        if (messagesRef.current) {
            messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
        }
    },[allMessage]);

    // 함수로 표현하는게 좋을듯?
    // useEffect(()=>{
    //     setAllMessage([]);
    //     setRoomPerson(0);
    // },[chatToggle])

    return (
        <div style={{maxHeight:"72vh", width : "100%"}} className="flex flex-col overflow-hidden py-2 px-5">
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
            <ChatInput socket={socket}/>
        </div>
    )
}

export default RoomChatBox;
