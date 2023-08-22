module.exports = (socket) =>{
    const getRandomNumber = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    let randomRoomId = getRandomNumber(1,1000);
    let roomId = socket.id + randomRoomId.toString();
    return roomId;
}
