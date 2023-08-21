export default function RoomList( room : roomType ) {

    return (
        <div>
            <p>{room.roomTitle}</p>
            <p>{room.roomPerson}</p>
        </div>
    )
}