// module
const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/home/home.ctrl");

// 서버에서 front로 방 배열 list보내기
router.post("/", ctrl.submit.roomListData);

module.exports = router;