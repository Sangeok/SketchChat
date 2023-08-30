module.exports = (socket,enterUserData) => {
    const roomModel = require('../models/roomListModel');
    const roomArray = roomModel.getRoomArray();

    // 해당 방의 현재 참여 인원수 늘리기
    // 이건 현재 roomArray에 존재하는 것 중에 enterRoomId와 동일한 roomId값을 찾아 현재 그 방의 인원수를 늘려주면 됨.
    socket.join(enterUserData.enterRoomId);
    console.log(`${socket.id}님이 ${enterUserData.enterRoomId}에 입장하셨습니다.`);

    const enterRoom = roomArray.enterRoomPerson(socket.id,enterUserData.enterRoomId);
    if(enterRoom === false) {
        console.log("죄송합니다, 현재 방에 입장 가능한 인원을 초과하였습니다. ");
        return ;
    }
    console.log(`입장하려는 room ${enterUserData.enterRoomId}`);

    
}