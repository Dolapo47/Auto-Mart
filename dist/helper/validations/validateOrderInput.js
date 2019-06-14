"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _validator = _interopRequireDefault(require("validator"));

var _isEmpty = _interopRequireDefault(require("../isEmpty"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var validateOrderInput = function validateOrderInput(data) {
  var errors = {};
  data.amount_offered = (0, _isEmpty["default"])(data.amount_offered) === true ? '' : data.amount_offered;
  data.userId = (0, _isEmpty["default"])(data.userId) === true ? '' : data.userId;
  data.carId = (0, _isEmpty["default"])(data.carId) === true ? '' : data.carId;

  if (!_validator["default"].isFloat(data.amount_offered)) {
    errors.amount_offered = 'Number must be in 0.00 format';
  }

  if (_validator["default"].isEmpty(data.amount_offered) || !_validator["default"].isLength(data.amount_offered, {
    min: 1,
    max: 13
  })) {
    errors.amount_offered = 'Last name must be between 1 and 13 characters';
  }

  if (!_validator["default"].isNumeric(data.userId)) {
    errors.userId = 'User id should be a number';
  }

  if (_validator["default"].isEmpty(data.userId) || !_validator["default"].isLength(data.userId, {
    min: 1,
    max: 3
  })) {
    errors.userId = 'Last name must be between 1 and 3 characters';
  }

  if (!_validator["default"].isNumeric(data.carId)) {
    errors.carId = 'Car id should be a number';
  }

  if (_validator["default"].isEmpty(data.carId) || !_validator["default"].isLength(data.carId, {
    min: 1,
    max: 3
  })) {
    errors.carId = 'Last name must be between 1 and 3 characters';
  }

  return {
    errors: errors,
    isValid: (0, _isEmpty["default"])(errors)
  };
};

var _default = validateOrderInput;
exports["default"] = _default;