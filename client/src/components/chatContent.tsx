import {io, Socket} from 'socket.io-client';

interface propsType {
    socket: Socket<ServerToClientEvents, ClientToServerEvents>,
    messageData : messageType,
}

export default function ChatContent({socket, messageData}: propsType ) {

    return (
        <div className="flex flex-col w-full px-5">
            {
                messageData.notification ? (
                    <div className="self-center">
                        {messageData.message}
                    </div>
                ) : (
                socket.id === messageData.messageId ? (
                    <div className="self-end">
                        {messageData.message}
                    </div>
                ) : (
                    <div className="self-start">
                        {messageData.message}
                    </div>
                ))
            }
        </div>
    )
}
