"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _orderDb = _interopRequireDefault(require("../db/orderDb"));

var _validateOrderInput2 = require("../helper/validations/validateOrderInput");

var _responseMessages = require("../helper/validations/responseMessages");

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
      var _validateOrderInput = (0, _validateOrderInput2.validateOrderInput)(req.body),
          errors = _validateOrderInput.errors,
          isValid = _validateOrderInput.isValid;

      if (!isValid) return (0, _responseMessages.responseMessage)(res, 422, errors);
      var userId = parseInt(req.body.userId, 10);
      var carId = parseInt(req.body.carId, 10);

      var checkOrder = _orderDb["default"].filter(function (order) {
        return order.userId === userId && order.carId === carId;
      });

      if (checkOrder.length > 0) {
        return (0, _responseMessages.responseMessage)(res, 409, 'The order already exist');
      }

      var order = {
        id: _orderDb["default"].length + 1,
        userId: userId,
        carId: carId,
        status: 'pending',
        amount: 1200000,
        amount_offered: req.body.amountOffered
      };

      _orderDb["default"].push(order);

      return (0, _responseMessages.retrieveCarMessage)(res, 201, 'order successfully created', order);
    }
  }, {
    key: "updateOrder",
    value: function updateOrder(req, res) {
      var _validateOrderUpdate = (0, _validateOrderInput2.validateOrderUpdate)(req.body),
          errors = _validateOrderUpdate.errors,
          isValid = _validateOrderUpdate.isValid;

      if (!isValid) return (0, _responseMessages.responseMessage)(res, 422, errors);
      var id = parseInt(req.params.orderId, 10);
      var userId = parseInt(req.body.userId, 10);
      var newAmount = req.body.amountOffered;

      var checkOrder = _orderDb["default"].filter(function (order) {
        return order.userId === userId && order.id === id;
      });

      if (checkOrder < 1) {
        return (0, _responseMessages.responseMessage)(res, 409, 'The order does not exist');
      }

      if (checkOrder[0].status === 'pending') {
        checkOrder[0].amountOffered = newAmount;
        return (0, _responseMessages.retrieveCarMessage)(res, 200, 'order successfully updated', checkOrder[0]);
      }

      return (0, _responseMessages.responseMessage)(res, 400, 'The order has been approved');
    }
  }]);

  return orderController;
}();

var _default = orderController;
exports["default"] = _default;