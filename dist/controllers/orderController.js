"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _orderDb = _interopRequireDefault(require("../db/orderDb"));

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
      var order = {
        id: _orderDb["default"].length + 1,
        userId: 2,
        carId: 1,
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
  }, {
    key: "updateOrder",
    value: function updateOrder(req, res) {
      var id = parseInt(req.params.orderId, 10);
      var amountOffered = req.body.amount_offered;

      var item = _orderDb["default"].filter(function (order) {
        return order.id === id;
      });

      item[0].amount_offered = amountOffered;

      if (item.length === 0) {
        return res.status(404).json({
          status: 404,
          message: 'No vehicle matched the specified criteria'
        });
      }

      if (item[0].status !== 'pending') {
        return res.status(404).json({
          status: 404,
          message: 'No vehicle matched'
        });
      }

      return res.status(200).json({
        status: 200,
        message: 'Order price updated',
        data: item
      });
    }
  }]);

  return orderController;
}();

var _default = orderController;
exports["default"] = _default;