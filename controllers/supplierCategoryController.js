/* eslint-disable */
const axios = require("axios").default;
const factory = require("./HandlerFactory");
const Category = require("./../Models/supplierCategoryModel");
//const User = require('../Models/UserModel');
const AppError = require("../utils/error");
const catchAsync = require("../utils/CatchAsync");
const businessCategory = require("./../Models/businessCategoryModel");
const supplierModel = require("./../Models/supplierModel");

//-------------zz---------------------------------------------------
//----------------------------------------------------------------

exports.getAllCategories = factory.getAll(Category);
exports.getCategory = factory.getOne(Category);
exports.CreateCategory = factory.CreateOne(Category);
exports.updateCategory = factory.UpdateOne(Category);
exports.deleteCategory = factory.deleteOne(Category);
exports.SearchCategories = catchAsync(async (req, res, next) => {
  const all = [];

  const doc = await Category.findAll({
    attributes: ["BusinessCategoryId"],
    limit: 10,
    where: { ...req.query }
  });

  for (const Cat of doc) {
    all.push(
      await businessCategory.findOne({
        where: { id: Cat.dataValues.BusinessCategoryId }
      })
    );
  }
  res.status(200).json({
    status: "success",
    result: all.length,
    data: all
  });
});
