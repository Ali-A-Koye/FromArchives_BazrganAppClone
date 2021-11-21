const express = require("express");

const Router = express.Router({
  mergeParams: true
});

const CategoryController = require("../controllers/BazrganCategoryController");
//const authController = require('../controllers/aythController');

Router.route("/l").get(CategoryController.SearchCategories);
Router.route("/search/:id").get(CategoryController.BazgranBusiness);

Router.route("/")
  .get(CategoryController.getAllCategories)
  .post(CategoryController.CreateCategory);

Router.route("/:id")
  .get(CategoryController.getCategory)
  .patch(CategoryController.updateCategory)
  .delete(CategoryController.deleteCategory);

module.exports = Router;
