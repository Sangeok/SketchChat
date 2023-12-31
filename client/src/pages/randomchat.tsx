import {useState, useContext, useRef, useEffect} from 'react'
import {io, Socket} from 'socket.io-client';
import { SocketContext } from '../context/socket';
import RanChatBox from '../components/ranChatBox';
import {useRecoilState, useSetRecoilState} from "recoil";
import {allMessageAtom} from "../recoil/allMessageAtom";

import getRoomId from "../utils/getRoomId";
import { chatCheckAtom } from '../recoil/chatCheckAtom';

const Randomchat = () => {
    const socket = useContext<Socket>(SocketContext);
    const setChatStart = useSetRecoilState<boolean>(chatCheckAtom);
    const [chatToggle, setChatToggle] = useState<string>("New Conversation");


    const newRanChat= () => {
        const newRanChatData:newRanChatDataType = {
            roomId : getRoomId(socket),
            check : true,
        }
        socket.emit("randomChatStart", newRanChatData);
        setChatToggle("Leave Conversation");
        setChatStart(true);
    }

    const leaveRanChat = () => {
        socket.emit("randomChatLeave", true);
        setChatToggle("New Conversation");
        setChatStart(false);
    }

    return (
        <div style={{minHeight : "77vh"}} className="flex justify-center items-center bg-gray-100">
            <div style={{ minHeight : "70vh", minWidth : "65vw"}} className="flex  bg-white">
                <div className="p-5 flex flex-col justify-between">
                    <div className="font-bold ">Chats</div>
                    <button 
                        onClick={()=>chatToggle === "New Conversation" ? newRanChat() : leaveRanChat()}
                        className="bg-blue-500 whitespace-nowrap text-white font-bold py-2 px-4 rounded opacity-50 active:bg-blue-800">
                        {chatToggle}
                    </button>
                </div>
                <div className="border-l-2 border-gray-200 h-100 my-4"></div>
                <RanChatBox chatToggle={chatToggle}/>
            </div>
        </div>
    )
}

export default Randomchat;
