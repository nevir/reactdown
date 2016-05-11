'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = title;

var _MDAST = require('../MDAST');

/**
 * @copyright 2016-present, Reactdown Team
 * 
 */

function title(node) {
  for (var i = 0; i < node.children.length; i++) {
    var child = node.children[i];
    if (child.type === 'heading') {
      // $FlowIssue: https://github.com/facebook/flow/issues/1689
      var heading = child;
      if (heading.depth === 1) {
        return (0, _MDAST.renderNodeValue)(child);
      }
    }
  }
  return null;
}
