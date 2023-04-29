const express = require("express");

const router = express.Router();

const userAuth = require("../middleware/auth");

const mediacontroller = require("../controllers/media");

const multer = require("multer");

const upload = multer();

router.post(
  "/sendmedia/:groupid",
  upload.single("myFile"),
  userAuth.authenticate,
  mediacontroller.postmedia
);

module.exports = router;
