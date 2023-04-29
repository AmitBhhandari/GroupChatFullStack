const express = require("express");

const router = express.Router();

const userAuth = require("../middleware/auth");
const messageController = require("../controllers/message");

router.post(
  "/sendmsg/:groupId",
  userAuth.authenticate,
  messageController.sendMessage
);


router.get("/getgroupmessages/:groupId",userAuth.authenticate,messageController.getGroupMessages);

module.exports = router;
