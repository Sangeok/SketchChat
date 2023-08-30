import {useState,useEffect,useContext} from 'react'
import {useRecoilState, useRecoilValue} from "recoil";

import { SocketContext } from '../context/socket';

import {io, Socket} from 'socket.io-client';

import { createRoomAtom } from '../recoil/createRoomAtom';
import CreateRoomModal from '../components/createRoomModal';
import RoomList from '../components/roomList';

const Findingroom = () => {
    const socket = useContext<Socket>(SocketContext);
    const [createRoomModal, setCreateRoomModal] = useRecoilState<Boolean>(createRoomAtom);
    const [roomListArr, setRoomListArr] = useState<roomType[]>([]);

    useEffect(()=>{
        fetch('http://localhost:3001/findingroom', {
          method : "POST",
          headers : {
              "Content-Type" : "application/json",
          },
        })
        .then((res)=>res.json())
        .then((res)=>{
          console.log(res.roomArray.length);
          setRoomListArr(res.roomArray)
        });
      },[])

    return (
        <div style={{minHeight : "77vh"}} className="flex flex-col justify-between bg-gray-100">
            <div>
                {
                    createRoomModal && <CreateRoomModal socket={socket}/>
                }
                {
                    // spread syntax를 통해 room안에 있는 모든 요소들을 RoomList로 보냄.
                    roomListArr.map((room,index)=>{
                    return (
                        <div>
                            <RoomList key={index} room={room}/>
                        </div>
                    )
                    })
                }
            </div>
            <div className="flex justify-between">
                <div/>
                <div>
                    <button className='px-5' onClick={()=>setCreateRoomModal(true)}>방 생성하기</button>
                </div>
            </div>
        </div>
    )
}

export default Findingroom;
