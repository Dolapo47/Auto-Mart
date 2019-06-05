"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _userDb = _interopRequireDefault(require("../db/userDb"));

var _validateRegeisterInput = _interopRequireDefault(require("../helper/validations/validateRegeisterInput"));

var _validateLogin2 = _interopRequireDefault(require("../helper/validations/validateLogin"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

_dotenv["default"].config();

var userController =
/*#__PURE__*/
function () {
  function userController() {
    _classCallCheck(this, userController);
  }

  _createClass(userController, null, [{
    key: "registerUser",
    value: function registerUser(req, res) {
      var _validateRegisterInpu = (0, _validateRegeisterInput["default"])(req.body),
          errors = _validateRegisterInpu.errors,
          isValid = _validateRegisterInpu.isValid;

      var _req$body = req.body,
          email = _req$body.email,
          password = _req$body.password;

      if (!isValid) {
        return res.status(400).json({
          errors: errors
        });
      }

      var checkedEmail = _userDb["default"].filter(function (user) {
        return user.email === email;
      });

      if (checkedEmail.length > 0) {
        res.status(409).json({
          status: 409,
          error: 'The user already exist.'
        });
      } else {
        _bcrypt["default"].hash(password, 10, function (err, hash) {
          if (err) {
            return res.status(400).json({
              error: 'Password could not be hashed'
            });
          }

          var user = {
            id: _userDb["default"].length + 1,
            email: req.body.email,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            password: hash,
            address: req.body.address,
            admin: false
          };

          _userDb["default"].push(user);

          var token = _jsonwebtoken["default"].sign({
            email: user.email,
            userId: user.id
          }, process.env.SECRET, {
            expiresIn: '1h'
          });

          res.status(201).json({
            status: 201,
            success: 'user registered',
            data: [{
              token: token,
              user: user
            }]
          });
        });
      }
    }
  }, {
    key: "loginUser",
    value: function loginUser(req, res) {
      var _validateLogin = (0, _validateLogin2["default"])(req.body),
          errors = _validateLogin.errors,
          isValid = _validateLogin.isValid;

      var _req$body2 = req.body,
          email = _req$body2.email,
          password = _req$body2.password;

      if (!isValid) {
        return res.status(400).json({
          errors: errors
        });
      }

      var loginUser = _userDb["default"].filter(function (user) {
        return user.email === email;
      });

      if (loginUser.length < 1) {
        return res.status(404).json({
          message: 'Email does not exist'
        });
      }

      _bcrypt["default"].compare(password, loginUser[0].password, function (err, result) {
        if (err) {
          return res.status(401).json({
            error: 'Auth Failed'
          });
        }

        if (result) {
          var token = _jsonwebtoken["default"].sign({
            email: loginUser[0].email,
            id: loginUser[0].id
          }, process.env.SECRET, {
            expiresIn: '1h'
          });

          return res.status(200).json({
            message: 'Auth Successful',
            user: loginUser[0],
            token: token
          });
        }

        res.status(401).json({
          message: 'Auth Failed'
        });
      });
    }
  }]);

  return userController;
}();

var _default = userController;
exports["default"] = _default;