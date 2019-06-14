"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _validator = _interopRequireDefault(require("validator"));

var _isEmpty = _interopRequireDefault(require("../isEmpty"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable require-jsdoc */
var validateCarInput = function validateCarInput(data) {
  var errors = {}; // Data.name may be empty but may not be a string
  // we need to ensure that if its empty (using our custom IsEmpty method to check)
  // we make it an empty string which can now be checked by the validator.isEmpty method
  // The reason being that validator.isEmpty can only check for empty string not empty object

  data.state = (0, _isEmpty["default"])(data.state) === true ? '' : data.state;
  data.status = (0, _isEmpty["default"])(data.status) === true ? '' : data.status;
  data.price = (0, _isEmpty["default"])(data.price) === true ? '' : data.price;
  data.manufacturer = (0, _isEmpty["default"])(data.manufacturer) === true ? '' : data.manufacturer;
  data.model = (0, _isEmpty["default"])(data.model) === true ? '' : data.model;
  data.bodyType = (0, _isEmpty["default"])(data.bodyType) === true ? '' : data.bodyType;

  if (!_validator["default"].isAlpha(data.state)) {
    errors.state = 'State must be in alphabet';
  }

  if (_validator["default"].isEmpty(data.state)) {
    errors.state = 'State of vehicle is required';
  }

  if (!_validator["default"].isNumeric(data.price)) {
    errors.price = 'price should be number and in this format (0.00)';
  }

  if (_validator["default"].isEmpty(data.price)) {
    errors.price = 'Price of vehicle is required';
  }

  if (!_validator["default"].isAlpha(data.manufacturer)) {
    errors.manufacturer = 'Manufacturer must be in alphabets';
  }

  if (_validator["default"].isEmpty(data.manufacturer)) {
    errors.manufacturer = 'Manufacturer of vehicle is required';
  }

  if (!_validator["default"].isAlphanumeric(data.model)) {
    errors.model = 'Model of vehicle can only be alphanumeric';
  }

  if (_validator["default"].isEmpty(data.model)) {
    errors.model = 'Model of vehicle is required';
  }

  if (!_validator["default"].isAlpha(data.bodyType)) {
    errors.bodyType = 'Body-type must be alphabets';
  }

  if (_validator["default"].isEmpty(data.bodyType)) {
    errors.bodyType = 'Body-type of vehicle is required';
  }

  return {
    errors: errors,
    isValid: (0, _isEmpty["default"])(errors)
  };
};

var _default = validateCarInput;
exports["default"] = _default;