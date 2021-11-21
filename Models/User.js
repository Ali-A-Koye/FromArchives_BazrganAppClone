const Sequelize = require("sequelize");
const validator = require("validator");
const sequelize = require("../utils/database");
const bcrypt = require("bcryptjs");

const Users = sequelize.define("user", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: { type: Sequelize.STRING, allowNull: false },
  Email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: {
        args: true,
        msg: "please provide valid email Address"
      }
    }
  },
  Phone: {
    type: Sequelize.STRING(11),
    allowNull: false,
    unique: true
  },
  role: {
    type: Sequelize.ENUM,
    values: ["user", "admin"],
    defaultValue: "user"
  },
  photo: {
    type: Sequelize.STRING,
    defaultValue: "default.jpg"
  },
  Password: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [4, 9],
        msg: "Password length is not in this range 4-9"
      }
    }
  },
  RefreshToken: Sequelize.STRING,
  verificationCode: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  active: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  LoginCode: {
    type: Sequelize.INTEGER
  }
});

Users.beforeCreate(async user => {
  user.Password = await bcrypt.hash(user.Password, 12);
});

Users.beforeFind(async (user, options) => {
  ///if (!user.where) user.where = {};
  /// user.where.active = true;
});

module.exports = Users;
