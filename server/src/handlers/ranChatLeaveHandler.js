module.exports = (socket) => {
    if(socket.roomObj) {
        console.log(`${socket.id}님이 ${socket.roomObj.roomId}에서의 랜덤채팅을 종료하셨습니다..`)
        socket.roomObj.roomId = "";
        console.log(`${socket.id}님의 현재 roomId는 ${socket.roomObj.roomId}`);
    }
}