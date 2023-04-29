const Sequelize = require("sequelize");

const DB = require("../util/database");

const Message = DB.define("message", {
  msgid: {
    type: Sequelize.INTEGER.UNSIGNED,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  Username: {
    type: Sequelize.STRING(128),
    allowNull: false,
  },
  message: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
});

module.exports = Message;