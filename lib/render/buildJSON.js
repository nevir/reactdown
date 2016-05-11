'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

exports.default = buildJSON;
function buildJSON(build, value) {
  if (build.isNode(value)) {
    return value;
  } else if (value === undefined) {
    return build.identifier('undefined');
  } else if (value === null) {
    return build.nullLiteral();
  } else if (typeof value === 'string') {
    return build.stringLiteral(value);
  } else if (typeof value === 'number') {
    return build.numericLiteral(value);
  } else if (typeof value === 'boolean') {
    return build.booleanLiteral(value);
  } else if (value instanceof Date) {
    return build.stringLiteral(value.toISOString());
  } else if (Array.isArray(value)) {
    return build.arrayExpression(value.map(function (item) {
      return buildJSON(build, item);
    }));
  } else if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
    var properties = [];
    for (var key in value) {
      if (value.hasOwnProperty(key)) {
        properties.push(build.objectProperty(build.stringLiteral(key), buildJSON(build, value[key])));
      }
    }
    return build.objectExpression(properties);
  } else {
    throw new Error('cannot parse value to AST: ' + value);
  }
} /**
   * @copyright 2016-present, Reactdown Team
   * 
   */
