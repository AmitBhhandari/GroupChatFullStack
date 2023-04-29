const Sequelize = require('sequelize');

require('dotenv').config();

const DB= new Sequelize(process.env.DB_NAME,process.env.USER_NAME,process.env.SQL_PASSWORD,{
  dialect:'mysql',
  host:process.env.DB_HOST
});

module.exports=DB;

