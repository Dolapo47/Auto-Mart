"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.carQueries = void 0;

var _carDb = _interopRequireDefault(require("../db/carDb"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var carQueries = {
  findOneCar: function findOneCar(id) {
    var foundCar = _carDb["default"].find(function (vehicle) {
      return vehicle.id === id;
    });

    return foundCar;
  }
};
exports.carQueries = carQueries;
var _default = carQueries;
exports["default"] = _default;