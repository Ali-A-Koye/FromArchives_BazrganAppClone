const Sequelize = require("sequelize");

const sequelize = require("../utils/database");

const address = sequelize.define("user-address", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  userId: Sequelize.INTEGER,
  AddressLong: {
    type: Sequelize.DECIMAL(11, 8),
    allowNull: false
  },
  AddressLat: {
    type: Sequelize.DECIMAL(10, 8),
    allowNull: false
  },
  status: {
    type: Sequelize.STRING,
    defaultValue: "Available"
  }
});

module.exports = address;
