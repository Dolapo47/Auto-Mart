"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _pg = require("pg");

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

_dotenv["default"].config();

var connectionString;

if (process.env.NODE_ENV === 'test') {
  connectionString = process.env.TEST_URL;
}

if (process.env.NODE_ENV === 'production') {
  connectionString = process.env.DATABASE_URL;
} // Instantiate pool


var pool = new _pg.Pool({
  connectionString: connectionString
});

var Db =
/*#__PURE__*/
function () {
  function Db() {
    _classCallCheck(this, Db);
  }

  _createClass(Db, null, [{
    key: "query",
    value: function query(queryString, params) {
      return new Promise(function (resolve, reject) {
        pool.query(queryString, params).then(function (res) {
          resolve(res);
        })["catch"](function (err) {
          reject(err);
        });
      });
    }
  }]);

  return Db;
}();

var _default = Db;
exports["default"] = _default;