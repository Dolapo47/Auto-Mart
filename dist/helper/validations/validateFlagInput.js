"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _validator = _interopRequireDefault(require("validator"));

var _isEmpty = require("../isEmpty");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var validateFlagInput = function validateFlagInput(data) {
  var errors = {};
  data.carId = (0, _isEmpty.isEmpty)(data.carId) === true ? '' : data.carId;
  data.reason = (0, _isEmpty.isEmpty)(data.reason) === true ? '' : data.reason;
  data.description = (0, _isEmpty.isEmpty)(data.description) === true ? '' : data.description;
  if (_validator["default"].isEmpty(data.carId)) errors.carId = 'carId field is required';
  if (_validator["default"].isEmpty(data.reason)) errors.reason = 'reason field is required';
  if (_validator["default"].isEmpty(data.description)) errors.description = 'description field is required';

  if (!(0, _isEmpty.isInteger)(data.carId)) {
    errors.carId = 'only interger numbers allowed';
  }

  return {
    errors: errors,
    isValid: (0, _isEmpty.isEmpty)(errors)
  };
};

var _default = validateFlagInput;
exports["default"] = _default;