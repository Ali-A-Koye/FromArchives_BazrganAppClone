const Sequelize = require("sequelize");
//const User = require(".//..//Models//User");

const sequelize = require("../utils/database");

const Sales = sequelize.define("sales", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING
  },
  percentage: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  status: {
    type: Sequelize.STRING,
    defaultValue: "Available"
  },
  supplierId: Sequelize.INTEGER,
  expDate: {
    type: Sequelize.DATE
  }
});

module.exports = Sales;
