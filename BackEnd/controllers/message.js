
const Message = require("../models/message");

exports.sendMessage = async (req, res, next) => {
  console.log(req.body);
  try {
    const groupId = req.params.groupId;
    const user = req.user;
    const message = req.body.message;
    const username = req.user.name;
    const data = await user.createMessage({
      message: message,
      Username: username,
      groupId: groupId,
    });
    res.status(201).json({ newUserDetail: data });
  } catch (err) {
    console.log("In Post Error", err);
    res.status(401).json(err);
  }
};


exports.getGroupMessages = async (req, res, next) => {
  try {
    console.log("i  a m  runned");
    console.log(req.params);
    const groupId = req.params.groupId;
   
    const message = await Message.findAll({
      where: {
        groupId: groupId,
      },
    });
    res.status(201).json({ messages: message });
  } catch (err) {
    res.status(401).json(err);
  }
};
