const Sequelize = require('sequelize');
//const User = require(".//..//Models//User");

const sequelize = require("../utils/database");

const BusinessCategory = sequelize.define('BusinessCategory', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: {  
  type:Sequelize.STRING
, allowNull:false,
   unique: true,
},
photo:{
  type:Sequelize.STRING,
  defaultValue:"default.jpg"
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

module.exports = BusinessCategory;
