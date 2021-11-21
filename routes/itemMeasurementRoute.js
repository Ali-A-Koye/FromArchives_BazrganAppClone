const express = require("express");

const Router = express.Router({
  mergeParams: true
});

const MeasurementController = require("../controllers/itemMeasurementController");
//const authController = require('../controllers/aythController');

Router.route("/search").get(MeasurementController.SearchMeasurement);

Router.route("/")
  .get(MeasurementController.getAllMeasurement)
  .post(MeasurementController.CreateMeasurement);

Router.route("/:id")
  .get(MeasurementController.getMeasurement)
  .patch(MeasurementController.updateMeasurement)
  .delete(MeasurementController.deleteMeasurement);

module.exports = Router;
