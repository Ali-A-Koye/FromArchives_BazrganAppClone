const express = require("express");

const Router = express.Router({
  mergeParams: true
});

const salesController = require("../controllers/salesController");
//const authController = require('../controllers/aythController');

Router.route("/l").get(salesController.Searchsales);

Router.route("/")
  .get(salesController.getAllsales)
  .post(salesController.Createsales);

Router.route("/:id")
  .get(salesController.getsales)
  .patch(salesController.updatesales)
  .delete(salesController.deletesales);

module.exports = Router;
