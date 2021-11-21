/* eslint-disable */
const axios = require("axios").default;
const factory = require("./HandlerFactory");
const MeasurementsModel = require("./../Models/MeasurementsModel");
//const User = require("../Models/UserModel");
const AppError = require("../utils/error");
const catchAsync = require("../utils/CatchAsync");

//----------------------------------------------------------------
//----------------------------------------------------------------

exports.getAllMeasurement = factory.getAll(MeasurementsModel);
exports.getMeasurement = factory.getOne(MeasurementsModel);
exports.CreateMeasurement = factory.CreateOne(MeasurementsModel);
exports.updateMeasurement = factory.UpdateOne(MeasurementsModel);
exports.deleteMeasurement = factory.deleteOne(MeasurementsModel);
exports.SearchMeasurement = factory.Search(MeasurementsModel);
