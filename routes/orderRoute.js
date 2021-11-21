const express = require("express");

const Router = express.Router({
  mergeParams: true
});

const itemController = require("../controllers/orderController");
//const authController = require('../controllers/aythController');

Router.route("/look").get(itemController.Searchorder);

Router.route("/")
  .get(itemController.getAllorders)
  .post(itemController.Createorder);

Router.route("/:id")
  .get(itemController.getorder)
  .patch(itemController.updateorder)
  .delete(itemController.deleteorder);

module.exports = Router;
