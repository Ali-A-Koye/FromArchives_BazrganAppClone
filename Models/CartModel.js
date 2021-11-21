const Sequelize = require("sequelize");

const sequelize = require("../utils/database");

const Cart = sequelize.define("cart", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  price: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  total: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  orderId: {
    type: Sequelize.INTEGER
  },
  itemId: {
    type: Sequelize.INTEGER
  },
  supplierId: {
    type: Sequelize.INTEGER
  },
  measurementId: Sequelize.INTEGER
});

module.exports = Cart;
