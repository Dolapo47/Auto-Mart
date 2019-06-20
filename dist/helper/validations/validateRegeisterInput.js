"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _validator = _interopRequireDefault(require("validator"));

var _isEmpty = require("../isEmpty");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var validateRegisterInput = function validateRegisterInput(data) {
  var errors = {};
  data.email = (0, _isEmpty.isEmpty)(data.email) === true ? '' : data.email;
  data.firstname = (0, _isEmpty.isEmpty)(data.firstname) === true ? '' : data.firstname;
  data.lastname = (0, _isEmpty.isEmpty)(data.lastname) === true ? '' : data.lastname;
  data.password = (0, _isEmpty.isEmpty)(data.password) === true ? '' : data.password;
  data.address = (0, _isEmpty.isEmpty)(data.address) === true ? '' : data.address;
  if (!_validator["default"].isAlpha(data.lastname)) errors.lastname = 'Last name must be only alphabets';
  if (_validator["default"].isEmpty(data.lastname) || !_validator["default"].isLength(data.lastname, {
    min: 2,
    max: 30
  })) errors.lastname = 'Last name must be between 2 and 30 characters';
  if (!_validator["default"].isAlpha(data.firstname)) errors.firstname = 'First name must be only alphabets';
  if (_validator["default"].isEmpty(data.firstname) || !_validator["default"].isLength(data.firstname, {
    min: 2,
    max: 30
  })) errors.firstname = 'First name must be between 2 and 30 characters';
  if (!_validator["default"].isEmail(data.email)) errors.email = 'The Email is invalid';
  if (!_validator["default"].isLength(data.password, {
    min: 8,
    max: 60
  })) errors.password = 'Password must be between 8 and 30 characters';
  if (_validator["default"].isEmpty(data.address)) errors.address = 'The address field is required';
  return {
    errors: errors,
    isValid: (0, _isEmpty.isEmpty)(errors)
  };
};

var _default = validateRegisterInput;
exports["default"] = _default;