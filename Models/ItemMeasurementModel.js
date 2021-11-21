const Sequelize = require("sequelize");

const sequelize = require("../utils/database");

const itemMeasurements = sequelize.define("item-measurements", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  Calculation: Sequelize.INTEGER,
  itemId: Sequelize.INTEGER,
  measurementId: Sequelize.INTEGER
});

module.exports = itemMeasurements;
