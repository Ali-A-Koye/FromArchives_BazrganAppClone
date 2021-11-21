/* eslint-disable */
const axios = require("axios").default;
const factory = require("./HandlerFactory");
const supplierModel = require("./../Models/supplierModel");
//const User = require('../Models/UserModel');
const AppError = require("../utils/error");
const catchAsync = require("../utils/CatchAsync");

//----------------------------------------------------------------
//----------------------------------------------------------------

exports.getAllSupplier = factory.getAll(supplierModel, []);
exports.getSupplier = factory.getOne(supplierModel);
exports.CreateSupplier = factory.CreateOne(supplierModel);
exports.updateSupplier = factory.UpdateOne(supplierModel);
exports.deleteSupplier = factory.deleteOne(supplierModel);
exports.SearchSupplier = factory.Search(supplierModel);
