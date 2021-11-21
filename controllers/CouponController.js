/* eslint-disable */
const axios = require("axios").default;
const factory = require("./HandlerFactory");
const Coupon = require("./../Models/CouponModel");
const User = require("./../Models/User");

const UserCoupon = require("./../Models/UserCouponModel");

//const User = require("../Models/UserModel");
const AppError = require("../utils/error");
const catchAsync = require("../utils/CatchAsync");

//----------------------------------------------------------------
//----------------------------------------------------------------

exports.getAllCoupon = factory.getAll(Coupon);
exports.getCoupon = factory.getOne(Coupon);
exports.CreateCoupon = factory.CreateOne(Coupon);
exports.updateCoupon = factory.UpdateOne(Coupon);
exports.deleteCoupon = factory.deleteOne(Coupon);
exports.SearchCoupon = factory.Search(Coupon);
exports.redeemCoupon = catchAsync(async (req, res, next) => {
  const coupon = await Coupon.findOne({ where: { SecretKey: req.params.key } });
  if (!coupon) {
    return next(
      new AppError("invalid coupon, please Make sure of the secret key", 404)
    );
  }
  if (coupon.status !== "Available") {
    return next(
      new AppError("You cannot Redeem it , Coupon is already Redeemed", 404)
    );
  }

  let user = 1;
  if (req.body.userId) user = req.body.userId;
  await UserCoupon.create({
    userId: user,
    CouponId: coupon.id
  });
  coupon.status = "redeemed";
  await coupon.save();

  res.status(200).json({
    status: "success",
    data: "Coupon is successfully Redeemed for the user",
    percentage: coupon.percentage
  });
});

exports.AvailableCoupons = catchAsync(async (req, res, next) => {
  let user = 1;
  if (req.body.userId) user = req.body.userId;
  const coupon = await User.findOne({
    where: { id: user },
    attributes: ["id", "name"],
    include: {
      model: Coupon,
      attributes: ["id", "name", "percentage"],
      through: {
        where: {
          usedOrder: false
        },
        attributes: [
          /* NONE */
        ]
      }
    }
  });

  if (!coupon) {
    return next(new AppError("No User is Found", 404));
  }
  if (coupon.Coupons.length == 0) {
    return next(new AppError("No Coupons Available to Use", 404));
  }

  res.status(200).json({
    status: "success",
    data: coupon
  });
});
