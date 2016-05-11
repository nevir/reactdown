'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = toc;

var _unistUtilVisit = require('unist-util-visit');

var _unistUtilVisit2 = _interopRequireDefault(_unistUtilVisit);

var _MDAST = require('../MDAST');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @copyright 2016-present, Reactdown Team
 * 
 */

function toc(node) {
  var toc = [];
  (0, _unistUtilVisit2.default)(node, 'heading', function (node) {
    var value = (0, _MDAST.renderNodeValue)(node);
    toc.push({ value: value, depth: node.depth });
  });
  return toc;
}
