const User = require("../models/user");
const Group = require("../models/group");
const Usergroup = require("../models/usergroup");

exports.createGroup = async (req, res, next) => {
  const groupname = req.body.groupname;
  const data = await Group.create({
    groupname,
    userId: req.user.id,
  });
  const usrgrp = await Usergroup.create({
    is_admin: true,
    groupId: data.dataValues.id,
    userId: req.user.id,
    userName: req.user.name,
    groupName: groupname,
  });
  res.status(201).json({
    newGroupDetail: usrgrp,
  });
};

exports.getGroups = async (req, res) => {
  const groups = await Usergroup.findAll({
    where: {
      userId: req.user.id,
    },
  });
  res.status(200).json({ allgrpusr: groups });
};

exports.getGroupUsers = async (req, res) => {
  const gId = req.params.groupId;
  const allgroupusers = await Usergroup.findAll({
    where: { groupId: gId },
  });
  res.status(200).json({ allgrpusr: allgroupusers });
};

exports.addUserToGroup = async (req, res, next) => {
  try {
    const usrname = req.body.username;
    const addis_admin = req.body.is_admin;
    const groupName = req.body.groupName;
    const uid = req.user.id;
    console.log("is_admin=====>", addis_admin);
    console.log("jvgvhjsjhbsjhv usrname", usrname);
    console.log("jvvgsugs group name", groupName);
    var addusrid;
    var addgrpid;
    const verusrname = await User.findAll({ where: { name: usrname } });
    console.log("verusrname=====>", verusrname[0].id);
    addusrid = verusrname[0].id;

    const vergroupname = await Group.findAll({
      where: { groupname: groupName },
    });
    console.log(vergroupname[0].id);
    console.log("vergroupname===>", vergroupname[0].id);
    addgrpid = vergroupname[0].id;
    console.log(" >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>" + uid, addgrpid);
    const verisadmin = await Usergroup.findAll({
      where: { userId: uid, groupId: addgrpid },
    });

    console.log("verisadmin=====>", verisadmin[0]);
    if (verisadmin[0].is_admin) {
      if (addis_admin == "Yes") {
        await Usergroup.create({
          is_admin: true,
          userName: usrname,
          groupName: groupName,
          groupId: addgrpid,
          userId: addusrid,
        });
      } else {
        await Usergroup.create({
          is_admin: false,
          userName: usrname,
          groupName: groupName,
          groupId: addgrpid,
          userId: addusrid,
        });
      }
    }
    const allgroupusers = await Usergroup.findAll({
      where: { groupId: addgrpid },
    });
    return res.status(200).json({ allgrpusr: allgroupusers });
  } catch (error) {
    return res.status(403).json({ error, success: false });
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const uid = req.user.id;
    const groupId = req.params.groupId;
    const userId = req.params.userId;
    const cheackAdmin = await Usergroup.findAll({
      where: {
        groupId: groupId,
        userId: uid,
      },
    });

    if (cheackAdmin[0].is_admin) {
      const deleteUser = await Usergroup.destroy({
        where: {
          userId: userId,
          groupId: groupId,
        },
      });
      if (deleteUser) {
        return res.status(201).json({ message: "user deleted" });
      }
    } else if (uid == userId) {
      const deleteUser = await Usergroup.destroy({
        where: {
          userId: userId,
          groupId: groupId,
        },
      });
      if (deleteUser) {
        return res.status(201).json({ message: "user deleleted" });
      }
    } else {
      res.status(200).json({ err: "you are not admin of this group" });
    }
  } catch (err) {
    console.log(err);
    res.status(401).json({ err: "user not deleted" });
  }
};

exports.deleteGroup = async (req, res, next) => {

// to handle multi admin case i make this direct destroy


  try {
    const groupId = req.params.groupId;
    console.log("group id in delete group", groupId);
    const checkowner = await Group.findAll({
      where: {
        id: groupId,
      },
    });
    console.log("check owner=====>", checkowner);
    if (checkowner[0]) {
      const deleteGroup = await Group.destroy({
        where: {
          id: groupId,
        },
      });
      if (deleteGroup) {
        return res.status(201).json({ message: "group deleleted" });
      }
    } else {
      res.status(200).json({ err: "you are not owner of this group" });
    }
  } catch (err) {
    console.log(err);
    res.status(401).json({ err: "group not deleted" });
  }
};
