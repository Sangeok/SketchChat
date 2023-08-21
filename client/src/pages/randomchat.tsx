import React from 'react'

import ChatContent from '../components/chatContent';

const Randomchat = () => {
    

    return (
        <div style={{minHeight : "77vh"}} className="flex justify-center items-center bg-gray-100">
            <div style={{minHeight : "70vh", minWidth : "65vw"}} className="flex  bg-white">
                <div className="p-5 flex flex-col justify-between">
                    <div className="font-bold ">Chats</div>
                    <button className="bg-blue-500 whitespace-nowrap text-white font-bold py-2 px-4 rounded opacity-50 hover:bg-blue-800">New Conversation</button>
                </div>
                <div className="border-l-2 border-gray-200 h-100 m-4"></div>
                <div style={{width : "100%"}} className="flex flex-col">
                    <div style={{minHeight : "63vh"}} className="py-5">
                        {/* map으로 message에 대한 배열을 열어서 ChatContent에 전달함 이에 따라 chatContent에서 메세지를 나눠서 보여줌.*/}
                        <ChatContent/>
                    </div>
                    <div style={{height : "40px", boxShadow : "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px"}} className="flex items-center  justify-between my-5 px-3 rounded-md mr-5">
                        
                        <div className="w-full"><input placeholder='Messages...' className='w-full focus:outline-none'/></div>
                        <span className="material-symbols-outlined">send</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Randomchat;
