// module
const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/home/home.ctrl");

// 해당 주소로 post(front가 받기 위해선 localhost:3001/findingroom으로 fetch해야함)
router.post("/findingroom", ctrl.submit.roomListData);

module.exports = router;