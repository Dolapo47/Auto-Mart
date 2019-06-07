"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _multer = _interopRequireDefault(require("multer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var multerUpload = (0, _multer["default"])({
  storage: _multer["default"].diskStorage(),
  fileFilter: function fileFilter(req, file, cb) {
    if (!file.mimetype.match(/jpg|jpeg|png|gif$i/)) {
      cb(new Error('File is not supported'), false);
    }

    cb(null, true);
  }
});
var _default = multerUpload;
exports["default"] = _default;