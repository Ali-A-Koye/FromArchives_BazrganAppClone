const Sequelize = require("sequelize");
//const User = require(".//..//Models//User");

const sequelize = require("../utils/database");

const userCoupon = sequelize.define("user-Coupon", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  userId: {
    type: Sequelize.STRING
  },
  CouponId: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },

  usedOrder: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
});

/*
Product.beforeCreate(async (user, options) => {
console.log("Hey am before create method");
console.log(user);
console.log('===========================');
console.log(options);
});

Product.afterFind(async (user, options) => {
  for (const data of user ){
    data.dataValues.owner= await User.findOne({attributes:["name","Email"],where: {id:data.dataValues.userId}});
  }
  });*/

module.exports = userCoupon;
