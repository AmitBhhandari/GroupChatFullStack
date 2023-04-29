const Sequelize = require("sequelize");

const DB = require("../util/database");

const ForgotPassword = DB.define("forgotpassword", {
  id: {
    type: Sequelize.UUID,
    allowNull: false,
    primaryKey: true,
  },
  isActive: {
    type: Sequelize.BOOLEAN,
  },
});

module.exports = ForgotPassword;
