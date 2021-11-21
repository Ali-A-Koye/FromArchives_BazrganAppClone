const express = require("express");

const Router = express.Router({
  mergeParams: true
});

const cartController = require("../controllers/cartController");
//const authController = require('../controllers/aythController');

Router.route("/look").get(cartController.SearchCart);

Router.route("/")
  .get(cartController.getAllCart)
  .post(cartController.CreateCart);

Router.route("/:id")
  .get(cartController.getCart)
  .patch(cartController.updateCart)
  .delete(cartController.deleteCart);

module.exports = Router;
