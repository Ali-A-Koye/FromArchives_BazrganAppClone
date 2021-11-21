const Sequelize = require("sequelize");

const sequelize = require("../utils/database");

const item = sequelize.define("item", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  price: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  description: {
    type: Sequelize.STRING,
    defaultValue: ""
  },
  photo: {
    type: Sequelize.STRING,
    defaultValue: "default.jpg"
  },
  subCategory: {
    type: Sequelize.STRING,
    defaultValue: ""
  },
  totalAmountAvailable: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  itemOrderType: {
    type: Sequelize.STRING,
    defaultValue: "demand"
  },
  CategoryId: Sequelize.INTEGER,
  supplierId: Sequelize.INTEGER,
  BusinessCategoryId: Sequelize.INTEGER
});

module.exports = item;
