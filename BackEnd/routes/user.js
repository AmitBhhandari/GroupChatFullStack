const express = require("express");

const router = express.Router();

const UserController = require("../controllers/user");

router.post("/signup",UserController.postSignup);

router.post("/login",UserController.postLogin);

module.exports = router;
