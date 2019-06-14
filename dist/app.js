"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _morgan = _interopRequireDefault(require("morgan"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _user = _interopRequireDefault(require("./routes/user"));

var _vehicle = _interopRequireDefault(require("./routes/vehicle"));

var _order = _interopRequireDefault(require("./routes/order"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
var port = process.env.PORT || 3000;
app.use((0, _morgan["default"])('dev'));
app.use(_bodyParser["default"].json());
app.use(_bodyParser["default"].urlencoded({
  extended: false
}));
app.get('/', function (req, res) {
  res.status(200).json({
    status: 200,
    data: [{
      message: 'welcome to automart'
    }]
  });
});
app.use('/api/v1', _user["default"]);
app.use('/api/v1', _vehicle["default"]);
app.use('/api/v1', _order["default"]);
app.use(function (err, req, res, next) {
  if (err) {
    return res.status(500).json({
      status: 500,
      error: 'internal server error'
    });
  }

  return next();
});
app.all('*', function (req, res) {
  return res.status(404).json({
    status: 404,
    error: 'Route does not exist'
  });
});
app.listen(port, function () {
  console.log("Server is running on port ".concat(port));
});
var _default = app;
exports["default"] = _default;