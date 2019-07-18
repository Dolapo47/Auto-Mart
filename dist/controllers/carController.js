"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _index = _interopRequireDefault(require("../db/index"));

var _responseMessages = require("../helper/validations/responseMessages");

var _validateInput = _interopRequireDefault(require("../helper/validations/validateInput"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var carController =
/*#__PURE__*/
function () {
  function carController() {
    _classCallCheck(this, carController);
  }

  _createClass(carController, null, [{
    key: "createCar",
    value: function () {
      var _createCar = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(req, res) {
        var _validate$validateCar, error, _req$user, id, email, _req$body, manufacturer, model, state, price, body_type, image_url, Formatted_price, created_on, status, newCar;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _validate$validateCar = _validateInput["default"].validateCarInput(req.body), error = _validate$validateCar.error;

                if (!error) {
                  _context.next = 3;
                  break;
                }

                return _context.abrupt("return", (0, _responseMessages.errorMessage)(res, 422, error.details[0].message));

              case 3:
                _req$user = req.user, id = _req$user.id, email = _req$user.email;
                _req$body = req.body, manufacturer = _req$body.manufacturer, model = _req$body.model, state = _req$body.state, price = _req$body.price, body_type = _req$body.body_type;
                image_url = 'http://res.cloudinary.com/dolapo/image/upload/v1561711826/f454mfl9t6b45okul8wf.jpg';
                Formatted_price = parseFloat(price).toFixed(2);
                created_on = new Date().toLocaleString();
                status = 'available';
                _context.prev = 9;
                _context.next = 12;
                return _index["default"].query('INSERT INTO cars(owner_id, owner_email, created_on, state, status, price, manufacturer, model, body_type, img_url, flagged) VALUES($1, $2, $3, $4, $5, $6, $7, $8 , $9, $10, $11) RETURNING *;', [id, email, created_on, state, status, Formatted_price, manufacturer, model, body_type, image_url, false]);

              case 12:
                newCar = _context.sent;
                return _context.abrupt("return", (0, _responseMessages.retrieveCarMessage)(res, 201, 'Vehicle created succesfuly', newCar.rows[0]));

              case 16:
                _context.prev = 16;
                _context.t0 = _context["catch"](9);
                return _context.abrupt("return", (0, _responseMessages.errorMessage)(res, 400, 'Unable to create car'));

              case 19:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[9, 16]]);
      }));

      function createCar(_x, _x2) {
        return _createCar.apply(this, arguments);
      }

      return createCar;
    }()
  }, {
    key: "updateStatus",
    value: function () {
      var _updateStatus = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(req, res) {
        var _validate$validateUpd, error, car_id, email, status, regex, findCar, _updateStatus2;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _validate$validateUpd = _validateInput["default"].validateUpdateStatus(req.body), error = _validate$validateUpd.error;

                if (!error) {
                  _context2.next = 3;
                  break;
                }

                return _context2.abrupt("return", (0, _responseMessages.errorMessage)(res, 422, error.details[0].message));

              case 3:
                car_id = req.params.car_id;
                email = req.user.email;
                status = req.body.status;
                regex = /^\d+$/;

                if (!(regex.test(car_id) === false)) {
                  _context2.next = 9;
                  break;
                }

                return _context2.abrupt("return", (0, _responseMessages.errorMessage)(res, 422, 'car id should be a number'));

              case 9:
                _context2.prev = 9;
                _context2.next = 12;
                return _index["default"].query('SELECT * FROM cars WHERE id=$1 AND owner_email=$2;', [car_id, email]);

              case 12:
                findCar = _context2.sent;

                if (!(findCar.rowCount < 1)) {
                  _context2.next = 15;
                  break;
                }

                return _context2.abrupt("return", (0, _responseMessages.errorMessage)(res, 404, 'no car matched the specified criteria'));

              case 15:
                if (!(findCar.rows[0].status === 'sold')) {
                  _context2.next = 17;
                  break;
                }

                return _context2.abrupt("return", (0, _responseMessages.errorMessage)(res, 400, 'Car has been tagged sold'));

              case 17:
                _context2.next = 19;
                return _index["default"].query('UPDATE cars SET status=$1 WHERE id=$2 RETURNING * ;', [status, findCar.rows[0].id]);

              case 19:
                _updateStatus2 = _context2.sent;
                return _context2.abrupt("return", (0, _responseMessages.retrieveCarMessage)(res, 200, 'car status updated', _updateStatus2.rows[0]));

              case 23:
                _context2.prev = 23;
                _context2.t0 = _context2["catch"](9);
                (0, _responseMessages.errorMessage)(res, 400, 'Unable to update status');

              case 26:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[9, 23]]);
      }));

      function updateStatus(_x3, _x4) {
        return _updateStatus.apply(this, arguments);
      }

      return updateStatus;
    }()
  }, {
    key: "updatePrice",
    value: function () {
      var _updatePrice = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(req, res) {
        var _validate$validateUpd2, error, car_id, email, price, Formatted_price, regex, findCar, _updatePrice2;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _validate$validateUpd2 = _validateInput["default"].validateUpdatePrice(req.body), error = _validate$validateUpd2.error;

                if (!error) {
                  _context3.next = 3;
                  break;
                }

                return _context3.abrupt("return", (0, _responseMessages.errorMessage)(res, 422, error.details[0].message));

              case 3:
                car_id = req.params.car_id;
                email = req.user.email;
                price = req.body.price;
                Formatted_price = parseFloat(price).toFixed(2);
                regex = /^\d+$/;

                if (!(regex.test(car_id) === false)) {
                  _context3.next = 10;
                  break;
                }

                return _context3.abrupt("return", (0, _responseMessages.errorMessage)(res, 422, 'car id should be a number'));

              case 10:
                _context3.prev = 10;
                _context3.next = 13;
                return _index["default"].query('SELECT * FROM cars WHERE id=$1 AND owner_email=$2;', [car_id, email]);

              case 13:
                findCar = _context3.sent;

                if (!(findCar.rowCount < 1)) {
                  _context3.next = 16;
                  break;
                }

                return _context3.abrupt("return", (0, _responseMessages.errorMessage)(res, 404, 'no vehicle matched the specified criteria'));

              case 16:
                _context3.next = 18;
                return _index["default"].query('UPDATE cars SET price=$1 WHERE id=$2 RETURNING * ;', [Formatted_price, findCar.rows[0].id]);

              case 18:
                _updatePrice2 = _context3.sent;
                return _context3.abrupt("return", (0, _responseMessages.retrieveCarMessage)(res, 200, 'car price updated', _updatePrice2.rows[0]));

              case 22:
                _context3.prev = 22;
                _context3.t0 = _context3["catch"](10);
                return _context3.abrupt("return", (0, _responseMessages.errorMessage)(res, 400, 'Unable to update price'));

              case 25:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[10, 22]]);
      }));

      function updatePrice(_x5, _x6) {
        return _updatePrice.apply(this, arguments);
      }

      return updatePrice;
    }()
  }, {
    key: "getOneCar",
    value: function () {
      var _getOneCar = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(req, res) {
        var car_id, getCar;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                car_id = req.params.car_id;
                _context4.prev = 1;
                _context4.next = 4;
                return _index["default"].query('SELECT * FROM cars WHERE id=$1;', [car_id]);

              case 4:
                getCar = _context4.sent;

                if (!(getCar.rowCount === 0)) {
                  _context4.next = 7;
                  break;
                }

                return _context4.abrupt("return", (0, _responseMessages.errorMessage)(res, 404, 'Car not found'));

              case 7:
                return _context4.abrupt("return", (0, _responseMessages.retrieveCarMessage)(res, 200, 'vehicle successfully retrieved', getCar.rows[0]));

              case 10:
                _context4.prev = 10;
                _context4.t0 = _context4["catch"](1);
                return _context4.abrupt("return", (0, _responseMessages.errorMessage)(res, 400, 'Unable to retrieve car'));

              case 13:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[1, 10]]);
      }));

      function getOneCar(_x7, _x8) {
        return _getOneCar.apply(this, arguments);
      }

      return getOneCar;
    }()
  }, {
    key: "deleteCar",
    value: function () {
      var _deleteCar = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5(req, res) {
        var is_admin, car_id, findCar;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                is_admin = req.user.is_admin;
                car_id = req.params.car_id;

                if (!(is_admin !== 'true')) {
                  _context5.next = 4;
                  break;
                }

                return _context5.abrupt("return", (0, _responseMessages.errorMessage)(res, 403, 'you are not authorized to do this'));

              case 4:
                _context5.prev = 4;
                _context5.next = 7;
                return _index["default"].query('SELECT * FROM cars WHERE id=$1;', [car_id]);

              case 7:
                findCar = _context5.sent;

                if (!(findCar.rowCount <= 0)) {
                  _context5.next = 10;
                  break;
                }

                return _context5.abrupt("return", (0, _responseMessages.errorMessage)(res, 404, 'car not found'));

              case 10:
                _context5.next = 12;
                return _index["default"].query('DELETE FROM cars WHERE id = $1;', [car_id]);

              case 12:
                return _context5.abrupt("return", (0, _responseMessages.retrieveCarMessage)(res, 200, 'Car Ad was successfully deleted'));

              case 15:
                _context5.prev = 15;
                _context5.t0 = _context5["catch"](4);
                return _context5.abrupt("return", (0, _responseMessages.errorMessage)(res, 400, 'Unable to delete car'));

              case 18:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, null, [[4, 15]]);
      }));

      function deleteCar(_x9, _x10) {
        return _deleteCar.apply(this, arguments);
      }

      return deleteCar;
    }()
  }, {
    key: "getAllCars",
    value: function () {
      var _getAllCars = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee6(req, res) {
        var is_admin, getCars;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                is_admin = req.user.is_admin;

                if (!(is_admin !== 'true')) {
                  _context6.next = 3;
                  break;
                }

                return _context6.abrupt("return", (0, _responseMessages.errorMessage)(res, 403, 'you are not authorized to do this'));

              case 3:
                _context6.prev = 3;
                _context6.next = 6;
                return _index["default"].query('SELECT * FROM CARS;');

              case 6:
                getCars = _context6.sent;

                if (!(getCars.rowCount <= 0)) {
                  _context6.next = 9;
                  break;
                }

                return _context6.abrupt("return", (0, _responseMessages.errorMessage)(res, 404, 'No car found'));

              case 9:
                return _context6.abrupt("return", (0, _responseMessages.retrieveCarMessage)(res, 200, 'All ads successfully retrieved', getCars.rows));

              case 12:
                _context6.prev = 12;
                _context6.t0 = _context6["catch"](3);
                return _context6.abrupt("return", (0, _responseMessages.errorMessage)(res, 400, 'Unable to retrieve cars'));

              case 15:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, null, [[3, 12]]);
      }));

      function getAllCars(_x11, _x12) {
        return _getAllCars.apply(this, arguments);
      }

      return getAllCars;
    }()
  }, {
    key: "availableCars",
    value: function () {
      var _availableCars = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee7(req, res, next) {
        var status, getAvailableCars;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                status = req.query.status;

                if (!(status === undefined)) {
                  _context7.next = 3;
                  break;
                }

                return _context7.abrupt("return", next());

              case 3:
                _context7.prev = 3;
                _context7.next = 6;
                return _index["default"].query('SELECT * FROM cars WHERE status=$1;', ['available']);

              case 6:
                getAvailableCars = _context7.sent;

                if (!(getAvailableCars.rowCount < 1)) {
                  _context7.next = 9;
                  break;
                }

                return _context7.abrupt("return", (0, _responseMessages.errorMessage)(res, 404, 'No ad found'));

              case 9:
                return _context7.abrupt("return", (0, _responseMessages.retrieveCarMessage)(res, 200, 'Available cars successfully retrieved', getAvailableCars.rows));

              case 12:
                _context7.prev = 12;
                _context7.t0 = _context7["catch"](3);
                return _context7.abrupt("return", (0, _responseMessages.errorMessage)(res, 400, 'Unable to retrieve available cars'));

              case 15:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, null, [[3, 12]]);
      }));

      function availableCars(_x13, _x14, _x15) {
        return _availableCars.apply(this, arguments);
      }

      return availableCars;
    }()
  }, {
    key: "filteredAvailableCar",
    value: function () {
      var _filteredAvailableCar = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee8(req, res, next) {
        var _req$query, status, _req$query$min_price, minPrice, _req$query$max_price, maxPrice, getFilteredCars;

        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _req$query = req.query, status = _req$query.status, _req$query$min_price = _req$query.min_price, minPrice = _req$query$min_price === void 0 ? 0 : _req$query$min_price, _req$query$max_price = _req$query.max_price, maxPrice = _req$query$max_price === void 0 ? 100000000000000 : _req$query$max_price;

                if (!(status === undefined || minPrice === undefined || maxPrice === undefined)) {
                  _context8.next = 3;
                  break;
                }

                return _context8.abrupt("return", next());

              case 3:
                _context8.next = 5;
                return _index["default"].query('SELECT * FROM cars WHERE status=$1 AND (price >= $2 AND price <= $3);', ['available', minPrice, maxPrice]);

              case 5:
                getFilteredCars = _context8.sent;

                if (!(getFilteredCars.rows < 1)) {
                  _context8.next = 8;
                  break;
                }

                return _context8.abrupt("return", (0, _responseMessages.errorMessage)(res, 404, 'no car matched the specified criteria'));

              case 8:
                return _context8.abrupt("return", (0, _responseMessages.retrieveCarMessage)(res, 200, 'vehicles successfully retrieved', getFilteredCars.rows));

              case 9:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8);
      }));

      function filteredAvailableCar(_x16, _x17, _x18) {
        return _filteredAvailableCar.apply(this, arguments);
      }

      return filteredAvailableCar;
    }()
  }]);

  return carController;
}();

var _default = carController;
exports["default"] = _default;