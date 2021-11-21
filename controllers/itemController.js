/* eslint-disable */
const axios = require("axios").default;
const factory = require("./HandlerFactory");
const itemModel = require("./../Models/ItemsModel");
//const User = require('../Models/UserModel');
const AppError = require("../utils/error");
const catchAsync = require("../utils/CatchAsync");

//----------------------------------------------------------------
//----------------------------------------------------------------

exports.getAllitems = factory.getAll(itemModel, [
  "categoryId",
  "supplierId",
  "BusinessCategoryId"
]);
exports.getitem = factory.getOne(itemModel);
exports.Createitem = factory.CreateOne(itemModel);
exports.updateitem = factory.UpdateOne(itemModel);
exports.deleteitem = factory.deleteOne(itemModel);
exports.SearchItem = factory.Search(itemModel);
