'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = buildReactElement;

var _buildJSON = require('./buildJSON');

var _buildJSON2 = _interopRequireDefault(_buildJSON);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @copyright 2016-present, Reactdown Team
 * 
 */

function buildReactElement(build, name, props) {
  var createElement = function () {
    return {
      "type": "MemberExpression",
      "object": {
        "type": "Identifier",
        "name": "React"
      },
      "property": {
        "type": "Identifier",
        "name": "createElement"
      },
      "computed": false
    };
  }();

  for (var _len = arguments.length, children = Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
    children[_key - 3] = arguments[_key];
  }

  return build.callExpression(createElement, [name, (0, _buildJSON2.default)(build, props)].concat(children));
}
