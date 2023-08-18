module.exports = (socket,roomData) => {
    // 여기에서 roomId값을 생성하여 roomData에 넣은 후 array에 넣어줌.
    //const {roomArray} = require("../../server");

    const roomModel = require('../models/roomModel');
    const roomArray = roomModel.getRoomArray();

    const getRandomNumber = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const getRoomId = () => {
        let randomRoomId = getRandomNumber(1,1000);
        let roomId = socket.id + randomRoomId.toString();
        return roomId;
    }

    // 기존 roomdata에 roomId값을 부여함.
    roomData.roomId = getRoomId();
    // console.log(`개인 roomId : ${roomData.roomId}`);

    console.log(`${socket.id}님이 방을 만드셨습니다.`);
    roomArray.setRoomArray(roomData);
    console.log(`생성된 방의 수 : ${roomArray.getRoomSize()}`);
}