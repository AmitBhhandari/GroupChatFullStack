const Sequelize = require("sequelize");

const DB = require("../util/database");

const Usergroup = DB.define("usergroup", {
  id: {
    type: Sequelize.INTEGER.UNSIGNED,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  is_admin: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  userName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  groupName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Usergroup;