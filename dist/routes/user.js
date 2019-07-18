"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _userControllers = _interopRequireDefault(require("../controllers/userControllers"));

var _trimmer = _interopRequireDefault(require("../helper/trimmer/trimmer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var signUpTrim = _trimmer["default"].signUpTrim,
    loginTrim = _trimmer["default"].loginTrim;

var router = _express["default"].Router();

router.post('/auth/signup', signUpTrim, _userControllers["default"].signupUser);
router.post('/auth/signin', loginTrim, _userControllers["default"].loginUser);
var _default = router;
exports["default"] = _default;