const express = require("express");

const Router = express.Router({
  mergeParams: true
});

const itemController = require("../controllers/SupplierController");
//const authController = require('../controllers/aythController');

Router.route("/look").get(itemController.SearchSupplier);

Router.route("/")
  .get(itemController.getAllSupplier)
  .post(itemController.CreateSupplier);

Router.route("/:id")
  .get(itemController.getSupplier)
  .patch(itemController.updateSupplier)
  .delete(itemController.deleteSupplier);

module.exports = Router;
