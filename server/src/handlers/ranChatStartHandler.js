module.exports = (socket) => {
    const getRoomId = require("../public/js/getRoomId");
    const ranChatModel = require('../models/ranChatListModel');
    const ranChatQueue = ranChatModel.getRanChatQueue();

    let roomId;
    if(ranChatQueue.isEmpty()) {
        roomId = getRoomId(socket);
        ranChatQueue.enqueue(roomId);
        socket.join(roomId);
        console.log(`당신이 대기할 방은 ${roomId} 입니다.`);
        socket.ranChatRoomId = roomId;
        console.log(`${socket.id}님이 ${socket.ranChatRoomId}에 입장하셨습니다.`)
    }
    else {
        roomId = ranChatQueue.dequeue();
        console.log(`입장할 roomId : ${roomId}`);
        socket.join(roomId);

        socket.ranChatRoomId = roomId;
        console.log(`${socket.id}님이 ${socket.ranChatRoomId}에 입장하셨습니다.`)
    }
    
}