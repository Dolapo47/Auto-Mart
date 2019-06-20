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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router(); // router.get('/car', verifyToken, carController.filterAvailableCars);


router.get('/car', _userHelpers.verifyToken, _carController["default"].availableCars);
router.get('/car', _userHelpers.verifyToken, _carController["default"].getAllCars);
router.get('/car/:carId', _userHelpers.verifyToken, _carController["default"].getOneCar);
router.post('/car', _userHelpers.verifyToken, _multer["default"].array('image_url', 2), _cloudinary["default"], _carController["default"].createCar);
router.patch('/car/:carId/status', _userHelpers.verifyToken, _carController["default"].updateStatus);
router.patch('/car/:carId/price', _userHelpers.verifyToken, _carController["default"].updatePrice);
router["delete"]('/car/:carId', _userHelpers.verifyToken, _carController["default"].deleteCar);
var _default = router;
exports["default"] = _default;