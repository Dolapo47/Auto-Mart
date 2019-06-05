"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _bcrypt = _interopRequireDefault(require("bcrypt"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var users = [{
  id: 1,
  email: 'Dolapo@andela.com',
  first_name: 'dolapo',
  last_name: 'adeleye',
  password: _bcrypt["default"].hash('dolapo', 8),
  address: '12 epic tower road lagos',
  isAdmin: true
}, {
  id: 2,
  email: 'ayo@andela.com',
  first_name: 'ayo',
  last_name: 'adeleye',
  password: _bcrypt["default"].hash('ayomide2018@@', 10),
  address: '12 epic tower road lagos',
  isAdmin: true
}];
var _default = users;
exports["default"] = _default;