const { Socket } = require("dgram");
const express = require("express");
const app = express();
const http = require("http");
const dotenv = require("dotenv");
const { Server } = require("socket.io");
const cors = require("cors");
const server = http.createServer(app);

const home = require("./src/routes/home/index");
// const roomModel = require('./src/models/roomModel');

// middleware
app.use(cors());
app.use("/",home)

const disconnectHandler = require("./src/handlers/disconnectHandler");
const createRoomHandler = require("./src/handlers/createRoomHandler");
const ranChatStartHandler = require("./src/handlers/ranChatStartHandler");
const ranChatLeaveHandler = require("./src/handlers/ranChatLeaveHandler");
const enterRoomHandler = require("./src/handlers/enterRoomHandler");

dotenv.config();

const io = new Server(server, {
    cors : {
        origin : "http://localhost:3000",
        method : ["GET","POST"],
    }
})

io.on("connection", (socket)=>{
    socket.on("createRoom", (data)=>{
        if(data.roomCreateCheck) {
            createRoomHandler(socket,data);
        }
    })

    socket.on("enterRoom", (enterUserData)=>{
        if(enterUserData.enterCheck) {
            enterRoomHandler(socket, enterUserData, () => {
            // 그 후 client에 어떤 참여자가 참여했는지 알리기
                io.to(enterUserData.enterRoomId).emit("enterRoomSucess", socket.id);
            });
        }
    })

    // randomChat 방을 만듬
    socket.on("randomChatStart", (data)=>{
        console.log(`${socket.id}님이 랜덤채팅 시작하셨습니다..`);
        if(data.check){
            ranChatStartHandler(socket,data, () => {
                // ranChatStartHandler가 완료된 후에 실행될 콜백 함수
                io.to(socket.roomObj.roomId).emit('roomPersonData_client', socket.roomObj.roomPerson);
            });
        }
    })

    socket.on("randomChatLeave",(check)=>{
        if(check) {
            ranChatLeaveHandler(socket);
        }
    })

    socket.on("client_send_message", (data)=>{
        console.log(`${socket.id}님이 채팅방 ${socket.roomObj.roomId}에 ${data.message}를 보내셨습니다.`)
        socket.to(socket.roomObj.roomId).emit("server_send_message", data);
    })

    socket.on("disconnect", ()=>{
        disconnectHandler(socket);
    })
})

module.exports = {
    server,
}