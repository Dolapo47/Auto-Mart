"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _flag = _interopRequireDefault(require("../controllers/flag"));

var _userHelpers = require("../helper/userHelpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.post('/flag', _userHelpers.verifyToken, _flag["default"].createFlag);
var _default = router;
exports["default"] = _default;