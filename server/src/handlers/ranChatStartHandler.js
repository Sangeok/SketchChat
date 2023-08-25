module.exports = (socket,callback) => {
    const getRoomId = require("../public/js/getRoomId");
    const ranChatModel = require('../models/ranChatListModel');
    const ranChatQueue = ranChatModel.getRanChatQueue();

    if(ranChatQueue.isEmpty()) {
        const roomObj = {
            roomId : getRoomId(socket),
            roomPerson : 1,
        }
        ranChatQueue.enqueue(roomObj);
        socket.join(roomObj.roomId);
        console.log(`당신이 대기할 방은 ${roomObj.roomId} 입니다.`);
        socket.roomObj= roomObj;
        console.log(`${socket.id}님이 ${roomObj.roomId}에 입장하셨습니다.`);
        callback(); // ranChatStartHandler가 완료되었음을 알리는 콜백 호출
    }
    else {
        const roomObj = ranChatQueue.dequeue();
        roomObj.roomPerson += 1;
        console.log(`입장할 roomId : ${roomObj.roomId}`);
        socket.join(roomObj.roomId);
        socket.roomObj= roomObj;

        console.log(`${socket.id}님이 ${roomObj.roomId}에 입장하셨습니다.`)
        callback(); // ranChatStartHandler가 완료되었음을 알리는 콜백 호출
    }
    
}