const Room = require('./room'); // 이걸 model로 뺴는게 좋을듯?

class roomList {
    // 현재 roomList 뿐만 아니라 room에 대한 메소드까지 가지고 있음(나중에 최적화 필요)
    constructor() {
        this.roomArray = [];
    }

    setRoomArray(roomTitle, roomLimitNumber, roomId, roomReaderId){
        const room = new Room(roomTitle, roomLimitNumber, roomId, roomReaderId);
        this.roomArray.push(room);
    }

    getRoomArray() {
        return roomArray;
    }

    getRoomSize(){
        return this.roomArray.length;
    }

    deleteRoom(id){
        // 특정방 id값과 동일한 방을 배열에서 찾아 삭제함.
        // reduce함수를 사용하는 것이 좋을듯.
        
    }

    findRoom(roomId) {
        const room = this.roomArray.find(arr=> arr.roomId === roomId);
        return room;
    }

    clearRoomList() {
        this.roomArray = [];
    }
}

module.exports = roomList;
