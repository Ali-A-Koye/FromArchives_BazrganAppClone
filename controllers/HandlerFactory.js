const catchAsync = require("../utils/CatchAsync");
const AppError = require("../utils/error");
const { Op } = require("sequelize");

exports.deleteOne = Model =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.destroy({ where: { id: req.params.id } });
    if (!doc) {
      return next(new AppError("Couldn't find any item to delete! ", 404));
    }

    res.status(200).json({
      status: "success",
      message: "Data Deleted"
    });
  });

exports.UpdateOne = Model =>
  catchAsync(async (req, res, next) => {
    let item = await Model.findOne({ where: { id: req.params.id } });
    if (!item) {
      return next(new AppError("NO items were found with this Id", 404));
    }
    let doc = await item.update(req.body);

    res.status(200).json({
      status: "success",
      data: doc
    });
  });

exports.CreateOne = Model =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);
    res.status(201).json({
      status: "success",
      data: doc
    });
  });

exports.getOne = (Model, populateOptions) =>
  catchAsync(async (req, res, next) => {
    let doc = await Model.findOne({ where: { id: req.params.id } });
    if (!doc) {
      return next(new AppError("No item Found with that id", 404));
    }
    res.status(200).json({
      status: "success",
      data: doc
    });
  });

exports.getAll = (Model, fields) =>
  catchAsync(async (req, res, next) => {
    const limit = req.query.limit ? +req.query.limit : 10;
    const offset = req.query.page ? req.query.page * limit : 0;

    if (req.query.limit) delete req.query.limit;
    if (req.query.offset) delete req.query.offset;
    filter = {};
    req.query.catid ? (filter.categoryId = req.query.catid) : "";
    let doc = await Model.findAll({
      limit: limit,
      offset: offset,
      where: filter,
      attributes: {
        include: fields
      },
      hooks: false
    });
    res.status(200).json({
      status: "success",
      result: doc.length,
      data: doc
    });
  });

exports.Search = Model =>
  catchAsync(async (req, res, next) => {
    let doc;
    if (req.query.name) {
      let PartialField = req.query.name;
      delete req.query.name;
      doc = await Model.findAll({
        limit: 10,
        where: {
          name: {
            [Op.like]: "%" + PartialField + "%"
          },
          ...req.query
        }
      });
    } else {
      doc = await Model.findAll({
        limit: 10,
        where: {
          ...req.query
        }
      });
    }
    res.status(200).json({
      status: "success",
      result: doc.length,
      data: doc
    });
  });
