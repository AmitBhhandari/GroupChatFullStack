const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

require("dotenv").config();

const generateAccessToken = (id, name) => {
  return jwt.sign({id, name}, process.env.TOKEN_SECRET);
};

exports.postSignup = async (req, res, next) => {
  try {
    const name = req.body.name;
    const email = req.body.email;
    var phone = req.body.phone;
    const password = req.body.password;
    const saltrounds = 10;
    bcrypt.hash(password, saltrounds, async (err, hash) => {
      await User.create({
        name,
        email,
        password: hash,
        phone,
      });
      res.status(201).json({ messege: "Successfully created new user" });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Email Already Exists",
    });
  }
};

exports.postLogin = async (req, res, next) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const user = await User.findAll({
      where: { email },
    });
    if (user.length > 0) {
      bcrypt.compare(password, user[0].password, (err, result) => {
        if (err) {
          throw new Error("Something went wrong");
        }
        if (result) {
          return res.status(200).json({
            success: true,
            name: user[0].name,
            email: user[0].email,
            messege: "User Logged in successfully",
            token: generateAccessToken(user[0].id, user[0].name),
          });
        } else {
          return res
            .status(400)
            .json({ success: false, messege: "User Doesnot exist" });
        }
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "User not Found",
    });
  }
};
