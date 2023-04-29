const express = require("express");

const Sib = require("sib-api-v3-sdk");

const uuid = require("uuid");
const bcrypt = require("bcrypt");
require("dotenv").config();

const User = require("../models/user");
const ForgotPassword = require("../models/forgotpassword");

const client = Sib.ApiClient.instance;
const apiKey = client.authentications["api-key"];
apiKey.apiKey = process.env.SIB_KEY;

exports.forgotPassword = async (req, res, next) => {
  const { email } = req.body;
  console.log(email);
  const tranEmailApi = new Sib.TransactionalEmailsApi();
  const id = uuid.v4();
  console.log(id);
  User.findAll({ where: { email }, attributes: ["id"] })
    .then((data) => {
      const jsonData = JSON.parse(JSON.stringify(data));
      console.log(jsonData);
      if (jsonData.length > 0) {
        return ForgotPassword.create({
          id,
          isActive: true,
          userId: jsonData[0].id,
        });
      } else {
        res.json({ status: "email not found" });
      }
    })
    .then((data) => {
      const sender = {
        name: "Reset Password",
        email: "alibaba@expense.com",
      };
      const recivers = [
        {
          email: email,
        },
      ];
      return tranEmailApi.sendTransacEmail({
        sender,
        to: recivers,
        subject: "Reset Password",
        textContent: "Reset Your Password",
        htmlContent: `<a href=http://localhost:5000/password/resetpassword/${id} > Reset Link </a>`,
      });
    })
    .then((data) => {
      console.log(data);
      res.status(200).json({ status: "done" });
    })
    .catch((e) => {
      console.log(e);
      res.json({ status: "error" });
    });
};

exports.resetPassword = async (req, res, next) => {
  try {
    const data = await ForgotPassword.findByPk(req.params.id);
    if (data.isActive) {
      data.isActive = false;
      data.save();
      res.send(`
        <form action='http://localhost:5000/password/finalreset' method='POST'>
          <input name='password' placeholder='enter new password'/>
          <input type="hidden" name="id" value=${data.userId} />
          <button type='submit'>Submit</button>
        </form>`);
    } else {
      res.send("<h1>Link Exprire</h1>");
    }
  } catch (err) {
    console.log(err);
    res.send("<h1>Link Exprire</h1>");
  }
};

exports.finalReset = (req, res, next) => {
    console.log(req.body);
  const { password, id } = req.body;
  const saltrounds = 10;
  bcrypt.hash(password, saltrounds, (err, hash) => {
    User.findByPk(id)
      .then((data) => {
        data.password = hash;
        data.save();
        res.send("<h3>Password Has Been Reset!</h3><h3>Login again</h3>");
      })
      .catch((err) => {
        console.log(err);
      });
  });
};
