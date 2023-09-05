class Room {
    constructor(roomTitle, roomId, roomLimitNumber, roomReaderId) {
        this.roomId = roomId;
        this.roomTitle = roomTitle;
        this.roomLimitNumber = roomLimitNumber;
        this.roomCurrentPersonNumber = 1;
        this.roomUserArray = [roomReaderId];
        this.roomreader = roomReaderId;
    }

    enterRoom(UserId) {
        this.roomCurrentPersonNumber += 1;
        if(this.roomCurrentPersonNumber > this.roomLimitNumber) {
            this.roomCurrentPersonNumber -= 1;
            console.log("죄송합니다, 현재 방에 입장 가능한 인원을 초과하였습니다. ");
            return false;
        }

        this.roomUserArray.push(UserId);
        console.log(`${UserId}님이 ${this.roomId}에 입장하셨습니다.`);
    }

    leaveRoom(UserId) {
        this.roomUserArray = this.roomUserArray.filter(item => item !== UserId);
        this.roomCurrentPersonNumber--;
        console.log(`${UserId}님이 ${this.roomId}에서 퇴장하셨습니다.`);
    }

}

module.exports = Room;