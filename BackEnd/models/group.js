const Sequelize = require("sequelize");

const DB = require("../util/database");

const Group = DB.define("group", {
  id: {
    type: Sequelize.INTEGER.UNSIGNED,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  groupname: {
    type: Sequelize.STRING(128),
    allowNull: false,
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = Group;
