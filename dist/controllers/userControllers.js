"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _index = _interopRequireDefault(require("../db/index"));

var _validateInput = _interopRequireDefault(require("../helper/validations/validateInput"));

var _responseMessages = require("../helper/validations/responseMessages");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var userController =
/*#__PURE__*/
function () {
  function userController() {
    _classCallCheck(this, userController);
  }

  _createClass(userController, null, [{
    key: "signupUser",
    value: function () {
      var _signupUser = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(req, res) {
        var _req$body, first_name, last_name, email, password, address, existingUser, hashedPassword, registerUser;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                // const { error } = validate.validateUser(req.body);
                // if (error) return errorMessage(res, 422, error.details[0].message);
                _req$body = req.body, first_name = _req$body.first_name, last_name = _req$body.last_name, email = _req$body.email, password = _req$body.password, address = _req$body.address;
                _context.prev = 1;
                _context.next = 4;
                return _index["default"].query('SELECT * from users WHERE email=$1;', [email]);

              case 4:
                existingUser = _context.sent;

                if (!existingUser.rowCount) {
                  _context.next = 7;
                  break;
                }

                return _context.abrupt("return", (0, _responseMessages.errorMessage)(res, 409, 'User exists already'));

              case 7:
                hashedPassword = _bcryptjs["default"].hashSync(password, 10);
                _context.next = 10;
                return _index["default"].query('INSERT INTO users(first_name, last_name, email, password, address, is_admin) VALUES($1, $2, $3, $4, $5, $6) RETURNING *;', [first_name, last_name, email, hashedPassword, address, false]);

              case 10:
                registerUser = _context.sent;
                return _context.abrupt("return", _jsonwebtoken["default"].sign(registerUser.rows[0], process.env.SECRET, function (err, token) {
                  if (err) (0, _responseMessages.errorMessage)(res, 400, 'unable to register new user');
                  (0, _responseMessages.userMessage)(res, 201, 'user created', token, registerUser.rows[0]);
                }));

              case 14:
                _context.prev = 14;
                _context.t0 = _context["catch"](1);
                return _context.abrupt("return", (0, _responseMessages.errorMessage)(res, 400, 'unable to register new user'));

              case 17:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[1, 14]]);
      }));

      function signupUser(_x, _x2) {
        return _signupUser.apply(this, arguments);
      }

      return signupUser;
    }()
  }, {
    key: "loginUser",
    value: function () {
      var _loginUser = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(req, res) {
        var _req$body2, email, password, userExist, comparePasswords;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                // const { error } = validate.validateLogin(req.body);
                // if (error) return errorMessage(res, 422, error.details[0].message);
                _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;
                _context2.prev = 1;
                _context2.next = 4;
                return _index["default"].query('SELECT * FROM users WHERE email=$1;', [email]);

              case 4:
                userExist = _context2.sent;

                if (userExist.rowCount === 0) {
                  (0, _responseMessages.errorMessage)(res, 404, 'User does not exist!');
                }

                comparePasswords = _bcryptjs["default"].compareSync(password, userExist.rows[0].password);

                if (!comparePasswords) {
                  (0, _responseMessages.errorMessage)(res, 401, 'Email or password is incorrect!');
                }

                return _context2.abrupt("return", _jsonwebtoken["default"].sign(userExist.rows[0], process.env.SECRET, function (err, token) {
                  if (err) (0, _responseMessages.errorMessage)(res, 401, 'Auth Failed');
                  (0, _responseMessages.userMessage)(res, 200, 'Auth Successful', token, userExist.rows[0]);
                }));

              case 11:
                _context2.prev = 11;
                _context2.t0 = _context2["catch"](1);
                (0, _responseMessages.errorMessage)(res, 400, 'Auth Failed');

              case 14:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[1, 11]]);
      }));

      function loginUser(_x3, _x4) {
        return _loginUser.apply(this, arguments);
      }

      return loginUser;
    }()
  }]);

  return userController;
}();

var _default = userController;
exports["default"] = _default;