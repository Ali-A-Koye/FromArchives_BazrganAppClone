const express = require("express");

const Router = express.Router({
  mergeParams: true
});

const CouponController = require("../controllers/CouponController");
const authController = require("../controllers/authController");

Router.route("/l").get(CouponController.SearchCoupon);
Router.route("/redeem/:key").post(CouponController.redeemCoupon);

Router.route("/me").get(CouponController.AvailableCoupons);

Router.route("/")
  .get(CouponController.getAllCoupon)
  .post(CouponController.CreateCoupon);

Router.route("/:id")
  .get(CouponController.getCoupon)
  .patch(CouponController.updateCoupon)
  .delete(CouponController.deleteCoupon);

module.exports = Router;
