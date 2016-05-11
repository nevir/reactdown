'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapValue = mapValue;
exports.filterUndefined = filterUndefined;
exports.hasIndent = hasIndent;
/**
 * @copyright 2016-present, Reactdown Team
 * 
 */

function mapValue(value, func) {
  var result = {};
  for (var _key in value) {
    if (value.hasOwnProperty(_key)) {
      var nextValue = func(value[_key], _key);
      if (nextValue !== undefined) {
        result[_key] = nextValue;
      }
    }
  }
  return result;
}

function filterUndefined(value) {
  return mapValue(value, function (value) {
    return value;
  });
}

function hasIndent(line, size) {
  for (var i = 0; i < size; i++) {
    if (line.charAt(i) !== ' ') {
      return false;
    }
  }
  return true;
}
