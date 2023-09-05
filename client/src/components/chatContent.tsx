import {io, Socket} from 'socket.io-client';

interface propsType {
    socket: Socket<ServerToClientEvents, ClientToServerEvents>,
    messageData : messageType,
}

export default function ChatContent({socket, messageData}: propsType ) {

    return (
        <div className="flex flex-col w-full">
            {
                messageData.notification ? (
                    <div className="self-center px-5">
                        {messageData.message}
                    </div>
                ) : (
                socket.id === messageData.messageId ? (
                    <div className="self-end px-5">
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
