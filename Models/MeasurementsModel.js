const Sequelize = require("sequelize");

const sequelize = require("../utils/database");

const Measurements = sequelize.define("measurements", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  Measurement: Sequelize.STRING
});

module.exports = Measurements;
