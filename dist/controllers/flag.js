"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _flagDb = _interopRequireDefault(require("../db/flagDb"));

var _validateFlagInput2 = _interopRequireDefault(require("../helper/validations/validateFlagInput"));

var _responseMessages = require("../helper/validations/responseMessages");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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
    value: function createFlag(req, res) {
      var _validateFlagInput = (0, _validateFlagInput2["default"])(req.body),
          errors = _validateFlagInput.errors,
          isValid = _validateFlagInput.isValid;

      if (!isValid) return (0, _responseMessages.responseMessage)(res, 422, errors);
      var flag = {
        id: _flagDb["default"].length + 1,
        carId: req.body.carId,
        reason: req.body.reason,
        description: req.body.description
      };

      _flagDb["default"].push(flag);

      return (0, _responseMessages.retrieveCarMessage)(res, 201, 'flag successfully created', flag);
    }
  }]);

  return flagController;
}();

var _default = flagController;
exports["default"] = _default;