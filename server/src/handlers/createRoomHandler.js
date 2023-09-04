module.exports = (socket,roomData) => {
    const roomModel = require('../models/roomListModel');
    const roomArray = roomModel.getRoomArray();

    console.log(`${socket.id}님이 방을 만드셨습니다.`);
    roomArray.setRoomArray(roomData);

    // 생성한 사람도 socket room에 참가
    const roomObj = {
        roomId : roomData.roomId,
    }
    socket.join(roomData.roomId);
    socket.roomObj= roomObj;
    console.log(`생성된 방의 수 : ${roomArray.getRoomSize()}`);
}