"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/* eslint-disable camelcase */

/* eslint-disable require-jsdoc */

/**
 *
 * @exports trimmer
 * @class trimmer
 */
var trimmer =
/*#__PURE__*/
function () {
  function trimmer() {
    _classCallCheck(this, trimmer);
  }

  _createClass(trimmer, null, [{
    key: "signUpTrim",

    /**
     * Handles User input validation on sign up
     *
     * @static
     * @param {Object} req
     * @param {Object} res
     * @returns {(function|Object)} function next() or an error response object
     * @memberof UserValidation
     */
    value: function () {
      var _signUpTrim = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(req, res, next) {
        var _req$body, email, first_name, last_name, address;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _req$body = req.body, email = _req$body.email, first_name = _req$body.first_name, last_name = _req$body.last_name, address = _req$body.address;
                if (first_name) first_name = first_name.trim();
                if (last_name) last_name = last_name.trim();
                if (email) email = email.trim();
                if (address) address = address.trim();
                req.body.first_name = first_name;
                req.body.last_name = last_name;
                req.body.address = address;
                req.body.email = email;
                return _context.abrupt("return", next());

              case 10:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function signUpTrim(_x, _x2, _x3) {
        return _signUpTrim.apply(this, arguments);
      }

      return signUpTrim;
    }()
  }, {
    key: "loginTrim",
    value: function () {
      var _loginTrim = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(req, res, next) {
        var email;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                email = req.body.email;
                if (email) email = email.trim();
                req.body.email = email;
                return _context2.abrupt("return", next());

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function loginTrim(_x4, _x5, _x6) {
        return _loginTrim.apply(this, arguments);
      }

      return loginTrim;
    }()
  }, {
    key: "carTrim",
    value: function () {
      var _carTrim = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(req, res, next) {
        var _req$body2, state, price, manufacturer, model, body_type;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _req$body2 = req.body, state = _req$body2.state, price = _req$body2.price, manufacturer = _req$body2.manufacturer, model = _req$body2.model, body_type = _req$body2.body_type;
                if (state) state = state.trim();
                if (price) price = price.trim();
                if (manufacturer) manufacturer = manufacturer.trim();
                if (model) model = model.trim();
                if (body_type) body_type = body_type.trim();
                req.body.state = state;
                req.body.price = price;
                req.body.manufacturer = manufacturer;
                req.body.model = model;
                req.body.body_type = body_type;
                return _context3.abrupt("return", next());

              case 12:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function carTrim(_x7, _x8, _x9) {
        return _carTrim.apply(this, arguments);
      }

      return carTrim;
    }()
  }, {
    key: "carStatusTrim",
    value: function () {
      var _carStatusTrim = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(req, res, next) {
        var status;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                status = req.body.status;
                if (status) status = status.trim();
                req.body.status = status;
                return _context4.abrupt("return", next());

              case 4:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function carStatusTrim(_x10, _x11, _x12) {
        return _carStatusTrim.apply(this, arguments);
      }

      return carStatusTrim;
    }()
  }, {
    key: "carPriceTrim",
    value: function () {
      var _carPriceTrim = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5(req, res, next) {
        var price;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                price = req.body.price;
                if (price) price = price.trim();
                req.body.price = price;
                return _context5.abrupt("return", next());

              case 4:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      function carPriceTrim(_x13, _x14, _x15) {
        return _carPriceTrim.apply(this, arguments);
      }

      return carPriceTrim;
    }()
  }, {
    key: "orderTrim",
    value: function () {
      var _orderTrim = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee6(req, res, next) {
        var _req$body3, car_id, price_offered;

        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _req$body3 = req.body, car_id = _req$body3.car_id, price_offered = _req$body3.price_offered;
                if (car_id) car_id = car_id.trim();
                if (price_offered) price_offered = price_offered.trim();
                req.body.car_id = car_id;
                req.body.price_offered = price_offered;
                return _context6.abrupt("return", next());

              case 6:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }));

      function orderTrim(_x16, _x17, _x18) {
        return _orderTrim.apply(this, arguments);
      }

      return orderTrim;
    }()
  }, {
    key: "updateOrderTrim",
    value: function () {
      var _updateOrderTrim = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee7(req, res, next) {
        var _req$body4, order_id, new_offer;

        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _req$body4 = req.body, order_id = _req$body4.order_id, new_offer = _req$body4.new_offer;
                if (order_id) order_id = order_id.trim();
                if (new_offer) new_offer = new_offer.trim();
                req.body.order_id = order_id;
                req.body.new_offer = new_offer;
                return _context7.abrupt("return", next());

              case 6:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7);
      }));

      function updateOrderTrim(_x19, _x20, _x21) {
        return _updateOrderTrim.apply(this, arguments);
      }

      return updateOrderTrim;
    }()
  }, {
    key: "flagTrim",
    value: function () {
      var _flagTrim = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee8(req, res, next) {
        var _req$body5, car_id, reason, description;

        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _req$body5 = req.body, car_id = _req$body5.car_id, reason = _req$body5.reason, description = _req$body5.description;
                if (car_id) car_id = car_id.trim();
                if (reason) reason = reason.trim();
                if (description) description = description.trim();
                req.body.car_id = car_id;
                req.body.reason = reason;
                req.body.description = description;
                return _context8.abrupt("return", next());

              case 8:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8);
      }));

      function flagTrim(_x22, _x23, _x24) {
        return _flagTrim.apply(this, arguments);
      }

      return flagTrim;
    }()
  }]);

  return trimmer;
}();

var _default = trimmer;
exports["default"] = _default;