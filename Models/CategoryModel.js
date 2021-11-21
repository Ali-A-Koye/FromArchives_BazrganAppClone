const Sequelize = require("sequelize");
const sequelize = require("../utils/database");

const Category = sequelize.define("Category", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  photo: {
    type: Sequelize.STRING,
    defaultValue: "default.jpg"
  }
});

module.exports = Category;
