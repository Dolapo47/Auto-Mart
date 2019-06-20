"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _index = _interopRequireDefault(require("../db/index"));

var _validateRegeisterInput = _interopRequireDefault(require("../helper/validations/validateRegeisterInput"));

var _validateLogin2 = _interopRequireDefault(require("../helper/validations/validateLogin"));

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
        var _validateRegisterInpu, errors, isValid, _req$body, firstname, lastname, email, password, address, adminSecret, isAdmin, existingUser, hashedPassword, registerUser;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _validateRegisterInpu = (0, _validateRegeisterInput["default"])(req.body), errors = _validateRegisterInpu.errors, isValid = _validateRegisterInpu.isValid;

                if (isValid) {
                  _context.next = 3;
                  break;
                }

                return _context.abrupt("return", (0, _responseMessages.responseMessage)(res, 400, errors));

              case 3:
                _req$body = req.body, firstname = _req$body.firstname, lastname = _req$body.lastname, email = _req$body.email, password = _req$body.password, address = _req$body.address, adminSecret = _req$body.adminSecret;
                isAdmin = adminSecret === process.env.ADMIN_SECRET ? 't' : 'f';
                _context.prev = 5;
                _context.next = 8;
                return _index["default"].query('SELECT * from users WHERE email=$1;', [email]);

              case 8:
                existingUser = _context.sent;

                if (!existingUser.rowCount) {
                  _context.next = 11;
                  break;
                }

                return _context.abrupt("return", res.status(409).send({
                  status: 409,
                  error: 'User exist already'
                }));

              case 11:
                hashedPassword = _bcryptjs["default"].hashSync(password, 10);
                _context.next = 14;
                return _index["default"].query('INSERT INTO users(firstname, lastname, email, password, address, is_admin) VALUES($1, $2, $3, $4, $5, $6) RETURNING *;', [firstname, lastname, email, hashedPassword, address, isAdmin]);

              case 14:
                registerUser = _context.sent;
                return _context.abrupt("return", _jsonwebtoken["default"].sign(registerUser.rows[0], process.env.SECRET, function (err, token) {
                  if (err) res.status(400).send({
                    error: err.message
                  });
                  res.status(201).send({
                    status: 201,
                    data: {
                      token: token,
                      user: registerUser[0]
                    }
                  });
                }));

              case 18:
                _context.prev = 18;
                _context.t0 = _context["catch"](5);
                return _context.abrupt("return", res.status(400).send({
                  error: _context.t0.message
                }));

              case 21:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[5, 18]]);
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
        var _validateLogin, errors, isValid, _req$body2, email, password, userExist, comparePasswords;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _validateLogin = (0, _validateLogin2["default"])(req.body), errors = _validateLogin.errors, isValid = _validateLogin.isValid;

                if (isValid) {
                  _context2.next = 3;
                  break;
                }

                return _context2.abrupt("return", (0, _responseMessages.responseMessage)(res, 400, errors));

              case 3:
                _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;
                _context2.prev = 4;
                _context2.next = 7;
                return _index["default"].query('SELECT * FROM users WHERE email=$1;', [email]);

              case 7:
                userExist = _context2.sent;

                if (userExist.rowCount <= 0) {
                  (0, _responseMessages.responseMessage)(res, 404, 'User does not exist!');
                }

                comparePasswords = _bcryptjs["default"].compareSync(password, userExist.rows[0].password);

                if (!comparePasswords) {
                  (0, _responseMessages.responseMessage)(res, 401, 'Email or password is incorrect!');
                }

                return _context2.abrupt("return", _jsonwebtoken["default"].sign(userExist.rows[0], process.env.SECRET, function (err, token) {
                  if (err) (0, _responseMessages.responseMessage)(res, 401, 'Auth Failed');
                  res.status(200).send({
                    status: 'success',
                    data: {
                      token: token,
                      user: userExist.rows[0]
                    }
                  });
                }));

              case 14:
                _context2.prev = 14;
                _context2.t0 = _context2["catch"](4);
                return _context2.abrupt("return", res.status(500).send({
                  error: _context2.t0.message
                }));

              case 17:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[4, 14]]);
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