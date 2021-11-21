const Sequelize = require("sequelize");

const sequelize = require("../utils/database");

const SupplyCat = sequelize.define("SupplyCat", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  supplierId: Sequelize.INTEGER,
  BusinessCategoryId: Sequelize.INTEGER
});

module.exports = SupplyCat;
