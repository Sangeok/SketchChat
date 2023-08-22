import {useState} from 'react'

// 내 생각에 자식으로 넘길 때는 무조건 interface로 밖에 안되는듯?

export default function ChatContent( messageData : messageType ) {

    return (
        <div className="flex flex-col w-full">
            {
                messageData.myId === messageData.messageId ? (
                    // 내 메세지는 오른쪽으로
                    <div className="self-end px-5">
                        {messageData.message}
                    </div>
                ) : (
                    // 상대방 메세지는 왼쪽으로
                    <div className="self-start">
                        {messageData.message}
                    </div>
                )
            }
        </div>
    )
}
