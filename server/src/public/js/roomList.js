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

    findRoom(roomId) {
        const room = this.roomArray.find(arr=> arr.roomId === roomId);
        return room;
    }

    UpdateRoom(roomId) {

    }

    enterRoomPerson(socketId,id) {
        // this를 사용하여 현재 클래스의 메서드를 호출함.(findRoom은 멤버 함수이므로..)
        const enterRoom = this.findRoom(id);
        
        // 방에 입장할 수 있는지 검사.
        console.log(`현재 방 인원수 ${enterRoom.roomCurrentPersonNumber }`);
        console.log(`현재 방에 입장 가능 인원수 ${enterRoom.roomLimitNumber }`);
        
        enterRoom.roomCurrentPersonNumber += 1;
        if(enterRoom.roomCurrentPersonNumber > enterRoom.roomLimitNumber) {
            enterRoom.roomCurrentPersonNumber -= 1;
            console.log("죄송합니다, 현재 방에 입장 가능한 인원을 초과하였습니다. ");
            return false;
        }

        // 방 입장 시 입장한 user의 정보를 해당 방에 넣음.
        // 다시 roomArray에 넣어주지 않아도 됨.
        enterRoom.roomUserId.push(socketId);

    }

    clearRoomList() {
        this.roomArray = [];
    }
}

module.exports = roomList;
