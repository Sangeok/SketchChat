module.exports = (socket,enterUserData,callBack) => {
    const roomModel = require('../models/roomListModel');
    const roomArray = roomModel.getRoomArray();


    const findRoom = roomArray.findRoom(enterUserData.enterRoomId);
    findRoom.enterRoom(socket.id);
    // 해당 방의 현재 참여 인원수 늘리기, 입장 가능 여부를 따짐
    // const enterRoom = roomArray.enterRoomPerson(socket.id,enterUserData.enterRoomId);
    // if(enterRoom === false) {
    //     console.log("죄송합니다, 현재 방에 입장 불가능합니다.");
    //     return callBack(false);
    // }

    const roomObj = {
        roomId : enterUserData.enterRoomId,
    }

    socket.join(enterUserData.enterRoomId);
    socket.roomObj= roomObj;
    console.log(`${socket.id}님이 ${enterUserData.enterRoomId}에 입장하셨습니다.`);
    return callBack(true);

    
}