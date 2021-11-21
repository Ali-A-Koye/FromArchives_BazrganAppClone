const axios = require("axios").default;
const factory = require("./HandlerFactory");
const orderModel = require("./../Models/OrderModel");
const cartModel = require("./../Models/CartModel");
const UserCoupon = require("./../Models/UserCouponModel");
const CouponModel = require("./../Models/CouponModel");

//const User = require('../Models/UserModel');
const AppError = require("../utils/error");
const catchAsync = require("../utils/CatchAsync");

//----------------------------------------------------------------
//----------------------------------------------------------------

exports.getAllorders = factory.getAll(orderModel, ["supplierId"]);
exports.getorder = factory.getOne(orderModel);
//exports.Createorder = factory.CreateOne(orderModel);
exports.updateorder = factory.UpdateOne(orderModel);
exports.deleteorder = factory.deleteOne(orderModel);
exports.Searchorder = factory.Search(orderModel);

async function validateCoupon(body) {
  const CouponId = [];
  for (const business of body) {
    if (business.Coupon) {
      const CouponFind = await CouponModel.findOne({
        where: { id: business.Coupon }
      });

      if (!CouponFind) return false;
      if (CouponFind.dataValues.supplierId != business.supplierId) return false;

      let final = await UserCoupon.findOne({
        where: { CouponId: business.Coupon }
      });
      if (!final || final.dataValues.usedOrder == 1) return false;
      CouponId.push(business.Coupon);
    }
  }
  return CouponId;
}
exports.Createorder = catchAsync(async (req, res, next) => {
  //ERROR HANDLERS
  let ifError;
  let orderIds = [];
  let cartIds = [];
  //ADDING PROCCESS
  let carts;
  let Validate = await validateCoupon(req.body);
  if (!Validate)
    ifError = new AppError(
      "One of the Copouns are Not Valid or Used For Wrong Business",
      400
    );
  for (const business of req.body) {
    if (!ifError) {
      let carts = business.cart;
      let Order;
      await orderModel
        .create(business)
        .then(res => {
          Order = res;
          orderIds.push(res.id);
        })
        .catch(err => {
          ifError = err;
        });

      for (const item of carts) {
        if (!ifError) {
          item.orderId = Order.dataValues.id;
          const cart = await cartModel
            .create(item)
            .then(res => {
              cartIds.push(res.id);
            })
            .catch(err => {
              ifError = err;
            });
        }
      }
    }
  }
  if (ifError) {
    //DELETING EVERYTHING IN CASE OF ERROR
    await cartModel.destroy({ where: { id: cartIds } });

    await orderModel.destroy({ where: { id: orderIds } });
    res.status(400).json({
      status: "fail",
      data: `${ifError}`
    });
  } else {
    //CASE OF SUCCESS
    //req.user.id
    if (Validate) {
      for (codes of Validate) {
        let data = await UserCoupon.findOne({
          where: { CouponId: codes, userId: 1 }
        });
        data.usedOrder = 1;
        data.save();
      }
    }
    res.status(201).json({
      status: "success",
      data: "Order Created"
    });
  }
});
