const express = require("express");

const router = express.Router();

const userAuth = require("../middleware/auth");

const groupController = require("../controllers/group");

router.post("/creategroup", userAuth.authenticate, groupController.createGroup);

router.get("/getgroups", userAuth.authenticate, groupController.getGroups);

router.get(
  "/getgroupusers/:groupId",
  userAuth.authenticate,
  groupController.getGroupUsers
);

router.post(
  "/addusertogroup",
  userAuth.authenticate,
  groupController.addUserToGroup
);

router.delete(
  "/deleteuser/:groupId/:userId",
  userAuth.authenticate,
  groupController.deleteUser
);

router.delete(
  "/deletegroup/:groupId",
  userAuth.authenticate,
  groupController.deleteGroup
);

module.exports = router;
