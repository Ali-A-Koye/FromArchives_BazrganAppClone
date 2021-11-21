const Sequelize = require("sequelize");

const sequelize = require("../utils/database");

const Order = sequelize.define("order", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  UserLong: {
    type: Sequelize.DECIMAL(11, 8),
    allowNull: false
  },
  Userlat: {
    type: Sequelize.DECIMAL(10, 8),
    allowNull: false
  },
  AddressToLong: {
    type: Sequelize.DECIMAL(11, 8),
    allowNull: false
  },
  AddressTolat: {
    type: Sequelize.DECIMAL(10, 8),
    allowNull: false
  },
  ordertype: {
    type: Sequelize.ENUM,
    values: ["demand", "instant"]
  },

  addressNotes: {
    type: Sequelize.STRING,
    defaultValue: ""
  },
  status: {
    type: Sequelize.STRING,
    defaultValue: "pending"
  },
  total: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  subtotal: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  supplierId: Sequelize.INTEGER,
  userId: Sequelize.INTEGER
});

module.exports = Order;
