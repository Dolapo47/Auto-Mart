"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isInteger = exports.isFloat = exports.isEmpty = void 0;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var isEmpty = function isEmpty(value) {
  if (value === undefined || value === 'undefined' || value === null || _typeof(value) === 'object' && Object.keys(value).length === 0 || typeof value === 'string' && value.trim().length === 0) {
    return true;
  }
};

exports.isEmpty = isEmpty;

var isFloat = function isFloat(value) {
  var regex = /^\d*(\.\d{2})?$/;
  var regInt = /^[0-9]*[1-9][0-9]*$/;

  if (value.match(regex) && value.match(regInt)) {
    return true;
  }
};

exports.isFloat = isFloat;

var isInteger = function isInteger(value) {
  var regInt = /^[0-9]*[1-9][0-9]*$/;

  if (value.match(regInt)) {
    return true;
  }
};

exports.isInteger = isInteger;