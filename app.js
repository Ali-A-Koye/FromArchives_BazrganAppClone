//.............TOP LEVEL CODE................
const path = require("path");
const express = require("express");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const xss = require("xss-clean");
const cookieParser = require("cookie-parser");

const compression = require("compression");
const globalErrorHandler = require("./controllers/errorController");
const AppError = require("./utils/error");

//Start Express App
const app = express();
//
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
//

// ROUTES
const CategoryRoute = require("./Routes/CategoryRoute");
const itemRoute = require("./Routes/itemRoute");
const supplierRoute = require("./Routes/supplierRoute");
const businessCategoryRoute = require("./Routes/BusinessCategoryRoute");
const supplierCategoryRoute = require("./Routes/supplierCategoryRoute");
const orderRoute = require("./Routes/orderRoute");
const cartRoute = require("./Routes/cartRoute");
const measurementRoute = require("./Routes/measurementRoute");
const itemMmeasurementRoute = require("./Routes/itemMeasurementRoute");
const userRouter = require("./Routes/userRoutes");
const couponRouter = require("./Routes/couponRouter");
const UserCoupRouter = require("./Routes/UserCoupRouter");
const bazrganCatRouter = require("./Routes/bazrganCatRouter");
const salesRouter = require("./Routes/salesRouter");

app.use(
  express.json({
    limit: "10kb"
  })
);
app.use(cookieParser());
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

//

app.use(xss());

app.use(compression());
app.use(express.static(`${__dirname}/public`));
app.use(helmet());
const limiter = rateLimit({
  max: 500,
  windowMs: 60 * 60 * 1000,
  message: "too Many requests from this IP , please try again in one hours"
});
app.use("/api", limiter);

//
//
//
//

// ROUTES
app.use("/api/category", CategoryRoute);
app.use("/api/businesscategory", businessCategoryRoute);
app.use("/api/item", itemRoute);
app.use("/api/supplier", supplierRoute);
app.use("/api/supcat", supplierCategoryRoute);
app.use("/api/orders", orderRoute);
app.use("/api/cart", cartRoute);
app.use("/api/measurement", measurementRoute);
app.use("/api/itemMeasurement", itemMmeasurementRoute);
app.use("/api/users", userRouter);
app.use("/api/coupon", couponRouter);
app.use("/api/UserCoup", UserCoupRouter);
app.use("/api/bazrganCat", bazrganCatRouter);
app.use("/api/sales", salesRouter);

//
//
//
//

app.all("*", (req, res, next) => {
  next(new AppError(`Cant find ${req.originalUrl} on the APP`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
