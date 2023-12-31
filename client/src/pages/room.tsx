import {useContext} from 'react'
import {io, Socket} from 'socket.io-client';
import { SocketContext } from '../context/socket';
import { allMessageAtom } from '../recoil/allMessageAtom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import RoomChatBox from '../components/roomChatBox';
import { useNavigate, useBeforeUnload, useLocation} from 'react-router-dom';
import { chatCheckAtom } from '../recoil/chatCheckAtom';

const Room = () => {
    const socket = useContext<Socket>(SocketContext);
    const navigate = useNavigate();

    const setChatStart = useSetRecoilState<boolean>(chatCheckAtom);
    const setAllMessage = useSetRecoilState<messageType[]>(allMessageAtom);

    const leaveRoomHandler = () => {
        socket.emit("leaveRoom", true);
        //messageAtom 초기화
        setAllMessage([]);
        setChatStart(false);
        navigate("/findingroom");
    }

    return (
        <div>
            <RoomChatBox />
            <div className="flex justify-end px-5">
                <button onClick={leaveRoomHandler}>방 나가기</button>
            </div>

        </div>
    )
}

export default Room;
