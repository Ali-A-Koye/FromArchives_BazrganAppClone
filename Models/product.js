const Sequelize = require('sequelize');
const User = require(".//..//Models//User");

const sequelize = require("../utils/database");

const Product = sequelize.define('product', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  title: Sequelize.STRING,
  address: Sequelize.STRING,
  school: Sequelize.STRING,
  price: {
    type: Sequelize.DOUBLE,
    allowNull: false
  },
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: false
  },
  productOwner:Sequelize.INTEGER,
  
});

/*
Product.beforeCreate(async (user, options) => {
console.log("Hey am before create method");
console.log(user);
console.log('===========================');
console.log(options);
});*/

Product.afterFind(async (user, options) => {
  for (const data of user ){
    data.dataValues.owner= await User.findOne({attributes:["name","Email"],where: {id:data.dataValues.userId}});
  }
  });

module.exports = Product;
