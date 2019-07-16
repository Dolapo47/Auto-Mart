"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _joi = _interopRequireDefault(require("joi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var validate =
/*#__PURE__*/
function () {
  function validate() {
    _classCallCheck(this, validate);
  }

  _createClass(validate, null, [{
    key: "validateUser",
    value: function validateUser(user) {
      var schema = _joi["default"].object().keys({
        email: _joi["default"].string().email().trim().error(function () {
          return 'email is required and must be a valid email';
        }),
        first_name: _joi["default"].string().regex(/^[A-Za-z]+$/).required().error(function () {
          return 'Firstname is required and must contain only alphabets';
        }),
        last_name: _joi["default"].string().regex(/^[A-Za-z]+$/).required().error(function () {
          return 'Firstname is required and must contain only alphabets';
        }),
        password: _joi["default"].string().required().min(6),
        address: _joi["default"].string().required()
      });

      return _joi["default"].validate(user, schema);
    }
  }, {
    key: "validateLogin",
    value: function validateLogin(details) {
      var schema = _joi["default"].object().keys({
        email: _joi["default"].string().email().trim().error(function () {
          return 'email is required and must be a valid email';
        }),
        password: _joi["default"].string().min(6).required().error(function () {
          return 'password is required and must be at least 6 characters long';
        })
      });

      return _joi["default"].validate(details, schema);
    }
  }, {
    key: "validateCarInput",
    value: function validateCarInput(details) {
      var schema = _joi["default"].object().keys({
        state: _joi["default"].string().insensitive().valid('new', 'used').regex(/^[0-9]+$/).trim().required().error(function () {
          return 'state can only be new or used';
        }),
        price: _joi["default"].string().trim().required().error(function () {
          return 'only numbers allowed';
        }),
        manufacturer: _joi["default"].string().regex(/^[A-Za-z]+$/).trim().required(),
        model: _joi["default"].string().regex(/^[a-zA-Z0-9]*$/).trim().required().error(function () {
          return 'only alphanumeric characters allowed';
        }),
        body_type: _joi["default"].string().insensitive().valid('car', 'van', 'truck', 'trailer').trim().required().error(function () {
          return 'body type can be car, van, truck, trailer';
        })
      });

      return _joi["default"].validate(details, schema);
    }
  }, {
    key: "validateUpdatePrice",
    value: function validateUpdatePrice(details) {
      var schema = _joi["default"].object().keys({
        price: _joi["default"].string().regex(/^\d*(\.\d{2})?$/).regex(/^[0-9]*[1-9][0-9]*$/).trim().required()
      });

      return _joi["default"].validate(details, schema);
    }
  }, {
    key: "validateUpdateStatus",
    value: function validateUpdateStatus(details) {
      var schema = _joi["default"].object().keys({
        status: _joi["default"].string().insensitive().valid('available', 'sold').trim().required()
      });

      return _joi["default"].validate(details, schema);
    }
  }, {
    key: "validateOrderInput",
    value: function validateOrderInput(details) {
      var schema = _joi["default"].object().keys({
        car_id: _joi["default"].string().regex(/^[0-9]+$/).trim().required(),
        price_offered: _joi["default"].string().regex(/^\d*(\.\d{2})?$/).regex(/^[0-9]*[1-9][0-9]*$/).trim().required()
      });

      return _joi["default"].validate(details, schema);
    }
  }, {
    key: "validatePatchOrder",
    value: function validatePatchOrder(details) {
      var schema = _joi["default"].object().keys({
        new_offer: _joi["default"].string().regex(/^\d*(\.\d{2})?$/).regex(/^[0-9]*[1-9][0-9]*$/).trim().required(),
        order_id: _joi["default"].string()
      });

      return _joi["default"].validate(details, schema);
    }
  }, {
    key: "validateFlagInput",
    value: function validateFlagInput(details) {
      var schema = _joi["default"].object().keys({
        car_id: _joi["default"].string().regex(/^[0-9]+$/).trim().required(),
        reason: _joi["default"].string().trim().required(),
        description: _joi["default"].string().trim().required()
      });

      return _joi["default"].validate(details, schema);
    }
  }, {
    key: "validateParams",
    value: function validateParams(id) {
      var schema = _joi["default"].object().keys({
        id: _joi["default"].number().integer().error(function () {
          return 'invalid id';
        }).required()
      });

      return _joi["default"].validate(id, schema);
    }
  }]);

  return validate;
}();

var _default = validate;
exports["default"] = _default;