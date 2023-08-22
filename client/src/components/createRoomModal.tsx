import React, {useState} from 'react';
import { createRoomAtom } from '../recoil/createRoomAtom';
import { useRecoilState } from "recoil";
import { Button, Dropdown, Label, Modal, TextInput } from 'flowbite-react';
import {io, Socket} from 'socket.io-client';

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io("http://localhost:3001");

export default function CreateRoomModal() {
  const limitPerson:number[] = [1,2,3,4];

  const [createRoomModal, setCreateRoomModal] = useRecoilState<Boolean>(createRoomAtom);
  const [roomTitle, setRoomTitle] = useState<string | undefined>("");
  const [roomPerson, setRoomPerson] = useState<number | string>("Number of people");

  const submitCreateRoom = ():void => {
    if(roomTitle === "") return alert("방 제목을 설정해주세요.");
    if((typeof roomPerson) !== 'number') return alert("인원수를 설정해주세요.");

    const roomData:roomType = {
      roomTitle,
      roomPerson,
      roomCreateCheck : true,
      roomId : "",
    }
    socket.emit("createRoom", roomData);
    // 방 생성 완료 시 modal창 닫기
    setCreateRoomModal(false);
  }

  return (
    <div>
        <Modal show={createRoomModal === true} size="md" popup onClose={() => setCreateRoomModal(false)}>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">Create Room</h3>
            <div>
              <div className="mb-2 block">
                <Label value="Room Title" />
              </div>
              <TextInput onChange={(e)=>setRoomTitle(e.target.value)} id="text" required/>
            </div>
            <div>
              <div className="mb-2 block">
                <Label value="Number of people in Room" />
              </div>
              <Dropdown label={roomPerson}>
                {
                  limitPerson.map((item,index)=>{
                    return (
                      <div>
                        <Dropdown.Item onClick={()=>setRoomPerson(item)}>
                          <div key={index}>{item}</div>
                        </Dropdown.Item>
                      </div>
                    )
                  })
                }
              </Dropdown>
            </div>
            <div className="w-full">
              <Button onClick={submitCreateRoom}>Create Room</Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}
