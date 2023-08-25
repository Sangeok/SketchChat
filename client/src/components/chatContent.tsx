export default function ChatContent( messageData : messageType ) {

    return (
        <div className="flex flex-col w-full">
            {
                messageData.myId === messageData.messageId ? (
                    <div className="self-end px-5">
                        {messageData.message}
                    </div>
                ) : (
                    <div className="self-start">
                        {messageData.message}
                    </div>
                )
            }
        </div>
    )
}
