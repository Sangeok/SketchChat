import {useState,useEffect} from 'react'
import {useRecoilState} from "recoil";

import { createRoomAtom } from '../recoil/createRoomAtom';
import CreateRoomModal from '../components/createRoomModal';
import RoomList from '../components/roomList';

const Findingroom = () => {
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
          console.log(res);
          console.log(`얻고자하는 index : ${res.roomArray.length-1}`);
          setRoomListArr((pre:roomType[])=>[...pre, res.roomArray[res.roomArray.length-1]])
        });
      },[createRoomModal])

    return (
        <div>
            <button onClick={()=>setCreateRoomModal(true)}>방 생성하기</button>
            {
                createRoomModal && <CreateRoomModal />
            }
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
        </div>
    )
}

export default Findingroom;
