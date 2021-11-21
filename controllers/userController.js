const multer = require("multer");
const sharp = require("sharp");
const AppError = require("./../utils/error");
const catchAsync = require("../utils/CatchAsync");
const User = require("../Models/User");
const UserAddress = require("../Models/userAddressModel");

const factory = require("./HandlerFactory");
const axios = require("axios");

const multerStorage = multer.memoryStorage();
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Not an image! Please Upload Only Images", 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter
});

exports.AllAddress = catchAsync(async (req, res, next) => {
  let user = 1;
  if (req.body.userId) user = req.body.userId;
  let Address = await UserAddress.findAll({
    //req.user.id
    where: { userId: user, status: "Available" }
  });

  if (Address.length == 0)
    return next(new AppError("No Address is Found", 404));

  res.status(200).json({
    status: "success",
    data: Address
  });
});

exports.AddAddress = catchAsync(async (req, res, next) => {
  //req.user.id
  if (!req.body.userId) req.body.userId = 1;

  let Address = await UserAddress.create(req.body);

  res.status(200).json({
    status: "success",
    data: "Address Added"
  });
});

exports.DeleteAddress = catchAsync(async (req, res, next) => {
  //req.user.id
  let Address = await UserAddress.findOne({
    where: { userId: 1, id: req.params.id, status: "Available" }
  });

  if (!Address) return next(new AppError("No Address is Found", 404));

  (Address.status = "Deleted"), Address.save();
  res.status(200).json({
    status: "success",
    data: "Address Deleted"
  });
});

exports.getMe = catchAsync(async (req, res, next) => {
  let user = await User.findOne({
    where: { id: req.user.id }
  });

  res.status(200).json({
    status: "success",
    data: user
  });
});
exports.uploadUserPhoto = upload.single("photo");

exports.resizeuserPhoto = (req, res, next) => {
  if (!req.file) return next();
  req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;

  sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`public/img/users/${req.file.filename}`);

  next();
};

const FilterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach(el => {
    if (allowedFields.includes(el)) {
      newObj[el] = obj[el];
    }
  });
  return newObj;
};

exports.createUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "this route is not defined! please use sign up instead"
  });
};
exports.getUser = factory.getOne(User);

exports.updateMe = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: "success",
    data: "Route Not Set YET"
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  // await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: "success",
    data: "Route Not Set YET!"
  });
});

exports.getAllUsers = factory.getAll(User);
//DO NOT UPDATE PASSWORDS WITH THIS
exports.UpdateUser = factory.UpdateOne(User);
exports.deleteUser = factory.deleteOne(User);
