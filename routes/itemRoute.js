const express = require("express");

const Router = express.Router({
  mergeParams: true
});

const itemController = require("../controllers/itemController");
//const authController = require('../controllers/aythController');

Router.route("/look").get(itemController.SearchItem);

Router.route("/")
  .get(itemController.getAllitems)
  .post(itemController.Createitem);

Router.route("/:id")
  .get(itemController.getitem)
  .patch(itemController.updateitem)
  .delete(itemController.deleteitem);

module.exports = Router;
