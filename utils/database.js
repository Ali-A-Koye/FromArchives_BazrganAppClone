const Sequelize = require("sequelize");

//Database Name , Database UserName , Database Password
const sequelize = new Sequelize("bazrgan", "root", "1234554123", {
  dialect: "mysql",
  logging: false
});

module.exports = sequelize;
