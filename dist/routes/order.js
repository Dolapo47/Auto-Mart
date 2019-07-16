"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _orderController = _interopRequireDefault(require("../controllers/orderController"));

var _userHelpers = require("../helper/userHelpers");

var _trimmer = _interopRequireDefault(require("../helper/trimmer/trimmer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var orderTrim = _trimmer["default"].orderTrim,
    updateOrderTrim = _trimmer["default"].updateOrderTrim;

var router = _express["default"].Router();

router.post('/order', _userHelpers.verifyToken, orderTrim, _orderController["default"].createOrder);
router.patch('/order/:order_id/price', _userHelpers.verifyToken, updateOrderTrim, _orderController["default"].updateOrder);
var _default = router;
exports["default"] = _default;