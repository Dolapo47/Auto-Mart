"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _carController = _interopRequireDefault(require("../controllers/carController"));

var _userHelpers = require("../helper/userHelpers");

var _multer = _interopRequireDefault(require("../helper/multer"));

var _cloudinary = _interopRequireDefault(require("../helper/cloudinary"));

var _trimmer = _interopRequireDefault(require("../helper/trimmer/trimmer"));

var _validateInput = _interopRequireDefault(require("../helper/validations/validateInput"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var carTrim = _trimmer["default"].carTrim,
    carPriceTrim = _trimmer["default"].carPriceTrim,
    carStatusTrim = _trimmer["default"].carStatusTrim;

var router = _express["default"].Router();

router.get('/car', _userHelpers.verifyToken, _carController["default"].filteredAvailableCar);
router.get('/car', _userHelpers.verifyToken, _carController["default"].availableCars);
router.get('/car', _userHelpers.verifyToken, _carController["default"].getAllCars);
router.get('/car/:car_id', _userHelpers.verifyToken, _carController["default"].getOneCar);
router.post('/car', _userHelpers.verifyToken, carTrim, _carController["default"].createCar);
router.patch('/car/:car_id/status', _userHelpers.verifyToken, carStatusTrim, _carController["default"].updateStatus);
router.patch('/car/:car_id/price', _userHelpers.verifyToken, carPriceTrim, _carController["default"].updatePrice);
router["delete"]('/car/:car_id', _userHelpers.verifyToken, _carController["default"].deleteCar);
var _default = router;
exports["default"] = _default;