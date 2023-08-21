import {useState} from 'react'

const ChatContent = () => {
    // 이게 내 메세지가 아니라면 false, 내 메세지면 true,
    // 이 부분은 그냥 props로 받는게 맞는듯
    const [myMessage, setMyMessage] = useState<false>();

    return (
        <div>
            {
                myMessage ? (
                    // 내 메세지는 오른쪽으로
                    <div className="self-end">

                    </div>
                ) : (
                    // 상대방 메세지는 왼쪽으로
                    <div className="self-start">

                    </div>
                )
            }
        </div>
    )
}

export default ChatContent;
