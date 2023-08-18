class roomList {
    constructor() {
        this.roomArray = [];
    }

    setRoomArray(room){
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

    clearRoomList() {
        this.roomArray = [];
    }
}

module.exports = roomList;
