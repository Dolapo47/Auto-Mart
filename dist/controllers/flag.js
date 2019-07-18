"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _index = _interopRequireDefault(require("../db/index"));

var _validateInput = _interopRequireDefault(require("../helper/validations/validateInput"));

var _responseMessages = require("../helper/validations/responseMessages");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var flagController =
/*#__PURE__*/
function () {
  function flagController() {
    _classCallCheck(this, flagController);
  }

  _createClass(flagController, null, [{
    key: "createFlag",
    value: function () {
      var _createFlag = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(req, res) {
        var _req$body, reason, car_id, description, _validate$validateFla, error, createdOn, carExist, flagAd;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _req$body = req.body, reason = _req$body.reason, car_id = _req$body.car_id, description = _req$body.description;
                _validate$validateFla = _validateInput["default"].validateFlagInput(req.body), error = _validate$validateFla.error;

                if (!error) {
                  _context.next = 4;
                  break;
                }

                return _context.abrupt("return", (0, _responseMessages.errorMessage)(res, 422, error.details[0].message));

              case 4:
                createdOn = new Date().toLocaleDateString();
                _context.prev = 5;
                _context.next = 8;
                return _index["default"].query('SELECT * FROM cars WHERE id=$1;', [car_id]);

              case 8:
                carExist = _context.sent;

                if (!(carExist.rowCount <= 0)) {
                  _context.next = 11;
                  break;
                }

                return _context.abrupt("return", (0, _responseMessages.errorMessage)(res, 404, 'Car not found'));

              case 11:
                _context.next = 13;
                return _index["default"].query('INSERT INTO flags(car_id, reason, description, created_on) VALUES($1, $2, $3, $4) RETURNING * ;', [car_id, reason, description, createdOn]);

              case 13:
                flagAd = _context.sent;
                return _context.abrupt("return", (0, _responseMessages.retrieveCarMessage)(res, 201, 'Flag created', flagAd.rows[0]));

              case 17:
                _context.prev = 17;
                _context.t0 = _context["catch"](5);
                return _context.abrupt("return", (0, _responseMessages.errorMessage)(res, 400, 'Unable to flag car'));

              case 20:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[5, 17]]);
      }));

      function createFlag(_x, _x2) {
        return _createFlag.apply(this, arguments);
      }

      return createFlag;
    }()
  }]);

  return flagController;
}();

var _default = flagController;
exports["default"] = _default;