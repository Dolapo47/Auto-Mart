"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _validator = _interopRequireDefault(require("validator"));

var _isEmpty = _interopRequireDefault(require("../isEmpty"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var validateUpdateOrder = function validateUpdateOrder(data) {
  var errors = {};
  data.amountOffered = (0, _isEmpty["default"])(data.amountOffered) === true ? '' : data.amountOffered;

  if (!_validator["default"].isFloat(data.amountOffered)) {
    errors.amountOffered = 'Number must be in 0.00 format';
  }

  if (_validator["default"].isEmpty(data.amountOffered) || !_validator["default"].isLength(data.amountOffered, {
    min: 1,
    max: 13
  })) {
    errors.amountOffered = 'Last name must be between 1 and 13 characters';
  }

  return {
    errors: errors,
    isValid: (0, _isEmpty["default"])(errors)
  };
};

var _default = validateUpdateOrder;
exports["default"] = _default;