const Sequelize = require("sequelize");

const sequelize = require("../utils/database");

const Supplier = sequelize.define("supplier", {
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
  workingHoursStart: {
    type: Sequelize.TIME
  },
  workingHoursEnd: {
    type: Sequelize.TIME
  },
  WorkingDays: {
    type: Sequelize.STRING,
    defaultValue: ""
  },
  photo: {
    type: Sequelize.STRING,
    defaultValue: "default.jpg"
  },
  description: {
    type: Sequelize.STRING,
    defaultValue: ""
  },
  Phone: {
    type: Sequelize.STRING,
    defaultValue: ""
  },
  longitude: {
    type: Sequelize.DECIMAL(11, 8),
    allowNull: false
  },
  latitudes: { type: Sequelize.DECIMAL(10, 8), allowNull: false },
  AddressInText: {
    type: Sequelize.STRING,
    defaultValue: ""
  }
});

Supplier.afterFind(async (string, options) => {
  if (typeof string.dataValues === "object") {
    let time = new Date();
    let workingHours = `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`;
    if (
      string.dataValues.workingHoursStart < workingHours &&
      workingHours < string.dataValues.workingHoursEnd
    )
      string.dataValues.isOpen = true;
    else string.dataValues.isOpen = false;
  }
});
module.exports = Supplier;
