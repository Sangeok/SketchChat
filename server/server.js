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

    socket.on("disconnect", ()=>{
        disconnectHandler(socket);
    })
})

module.exports = {
    server,
}