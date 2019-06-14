"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _validator = _interopRequireDefault(require("validator"));

var _isEmpty = _interopRequireDefault(require("../isEmpty"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var validateLogin = function validateLogin(data) {
  var errors = {}; // Data.name may be empty but may not be a string
  // we need to ensure that if its empty (using our custom IsEmpty method to check)
  // we make it an empty string which can now be checked by the validator.isEmpty method
  // The reason being that validator.isEmpty can only check for empty string not empty object

  data.email = (0, _isEmpty["default"])(data.email) === true ? '' : data.email;
  data.password = (0, _isEmpty["default"])(data.password) === true ? '' : data.password;

  if (!_validator["default"].isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }

  if (_validator["default"].isEmpty(data.password)) {
    errors.password = 'The Password field is required';
  }

  if (!_validator["default"].isLength(data.password, {
    min: 8,
    max: 182
  })) {
    errors.password = 'Password must be between 8 and 30 characters';
  }

  return {
    errors: errors,
    isValid: (0, _isEmpty["default"])(errors)
  };
};

var _default = validateLogin;
exports["default"] = _default;