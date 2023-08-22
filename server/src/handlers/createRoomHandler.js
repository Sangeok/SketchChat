module.exports = (socket,roomData) => {
    const getRoomId = require("../public/js/getRoomId");
    const roomModel = require('../models/roomListModel');
    const roomArray = roomModel.getRoomArray();

    // 기존 roomdata에 roomId값을 부여함.
    roomData.roomId = getRoomId(socket)
    // console.log(`개인 roomId : ${roomData.roomId}`);

    console.log(`${socket.id}님이 방을 만드셨습니다.`);
    roomArray.setRoomArray(roomData);
    console.log(`생성된 방의 수 : ${roomArray.getRoomSize()}`);
}