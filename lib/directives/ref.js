'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /**
                                                                                                                                                                                                                                                                   * @copyright 2016-present, Reactdown Team
                                                                                                                                                                                                                                                                   * 
                                                                                                                                                                                                                                                                   */

exports.default = ref;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var refStyle = {
  root: {
    height: 0,
    width: 0,
    top: '-1em',
    visibility: 'hidden',
    position: 'relative'
  }
};

function ref(_ref) {
  var line = _ref.line;
  var name = _ref.name;
  var style = _ref.style;

  return _react2.default.createElement(
    'div',
    { style: _extends({}, refStyle.root, style) },
    _react2.default.createElement(
      'a',
      { name: name || line },
      '#'
    )
  );
}
