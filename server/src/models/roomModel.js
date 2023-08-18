const roomList = require('../public/js/roomList');
const roomArray = new roomList();

module.exports = {
    getRoomArray: () => roomArray
};