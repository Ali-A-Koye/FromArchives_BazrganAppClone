/* eslint-disable */
const axios = require("axios").default;
const factory = require("./HandlerFactory");
const CartModel = require("./../Models/CartModel");
//const User = require("../Models/UserModel");
const AppError = require("../utils/error");
const catchAsync = require("../utils/CatchAsync");

//----------------------------------------------------------------
//----------------------------------------------------------------

exports.getAllCart = factory.getAll(CartModel);
exports.getCart = factory.getOne(CartModel);
exports.CreateCart = factory.CreateOne(CartModel);
exports.updateCart = factory.UpdateOne(CartModel);
exports.deleteCart = factory.deleteOne(CartModel);
exports.SearchCart = factory.Search(CartModel);
