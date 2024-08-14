
const express = require("express");
const { sendMessage, getMessages } = require("../controller/message");

const router = express.Router();
router.post("/messages",sendMessage)
router.get("/messages",getMessages)


module.exports = router;