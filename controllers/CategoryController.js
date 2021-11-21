/* eslint-disable */
const axios = require("axios").default;
const factory = require("./HandlerFactory");
const Category = require("./../Models/CategoryModel");
//const User = require("../Models/UserModel");
const AppError = require("../utils/error");
const catchAsync = require("../utils/CatchAsync");

//----------------------------------------------------------------
//----------------------------------------------------------------

exports.getAllCategories = factory.getAll(Category);
exports.getCategory = factory.getOne(Category);
exports.CreateCategory = factory.CreateOne(Category);
exports.updateCategory = factory.UpdateOne(Category);
exports.deleteCategory = factory.deleteOne(Category);
exports.SearchCategories = factory.Search(Category);
