/* eslint-disable */
const axios = require("axios").default;
const factory = require("./HandlerFactory");
const MeasurementsModel = require("./../Models/ItemMeasurementModel");
const Measurements = require("./../Models/MeasurementsModel");

//const User = require("../Models/UserModel");
const AppError = require("../utils/error");
const catchAsync = require("../utils/CatchAsync");

//----------------------------------------------------------------
//----------------------------------------------------------------

exports.getAllMeasurement = factory.getAll(MeasurementsModel, []);
exports.getMeasurement = factory.getOne(MeasurementsModel);
exports.CreateMeasurement = factory.CreateOne(MeasurementsModel);
exports.updateMeasurement = factory.UpdateOne(MeasurementsModel);
exports.deleteMeasurement = factory.deleteOne(MeasurementsModel);
//exports.SearchMeasurement = factory.Search(MeasurementsModel);
exports.SearchMeasurement = catchAsync(async (req, res, next) => {
  const limit = req.query.limit ? +req.query.limit : 10;
  const offset = req.query.page ? req.query.page * limit : 0;

  let all = [];

  if (req.query.limit) delete req.query.limit;
  if (req.query.offset) delete req.query.offset;
  filter = req.query;
  let doc = await MeasurementsModel.findAll({
    limit: limit,
    offset: offset,
    where: filter
  });

  for (const Cat of doc) {
    let one = await Measurements.findOne({
      where: { id: Cat.dataValues.measurementId }
    });
    one.dataValues.calc = Cat.dataValues.Calculation;
    all.push(one);
  }

  res.status(200).json({
    status: "success",
    result: all.length,
    data: all
  });
});
