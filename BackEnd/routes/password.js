const express = require("express");

const router = express.Router();

const passwordController = require("../controllers/password");

router.post("/forgotpassword",passwordController.forgotPassword);

router.get("/resetpassword/:id",passwordController.resetPassword);

router.post("/finalreset", passwordController.finalReset);

module.exports=router;
