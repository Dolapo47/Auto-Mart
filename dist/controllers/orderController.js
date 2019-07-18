"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _validateInput = _interopRequireDefault(require("../helper/validations/validateInput"));

var _responseMessages = require("../helper/validations/responseMessages");

var _index = _interopRequireDefault(require("../db/index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

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
    value: function () {
      var _createOrder = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(req, res) {
        var _validate$validateOrd, error, id, _req$body, car_id, price_offered, price, status, carExist, created_On, makeOrder;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _validate$validateOrd = _validateInput["default"].validateOrderInput(req.body), error = _validate$validateOrd.error;

                if (!error) {
                  _context.next = 3;
                  break;
                }

                return _context.abrupt("return", (0, _responseMessages.errorMessage)(res, 422, error.details[0].message));

              case 3:
                id = req.user.id;
                _req$body = req.body, car_id = _req$body.car_id, price_offered = _req$body.price_offered;
                price = Number(price_offered).toFixed(2);
                status = 'pending';
                _context.prev = 7;
                _context.next = 10;
                return _index["default"].query('SELECT id, price FROM cars WHERE id=$1; ', [car_id]);

              case 10:
                carExist = _context.sent;

                if (!(carExist.rowCount <= 0)) {
                  _context.next = 13;
                  break;
                }

                return _context.abrupt("return", (0, _responseMessages.errorMessage)(res, 404, 'Car does not exist'));

              case 13:
                created_On = new Date().toLocaleDateString();
                _context.next = 16;
                return _index["default"].query('INSERT into orders(car_id, buyer_id, created_on ,amount_offered, status) VALUES($1, $2, $3, $4, $5) RETURNING * ;', [car_id, id, created_On, price, status]);

              case 16:
                makeOrder = _context.sent;
                return _context.abrupt("return", (0, _responseMessages.retrieveCarMessage)(res, 201, 'order created', makeOrder.rows[0]));

              case 20:
                _context.prev = 20;
                _context.t0 = _context["catch"](7);
                return _context.abrupt("return", (0, _responseMessages.errorMessage)(res, 400, 'unable to create order'));

              case 23:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[7, 20]]);
      }));

      function createOrder(_x, _x2) {
        return _createOrder.apply(this, arguments);
      }

      return createOrder;
    }()
  }, {
    key: "updateOrder",
    value: function () {
      var _updateOrder = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(req, res) {
        var _validate$validatePat, error, order_id, new_offer, id, regex, checkUserOrder, updateOrderPrice;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _validate$validatePat = _validateInput["default"].validatePatchOrder(req.body), error = _validate$validatePat.error;

                if (!error) {
                  _context2.next = 3;
                  break;
                }

                return _context2.abrupt("return", (0, _responseMessages.errorMessage)(res, 422, error.details[0].message));

              case 3:
                order_id = req.params.order_id;
                new_offer = req.body.new_offer;
                id = req.user.id;
                regex = /^\d+$/;

                if (!(regex.test(order_id) === false)) {
                  _context2.next = 9;
                  break;
                }

                return _context2.abrupt("return", (0, _responseMessages.errorMessage)(res, 422, 'order id should be a number'));

              case 9:
                _context2.prev = 9;
                _context2.next = 12;
                return _index["default"].query('SELECT * FROM orders WHERE buyer_id=$1 AND id=$2;', [id, order_id]);

              case 12:
                checkUserOrder = _context2.sent;

                if (!(checkUserOrder.rowCount <= 0)) {
                  _context2.next = 15;
                  break;
                }

                return _context2.abrupt("return", (0, _responseMessages.errorMessage)(res, 404, 'order not found'));

              case 15:
                _context2.next = 17;
                return _index["default"].query('UPDATE orders SET amount_offered=$1 WHERE id=$2 RETURNING *;', [new_offer, checkUserOrder.rows[0].id]);

              case 17:
                updateOrderPrice = _context2.sent;
                return _context2.abrupt("return", (0, _responseMessages.retrieveCarMessage)(res, 200, 'success', updateOrderPrice.rows[0]));

              case 21:
                _context2.prev = 21;
                _context2.t0 = _context2["catch"](9);
                return _context2.abrupt("return", (0, _responseMessages.errorMessage)(res, 400, 'unable to update order'));

              case 24:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[9, 21]]);
      }));

      function updateOrder(_x3, _x4) {
        return _updateOrder.apply(this, arguments);
      }

      return updateOrder;
    }()
  }]);

  return orderController;
}();

var _default = orderController;
exports["default"] = _default;