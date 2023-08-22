import {useState, useRef, useEffect} from 'react'
import {io, Socket} from 'socket.io-client';
import ChatContent from '../components/chatContent';

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io("http://localhost:3001");

const Randomchat = () => {
    const [message, setMessage] = useState<string>("");
    const [allMessage, setAllMessage] = useState<messageType[]>([]);

    const messagesRef = useRef<HTMLDivElement>(null);
    const effectForRef = useRef(false);

    const newRanChat= () => {
        socket.emit("randomChatStart", true);
    }

    const sendMessage = async () => {
        const messageData:messageType = {
            message,
            messageId : socket.id,
            myId : "",
        }
        await socket.emit("client_send_message", messageData);
        setAllMessage((pre)=>[...pre, messageData]);
    }

    useEffect(()=>{
        if(effectForRef.current === false) {
            const fetchSocket = () => {
                // socket의 message를 읽음
               socket.on("server_send_message", (data)=>{
                 setAllMessage((pre)=>[...pre, data]);
               })
             }
             fetchSocket();
           }
       
           return () => {
             effectForRef.current = true;
           }
    },[socket])

    useEffect(()=>{
        // 스크롤 컨테이너를 아래로 스크롤
        if (messagesRef.current) {
            messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
        }
    },[allMessage]);

    return (
        <div style={{minHeight : "77vh"}} className="flex justify-center items-center bg-gray-100">
            <div style={{ minHeight : "70vh", minWidth : "65vw"}} className="flex  bg-white">
                <div className="p-5 flex flex-col justify-between">
                    <div className="font-bold ">Chats</div>
                    <button 
                        onClick={newRanChat}
                        className="bg-blue-500 whitespace-nowrap text-white font-bold py-2 px-4 rounded opacity-50 active:bg-blue-800">New Conversation
                    </button>
                </div>
                <div className="border-l-2 border-gray-200 h-100 m-4"></div>
                <div style={{maxHeight:"72vh", width : "100%"}} className="flex flex-col overflow-hidden">
                    <div ref={messagesRef} style={{minHeight : "63vh"}} className="py-5 overflow-y-scroll">
                        {/* map으로 message에 대한 배열을 열어서 ChatContent에 전달함 이에 따라 chatContent에서 메세지를 나눠서 보여줌.*/}
                        {
                            allMessage.map((messageData,index)=>{
                                messageData.myId = socket.id;
                                return (
                                    <ChatContent key={index} {...messageData}/>
                                )
                            })
                        }
                    </div>
                    <div style={{minHeight:"35px",boxShadow : "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px"}} className="flex items-center  justify-between mb-6 px-3 rounded-md mr-5">
                        
                        <div className="w-full">
                            <input
                                onChange={(e)=>setMessage(e.target.value)} 
                                placeholder='Messages...' 
                                className='w-full focus:outline-none'
                            />
                        </div>
                        {/* <button onClick={sendMessage}>send</button> */}
                        <button onClick={sendMessage} className="z-50 material-symbols-outlined">send</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Randomchat;
