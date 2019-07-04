"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateOrderUpdate = exports.validateOrderInput = void 0;

var _validator = _interopRequireDefault(require("validator"));

var _isEmpty = require("../isEmpty");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var validateOrderInput = function validateOrderInput(data) {
  var errors = {};
  data.carId = (0, _isEmpty.isEmpty)(data.carId) === true ? '' : data.carId;
  data.amount = (0, _isEmpty.isEmpty)(data.amount) === true ? '' : data.amount;
  data.amountOffered = (0, _isEmpty.isEmpty)(data.amountOffered) === true ? '' : data.amountOffered;
  if (_validator["default"].isEmpty(data.carId)) errors.carId = 'carId field is required';
  if (_validator["default"].isEmpty(data.amount)) errors.amount = 'amount field is required';
  if (_validator["default"].isEmpty(data.amountOffered)) errors.amountOffered = 'amount offered field is required';
  if (!(0, _isEmpty.isInteger)(data.carId)) errors.carId = 'only interger numbers allowed';
  if ((0, _isEmpty.isFloat)(data.amount)) errors.amount = 'only decimal numbers allowed (12.00)';
  if ((0, _isEmpty.isFloat)(data.amountOffered)) errors.amountOffered = 'only decimal numbers allowed (12.00)';
  return {
    errors: errors,
    isValid: (0, _isEmpty.isEmpty)(errors)
  };
};

exports.validateOrderInput = validateOrderInput;

var validateOrderUpdate = function validateOrderUpdate(data) {
  var errors = {};
  data.userId = (0, _isEmpty.isEmpty)(data.userId) === true ? '' : data.userId;
  data.amountOffered = (0, _isEmpty.isEmpty)(data.amountOffered) === true ? '' : data.amountOffered;
  if (_validator["default"].isEmpty(data.userId)) errors.userId = 'userId field is required';
  if (_validator["default"].isEmpty(data.amountOffered)) errors.amountOffered = 'amountOffered field is required';
  if ((0, _isEmpty.isFloat)(data.amountOffered)) errors.amountOffered = 'only decimal numbers allowed (12.00)';
  if (!(0, _isEmpty.isInteger)(data.userId)) errors.userId = 'only interger numbers allowed';
  return {
    errors: errors,
    isValid: (0, _isEmpty.isEmpty)(errors)
  };
};

exports.validateOrderUpdate = validateOrderUpdate;