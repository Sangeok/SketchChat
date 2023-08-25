type ServerToClientEvents = {
    server_send_message : (message:messageType) => void;
    roomPersonData_client : (person:number) => void;
}
  
type ClientToServerEvents = {
    createRoom : (roomData:roomDataType) => void;
    randomChatStart : (check:boolean) => void;
    client_send_message : (message:messageType) => void;
    randomChatLeave : (check:boolean) => void;
    roomPersonData_server : (check:boolean) => void;
}

type roomType = {
    roomCreateCheck : boolean,
    roomId : string,
    roomPerson : number | string,
    roomTitle : string | undefined,
}

type messageType = {
    message : string,
    messageId : string, 
    myId : string,
}