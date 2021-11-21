const User = require("./Models/User");
const categories = require("./Models/CategoryModel");
const items = require("./models/ItemsModel");
const Supplier = require("./models/supplierModel");
const SupplierCategory = require("./models/supplierCategoryModel");
const businessCategory = require("./models/businessCategoryModel");
const OrderModel = require("./models/OrderModel");
const CartModel = require("./models/CartModel.js");

const ItemMeasurement = require("./models/ItemMeasurementModel");
const Measurement = require("./models/MeasurementsModel");

const CouponModel = require("./models/CouponModel");
const UserCouponModel = require("./models/UserCouponModel");
const couponModel = require("./models/CouponModel");
const BazrganCategoryModel = require("./models/supplierBazrganCategoryModel");
const userAddressesModel = require("./models/userAddressModel");
const Sales = require("./models/salesModel");

function relations() {
  items.belongsTo(categories);
  categories.hasMany(items);

  OrderModel.belongsTo(User);
  User.hasMany(OrderModel);

  userAddressesModel.belongsTo(User);
  User.hasMany(userAddressesModel);

  couponModel.belongsTo(Supplier);
  Supplier.hasMany(couponModel);

  Sales.belongsTo(Supplier);
  Supplier.hasMany(Sales);

  items.belongsTo(Supplier);
  Supplier.hasMany(items);

  items.belongsTo(businessCategory);
  businessCategory.hasMany(items);

  //
  // User //

  //
  Supplier.belongsToMany(businessCategory, { through: SupplierCategory });
  businessCategory.belongsToMany(Supplier, { through: SupplierCategory });

  //WORKING
  User.belongsToMany(CouponModel, { through: UserCouponModel });
  CouponModel.belongsToMany(User, { through: UserCouponModel });

  //WORKING
  Supplier.belongsToMany(categories, { through: BazrganCategoryModel });
  categories.belongsToMany(Supplier, { through: BazrganCategoryModel });

  Measurement.belongsToMany(items, { through: ItemMeasurement });
  items.belongsToMany(Measurement, { through: ItemMeasurement });

  OrderModel.belongsToMany(items, { through: CartModel });
  items.belongsToMany(OrderModel, { through: CartModel });

  OrderModel.belongsTo(Supplier);
  Supplier.hasMany(OrderModel);

  CartModel.belongsTo(Supplier);
  Supplier.hasMany(CartModel);

  CartModel.belongsTo(Measurement);
  Measurement.hasMany(CartModel);
}

module.exports = relations;
