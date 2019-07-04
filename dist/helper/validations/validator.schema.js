"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isInvalidName = exports.pureString = exports.money = exports.pureNumber = exports.isNotSpecified = void 0;

var isNotSpecified = function isNotSpecified(value, key) {
  return !value ? "".concat(key, " was not specified") : false;
};

exports.isNotSpecified = isNotSpecified;
var pureNumber = {
  isInvalid: function isInvalid(value, key) {
    return !+value ? "invalid ".concat(key) : false;
  }
};
exports.pureNumber = pureNumber;
var money = {
  isInvalid: function isInvalid(value, key) {
    return pureNumber.isInvalid(value, key);
  },
  invalidDecimalPlaces: function invalidDecimalPlaces(value, key) {
    // checks if the digits after the decimal point are more than 2
    // using >3 because I am counting the '.' (period)
    // returns true if it is longet than 2 and false if not
    var notValid = value.toString().length - value.toString().split('.')[0].length > 3;
    return notValid ? "".concat(key, " has more than two decimal places") : false;
  },
  isTooHigh: function isTooHigh(value, key, digits) {
    // checks if values before the decimal point is higher than the given length
    var isHigh = value.toString().split('.')[0].length > digits;
    return isHigh ? "whoa! that ".concat(key, " is quite high") : false;
  },
  doValidation: function doValidation(value, key, maxDigits) {
    var messages = isNotSpecified(value) || this.isInvalid(value, key) || this.invalidDecimalPlaces(value, key) || this.isTooHigh(value, key, maxDigits);
    return messages;
  }
};
exports.money = money;
var pureString = {
  name: function name(value, key) {
    var invaliidCharacters = value.match(/[^a-z]/i);
    return invaliidCharacters ? "".concat(key, " has invalid characters") : false;
  },
  isInvalid: function isInvalid(value, key) {
    var hasInvaliidCharacters = value.match(/[^a-z\s]/i);
    return hasInvaliidCharacters ? "".concat(key, " has invalid characters") : false;
  },
  isTooLong: function isTooLong(value, key, length) {
    var tooLong = value.length > length;
    return tooLong ? "".concat(key, " exceeds the maximum length of ").concat(length) : false;
  },
  isNotAlphaNumeric: function isNotAlphaNumeric(value, key) {
    var hasInvalidCharacters = value.match(/[^a-z0-9\s.]/i);
    return hasInvalidCharacters ? "".concat(key, " has invalid characters") : false;
  }
};
exports.pureString = pureString;

var isInvalidName = function isInvalidName(value, key, length) {
  var isInvalid = isNotSpecified(value, key) || pureString.name(value, key) || pureString.isTooLong(value, key, length);
  return isInvalid;
};

exports.isInvalidName = isInvalidName;