"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _dotenv = _interopRequireDefault(require("dotenv"));

var _pg = require("pg");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

var env = process.env.NODE_ENV;
var pool = env === 'test' ? new _pg.Pool({
  connectionString: process.env.DATABASE_URL
}) : new _pg.Pool({
  connectionString: process.env.DB
});
var _default = pool;
exports["default"] = _default;