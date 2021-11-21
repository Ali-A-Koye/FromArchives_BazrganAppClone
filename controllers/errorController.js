const AppError = require("./../utils/error");

const handleCastErrorDB = err => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

const handleDuplicatefieldDB = err => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/);
  const message = `Duplicate Field Value : ${value}: please Use another value`;
  return new AppError(message, 400);
};

const HandleValidationError = err => {
  const errors = Object.values(err.errors).map(el => el.message);
  const message = `Inavlid input data ${errors.join(". ")}`;
  return new AppError(message, 400);
};
const handleJWTErrir = () =>
  new AppError("Invalid token , Please Log In Again", 401);

const sendErrorDev = (err, req, res) => {
  // A sAPI
  if (req.originalUrl.startsWith("/api")) {
    res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack
    });
    //B RENDERED WEBSITE ERROR
  } else {
    res.status(err.statusCode).json({
      title: "somethin went wrong",
      msg: err.message
    });
  }
};
const handleJWTexpired = () => new AppError("Your Token has Expired", 401);
const sendErrorProduct = (err, req, res) => {
  if (req.originalUrl.startsWith("/api")) {
    //APIs
    //operational, trusted error , send message to clint
    if (err.isOperational) {
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message
      });
    }
    //programming or other unknown errors;dont leak
    //1)log the console.error();
    //2)send msg
    return res.status(500).json({
      status: "error",
      message: "Something went wrong"
    });
  }
  //operational, trusted error , send message to clint
  if (err.isOperational) {
    res.status(err.statusCode).json({
      title: "somethin went wrong",
      msg: err.message
    });
    //programming or other unknown errors;dont leak
  } else {
    //rendered website
    res.status(err.statusCode).json({
      title: "somethin went wrong",
      msg: err.message
    });
  }
};
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, req, res);
  } else if (process.env.NODE_ENV === "production") {
    let error = { ...err };
    error.message = err.message;
    if (error.name === "CastError") {
      error = handleCastErrorDB(error);
    }
    if (error.code === "1000") {
      error = handleDuplicatefieldDB(error);
    }
    if (error.name === "ValidationError") {
      error = HandleValidationError(error);
    }
    if (error.name === "JsonWebTokenError") error = handleJWTErrir();
    sendErrorProduct(error, req, res);

    if (error.name === "TokenExpiredError") error = handleJWTexpired();
  }
};
