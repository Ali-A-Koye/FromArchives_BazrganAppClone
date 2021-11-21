const Sequelize = require("sequelize");
//const User = require(".//..//Models//User");

const sequelize = require("../utils/database");

const Coupon = sequelize.define("Coupon", {
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
  SecretKey: {
    type: Sequelize.STRING,
    defaultValue: "Available"
  },
  supplierId: Sequelize.INTEGER,
  expDate: {
    type: Sequelize.DATE
  }
});

Coupon.beforeCreate(async data => {
  data.SecretKey = Math.floor(Math.random() * 10000000000000 + 1);
});

module.exports = Coupon;
