"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _orderController = _interopRequireDefault(require("../controllers/orderController"));

var _userHelpers = require("../helper/userHelpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.post('/order', _userHelpers.verifyToken, _orderController["default"].createOrder);
router.patch('/order/:orderId/price', _orderController["default"].updateOrder);
var _default = router;
exports["default"] = _default;