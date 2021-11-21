/* eslint-disable */
const { Op } = require("sequelize");
const axios = require("axios").default;
const factory = require("./HandlerFactory");
const salesModel = require("./../Models/salesModel");
const Supplier = require("./../Models/supplierModel");
//const User = require("../Models/UserModel");
const AppError = require("../utils/error");
const catchAsync = require("../utils/CatchAsync");

//----------------------------------------------------------------
//----------------------------------------------------------------

//exports.getAllsales = factory.getAll(salesModel);
exports.getsales = factory.getOne(salesModel);
exports.Createsales = factory.CreateOne(salesModel);
exports.updatesales = factory.UpdateOne(salesModel);
exports.deletesales = factory.deleteOne(salesModel);
exports.Searchsales = factory.Search(salesModel);

exports.getAllsales = catchAsync(async (req, res, next) => {
  const limit = req.query.limit ? +req.query.limit : 10;
  const offset = req.query.page ? req.query.page * limit : 0;

  let all = [];

  if (req.query.limit) delete req.query.limit;
  if (req.query.offset) delete req.query.offset;
  filter = req.query;
  let doc = await salesModel.findAll({
    limit: limit,
    offset: offset,
    where: {
      expDate: {
        [Op.gte]: Date.now()
      }
    },
    attributes: ["id", "name", "expDate", "supplierId"]
  });

  res.status(200).json({
    status: "success",
    result: all.length,
    data: doc
  });
});
