type ServerToClientEvents = {
    
}
  
type ClientToServerEvents = {
    createRoom : (check:boolean) => void;
}

type roomType = {
    roomCreateCheck : boolean,
    roomId : string,
    roomPerson : number,
    roomTitle : string,
}