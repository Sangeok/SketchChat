type SocketType = {
    ServerToClientEvents,
    ClientToServerEvents,
}

type ServerToClientEvents = {
    server_send_message : (message:messageType) => void;
    roomPersonData_client : (person:number) => void;
    enterRoomSucess : (enterUserId : string) => void;
    enterRoomFalse : (msg : string) => void;
}
  
type ClientToServerEvents = {
    createRoom : (roomData:roomDataType) => void;
    randomChatStart : (newRanChatData:newRanChatDataType) => void;
    client_send_message : (message:messageType) => void;
    randomChatLeave : (check:boolean) => void;
    enterRoom : (enterUserData : enterUserType) => void;
}

type roomType = {
    roomCreateCheck : boolean,
    roomId : string,
    roomUserId : string[],
    roomCurrentPersonNumber : number,
    roomLimitNumber : number | string,
    roomTitle : string | undefined,
}

type messageType = {
    message : string,
    messageId : string,
}

type newRanChatDataType = {
    roomId : string,
    check : true,
}

type enterUserType = {
    socketId : string,
    enterCheck : boolean,
    enterRoomId : string,
}