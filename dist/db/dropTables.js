"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var dropUsers = 'DROP TABLE IF EXISTS users CASCADE; ';
var dropCars = 'DROP TABLE IF EXISTS cars CASCADE; ';
var dropOrders = 'DROP TABLE IF EXISTS orders CASCADE; ';
var dropFlags = 'DROP TABLE IF EXISTS flags CASCADE; ';
var dropQuery = "".concat(dropUsers).concat(dropCars).concat(dropOrders).concat(dropFlags);
var _default = dropQuery;
exports["default"] = _default;