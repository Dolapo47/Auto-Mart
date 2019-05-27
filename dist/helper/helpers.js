"use strict";

var _joi = _interopRequireDefault(require("joi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

exports.validateRegisterUserSchema = {
  email: _joi["default"].string().email().max(35).required(),
  first_name: _joi["default"].string().max(15).regex(/^[a-zA-Z]+$/).required(),
  last_name: _joi["default"].string().max(15).regex(/^[a-zA-Z]+$/).required(),
  password: _joi["default"].string().min(6).max(15).required(),
  address: _joi["default"].string().max(40).required()
};