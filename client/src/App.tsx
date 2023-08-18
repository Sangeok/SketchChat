import React, { useEffect, useState } from 'react';
import { createRoomAtom } from './recoil/createRoomAtom';
import {useRecoilState} from "recoil";

import {io, Socket} from 'socket.io-client';
import CreateRoomModal from "./components/createRoomModal";

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io("http://localhost:3001");

function App() {
  const [createRoomModal, setCreateRoomModal] = useRecoilState<Boolean>(createRoomAtom);

  useEffect(()=>{
    fetch('http://localhost:3001', {
      method : "POST",
      headers : {
          "Content-Type" : "application/json",
      },
    })
    .then((res)=>res.json())
    .then((res)=>console.log(res));
  },[createRoomModal])

  const Room = () : void => {
    setCreateRoomModal(true);
  }

  const createRoom = () : void => {
    socket.emit("createRoom", true);
  }

  return (
    <div className="flex flex-col ">
      <button onClick={()=>setCreateRoomModal(true)}>방 생성하기</button>
      {
        createRoomModal && <CreateRoomModal />
      }
    </div>
  );
}

export default App;
