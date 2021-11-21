const express = require("express");

const Router = express.Router({
  mergeParams: true
});

const CategoryController = require("../controllers/CategoryController");
const authController = require("../controllers/authController");

Router.route("/l").get(CategoryController.SearchCategories);

Router.route("/")
  .get(authController.protect, CategoryController.getAllCategories)
  .post(CategoryController.CreateCategory);

Router.route("/:id")
  .get(CategoryController.getCategory)
  .patch(CategoryController.updateCategory)
  .delete(CategoryController.deleteCategory);

module.exports = Router;
