const express = require("express");

const Router = express.Router({
  mergeParams: true
});

const CategoryController = require("../controllers/supplierCategoryController");
//const authController = require('../controllers/aythController');

Router.route("/look").get(CategoryController.SearchCategories);

Router.route("/")
  .get(CategoryController.getAllCategories)
  .post(CategoryController.CreateCategory);

Router.route("/:id")
  .get(CategoryController.getCategory)
  .patch(CategoryController.updateCategory)
  .delete(CategoryController.deleteCategory);

module.exports = Router;
