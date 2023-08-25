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

    // randomChat 방을 만듬
    socket.on("randomChatStart", (check)=>{
        console.log(`${socket.id}님이 랜덤채팅 시작하셨습니다..`);
        if(check){
            ranChatStartHandler(socket, () => {
                // ranChatStartHandler가 완료된 후에 실행될 콜백 함수
                // roomId에 존재하는 user에게 broadcasting으로 방 인원을 전송
                io.to(socket.roomObj.roomId).emit('roomPersonData_client', socket.roomObj.roomPerson);
                // socket.to(socket.roomObj.roomId).emit("roomPersonData_client", socket.roomObj.roomPerson);
                console.log("roomData 보냈다고요..");
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

    socket.on("roomPersonData_server", (check)=>{
        console.log(`현재 ${socket.id}님이 접속한 ${socket.roomObj.roomId}의 사람 수는 ${socket.roomObj.roomPerson}입니다.`);
        if(check) {
            console.log(`roomData보낸다고 씨발 ${socket.roomObj.roomPerson}`);
            socket.to(socket.roomObj.roomId).emit("roomPersonData_client", socket.roomObj.roomPerson);
        }
    })

    socket.on("disconnect", ()=>{
        disconnectHandler(socket);
    })
})

module.exports = {
    server,
}