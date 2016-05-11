'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp; /**
                    * @copyright 2016-present, Reactdown Team
                    * 
                    */

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _DocumentContext = require('../DocumentContext');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var metaStyle = {
  root: {
    color: '#444',
    background: 'rgb(226, 226, 226)',
    fontWeight: 'bold',
    fontFamily: 'monospace'
  },
  heading: {
    background: 'rgb(175, 175, 175)',
    padding: 5
  },
  report: {
    padding: 10,
    margin: 0
  }
};

var meta = (_temp = _class = function (_React$Component) {
  _inherits(meta, _React$Component);

  function meta() {
    _classCallCheck(this, meta);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(meta).apply(this, arguments));
  }

  _createClass(meta, [{
    key: 'render',
    value: function render() {
      var metadata = JSON.stringify(this.context.reactdown.metadata, null, 2);
      return _react2.default.createElement(
        'div',
        { style: metaStyle.root },
        _react2.default.createElement(
          'div',
          { style: metaStyle.heading },
          'Document metadata:'
        ),
        _react2.default.createElement(
          'pre',
          { style: metaStyle.report },
          _react2.default.createElement(
            'code',
            null,
            metadata
          )
        )
      );
    }
  }]);

  return meta;
}(_react2.default.Component), _class.contextTypes = _DocumentContext.contextTypes, _temp);
exports.default = meta;
