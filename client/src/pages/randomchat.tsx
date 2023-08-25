import {useState, useRef, useEffect} from 'react'
import {io, Socket} from 'socket.io-client';
import ChatBox from '../components/chatBox';

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io("http://localhost:3001");

const Randomchat = () => {
    const [chatToggle, setChatToggle] = useState<string>("New Conversation");

    const newRanChat= async () => {
        await socket.emit("randomChatStart", true);
        setChatToggle("Leave Conversation");
    }

    const leaveRanChat = () => {
        socket.emit("randomChatLeave", true);
        setChatToggle("New Conversation");
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
                <div className="border-l-2 border-gray-200 h-100 m-4"></div>
                <ChatBox socket={socket} chatToggle={chatToggle}/>
            </div>
        </div>
    )
}

export default Randomchat;
