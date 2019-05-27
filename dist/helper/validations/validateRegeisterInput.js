"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _validator = _interopRequireDefault(require("validator"));

var _isEmpty = _interopRequireDefault(require("../isEmpty"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var validateRegisterInput = function validateRegisterInput(data) {
  var errors = {}; // Data.name may be empty but may not be a string
  // we need to ensure that if its empty (using our custom IsEmpty method to check)
  // we make it an empty string which can now be checked by the validator.isEmpty method
  // The reason being that validator.isEmpty can only check for empty string not empty object

  data.email = (0, _isEmpty["default"])(data.email) === true ? '' : data.email;
  data.first_name = (0, _isEmpty["default"])(data.first_name) === true ? '' : data.first_name;
  data.last_name = (0, _isEmpty["default"])(data.last_name) === true ? '' : data.last_name;
  data.password = (0, _isEmpty["default"])(data.password) === true ? '' : data.password;
  data.address = (0, _isEmpty["default"])(data.address) === true ? '' : data.address;

  if (!_validator["default"].isAlpha(data.last_name)) {
    errors.last_name = 'Last name must be only alphabets';
  }

  if (_validator["default"].isEmpty(data.last_name) || !_validator["default"].isLength(data.last_name, {
    min: 2,
    max: 30
  })) {
    errors.last_name = 'Last name must be between 2 and 30 characters';
  }

  if (!_validator["default"].isAlpha(data.first_name)) {
    errors.first_name = 'First name must be only alphabets';
  }

  if (_validator["default"].isEmpty(data.first_name) || !_validator["default"].isLength(data.first_name, {
    min: 2,
    max: 30
  })) {
    errors.first_name = 'First name must be between 2 and 30 characters';
  }

  if (!_validator["default"].isEmail(data.email)) {
    errors.email = 'The Email is invalid';
  }

  if (_validator["default"].isEmpty(data.password)) {
    errors.password = 'The Password field is required';
  }

  if (!_validator["default"].isLength(data.password, {
    min: 8,
    max: 60
  })) {
    errors.password = 'Password must be between 8 and 30 characters';
  }

  if (_validator["default"].isEmpty(data.address)) {
    errors.address = 'The address field is required';
  }

  return {
    errors: errors,
    isValid: (0, _isEmpty["default"])(errors)
  };
};

var _default = validateRegisterInput;
exports["default"] = _default;