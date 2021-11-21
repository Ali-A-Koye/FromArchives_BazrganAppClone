const Sequelize = require("sequelize");

const sequelize = require("../utils/database");

const SupBCat = sequelize.define("supply-Baz-Category", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  supplierId: Sequelize.INTEGER,
  CategoryId: Sequelize.INTEGER
});

module.exports = SupBCat;
