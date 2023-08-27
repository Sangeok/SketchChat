import {useState, useRef, useEffect} from 'react'
import {io, Socket} from 'socket.io-client';
import {useRecoilState, useSetRecoilState} from "recoil";
import {allMessageAtom} from "../recoil/allMessageAtom";

interface propsType {
    socket: Socket<ServerToClientEvents, ClientToServerEvents>,
}

export default function ChatInput({socket} : propsType){
    const [message, setMessage] = useState<string>("");
    const setAllMessage = useSetRecoilState<messageType[]>(allMessageAtom);

    const sendMessage = async () => {
        const messageData:messageType = {
            message,
            messageId : socket.id,
        }
        await socket.emit("client_send_message", messageData);
        setAllMessage((pre)=>[...pre, messageData]);
        setMessage("");
    }

    return (
        <div style={{minHeight:"35px",boxShadow : "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px"}} className="flex items-center justify-between mb-6 px-3 rounded-md mr-5">
            <div className="w-full">
                <input
                    onChange={(e)=>setMessage(e.target.value)}
                    value={message} 
                    placeholder='Messages...' 
                    className='w-full focus:outline-none'
                />
            </div>
            <button onClick={sendMessage} className="z-50 material-symbols-outlined">send</button>
        </div>
    )
}