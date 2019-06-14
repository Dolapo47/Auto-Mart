"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _orderDb = _interopRequireDefault(require("../db/orderDb"));

var _validateOrderInput2 = _interopRequireDefault(require("../helper/validations/validateOrderInput"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var orderController =
/*#__PURE__*/
function () {
  function orderController() {
    _classCallCheck(this, orderController);
  }

  _createClass(orderController, null, [{
    key: "createOrder",
    value: function createOrder(req, res) {
      var _validateOrderInput = (0, _validateOrderInput2["default"])(req.body),
          errors = _validateOrderInput.errors,
          isValid = _validateOrderInput.isValid;

      if (!isValid) {
        return res.status(400).json({
          errors: errors
        });
      }

      var userId = parseInt(req.body.userId, 10);
      var carId = parseInt(req.body.carId, 10);

      var checkOrder = _orderDb["default"].filter(function (order) {
        return order.userId === userId && order.carId === carId;
      });

      if (checkOrder.length > 0) {
        res.status(409).json({
          status: 409,
          message: 'The order already exist'
        });
      } else {
        var order = {
          id: _orderDb["default"].length + 1,
          userId: userId,
          carId: carId,
          status: 'pending',
          amount: 1200000,
          amount_offered: req.body.amount_offered
        };

        _orderDb["default"].push(order);

        return res.status(201).json({
          status: 201,
          message: 'order successfully created',
          data: order
        });
      }
    }
  }]);

  return orderController;
}();

var _default = orderController;
exports["default"] = _default;