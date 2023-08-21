import React, { useEffect, useState } from 'react';
import { createRoomAtom } from './recoil/createRoomAtom';
import {useRecoilState} from "recoil";

import {io, Socket} from 'socket.io-client';
import CreateRoomModal from "./components/createRoomModal";
import RoomList from './components/roomList';
import Header from './components/header';
import Footer from './components/footer';
import Maincontent from './components/maincontent';
import Routers from './components/routers';

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io("http://localhost:3001");

function App() {
  const [createRoomModal, setCreateRoomModal] = useRecoilState<Boolean>(createRoomAtom);
  const [roomListArr, setRoomListArr] = useState<roomType[]>([]);

  useEffect(()=>{
    // fetch('http://localhost:3001', {
    //   method : "POST",
    //   headers : {
    //       "Content-Type" : "application/json",
    //   },
    // })
    // .then((res)=>res.json())
    // .then((res)=>{
    //   console.log(res);
    //   console.log(`얻고자하는 index : ${res.roomArray.length-1}`);
    //   setRoomListArr((pre:roomType[])=>[...pre, res.roomArray[res.roomArray.length-1]])
    // });
  },[createRoomModal])


  return (
    <div className="flex flex-col ">
      <Header/>
      {/* <button onClick={()=>setCreateRoomModal(true)}>방 생성하기</button> */}
      {
        createRoomModal && <CreateRoomModal />
      }
      <Routers/>
      {
        // spread syntax를 통해 room안에 있는 모든 요소들을 RoomList로 보냄.
        roomListArr.map((room,index)=>{
          return (
            <div>
              <RoomList key={index} {...room}/>
            </div>
          )
        })
      }
      <Footer/>
    </div>
  );
}

export default App;
