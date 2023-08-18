const roomModel = require("../../models/roomModel");

const submit = {
    roomListData : async (req, res) => {
        const roomArray = roomModel.getRoomArray();
        console.log(`front로 보내기전 roomSize : ${roomArray.getRoomSize()}`)
        return res.json(roomArray);
    }
}

module.exports = {
    submit,
}