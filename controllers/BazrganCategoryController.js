/* eslint-disable */
const axios = require("axios").default;
const factory = require("./HandlerFactory");
const BazrganCategory = require("./../Models/supplierBazrganCategoryModel");
const Supplier = require("./../Models/supplierModel");
const Categories = require("./../Models/CategoryModel");

//const User = require('../Models/UserModel');
const AppError = require("../utils/error");
const catchAsync = require("../utils/CatchAsync");

//----------------------------------------------------------------
//----------------------------------------------------------------

exports.getAllCategories = factory.getAll(BazrganCategory);
exports.getCategory = factory.getOne(BazrganCategory);
exports.CreateCategory = factory.CreateOne(BazrganCategory);
exports.updateCategory = factory.UpdateOne(BazrganCategory);
exports.deleteCategory = factory.deleteOne(BazrganCategory);
exports.SearchCategories = factory.Search(BazrganCategory);

exports.BazgranBusiness = catchAsync(async (req, res, next) => {
  const limit = req.query.limit ? +req.query.limit : 10;
  const offset = req.query.page ? req.query.page * limit : 0;

  if (req.query.limit) delete req.query.limit;
  if (req.query.offset) delete req.query.offset;
  filter = req.query;

  const BazgranBusiness = await Categories.findOne({
    where: { id: 1 },
    attributes: ["id", "name"],
    include: {
      model: Supplier,
      attributes: ["id", "name", "photo"],
      through: {
        attributes: [
          /* NONE */
        ]
      }
    }
  });

  if (!BazgranBusiness) {
    return next(new AppError("Cannot find Any Category", 404));
  }
  if (BazgranBusiness.suppliers.length == 0) {
    return next(
      new AppError("Cannot find Any Business for that Category", 404)
    );
  }

  res.status(200).json({
    status: "success",
    result: BazgranBusiness.length,
    data: BazgranBusiness
  });
});
