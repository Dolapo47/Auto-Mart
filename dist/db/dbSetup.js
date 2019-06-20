"use strict";

var _dotenv = _interopRequireDefault(require("dotenv"));

var _index = _interopRequireDefault(require("./index"));

var _createTables = _interopRequireDefault(require("./createTables"));

var _dropTables = _interopRequireDefault(require("./dropTables"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

var dbQuery = "".concat(_dropTables["default"]).concat(_createTables["default"]);

_index["default"].connect().then(function (client) {
  client.query(dbQuery).then(function () {
    client.release();
  })["catch"](function (err) {
    console.log(err);
  });
})["catch"](function (error) {
  /* eslint-disable no-console */
  console.log(error);
});