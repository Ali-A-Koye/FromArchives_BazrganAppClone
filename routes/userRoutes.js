const express = require("express");
const ExpressBrute = require("express-brute");
const AppError = require("./../utils/error");

//SETTING UP Express Brute
const failCallback = function(req, res, next, nextValidRequestDate) {
  return next(new AppError("to Much Log In,Please Try Again Later!", 404));
};
const store = new ExpressBrute.MemoryStore(); // stores state locally, don't use this in production
const bruteforce = new ExpressBrute(store, {
  freeRetries: 5,
  minWait: 5 * 60 * 1000,
  maxWait: 60 * 60 * 1000,
  failCallback: failCallback
});

//
//
const Router = express.Router();
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

//Logging in and signing Up
Router.post("/signup", authController.signup);
Router.post("/verify", authController.verifySMS);
Router.post("/:id/sendSMSagain", authController.SendAgainSMS);

Router.post("/token", authController.validateTokenAgain);

Router.post("/login", bruteforce.prevent, authController.login);
Router.post("/verify/login", authController.loginSMS);

Router.get("/logout", authController.logout);

//YOU SHOUDL BE LOGGED IN

Router.route("/address")
  .get(userController.AllAddress)
  .post(userController.AddAddress);
Router.route("/address/:id").delete(userController.DeleteAddress);

Router.get("/me", authController.protect, userController.getMe);
Router.use(authController.protect);
//
//..................change Email and pass and name...............
//
//change Password for logged in user
//Router.patch("/updateMyPassword", authController.updatePassword);
//Update email or name ( but not password) for logged in users
Router.patch(
  "/updateMe",
  userController.uploadUserPhoto,
  userController.resizeuserPhoto,
  userController.updateMe
);

//
//.........................................................................
//delete current User for logged in users
Router.delete("/deleteMe", userController.deleteMe);

Router.use(authController.restrictTo("admin"));
Router.route("/")
  .get(userController.getAllUsers)
  .post(userController.createUser);
Router.route("/:id")
  .get(userController.getUser)
  .patch(userController.UpdateUser)
  .delete(userController.deleteUser);

module.exports = Router;
