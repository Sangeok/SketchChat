module.exports = (socket,callBack) => {
    const roomModel = require('../models/roomListModel');
    const roomArray = roomModel.getRoomArray();

    socket.leave(socket.roomObj.roomId);

    const findRoom = roomArray.findRoom(socket.roomObj.roomId);
    findRoom.leaveRoom(socket.id);

    const beforeRoomId = socket.roomObj.roomId;
    
    // roomId 초기화
    socket.roomObj.roomId = "";

    callBack(beforeRoomId);

    

}