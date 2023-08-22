const ranChatList = require('../public/js/ranChatList');
const randomChatQueue = new ranChatList();

module.exports = {
    getRanChatQueue: () => randomChatQueue
};