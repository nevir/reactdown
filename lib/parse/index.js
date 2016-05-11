'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = parse;

var _remark = require('remark');

var _remark2 = _interopRequireDefault(_remark);

var _directive = require('./directive');

var _directive2 = _interopRequireDefault(_directive);

var _tk = require('./tk');

var _tk2 = _interopRequireDefault(_tk);

var _role = require('./role');

var _role2 = _interopRequireDefault(_role);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @copyright 2016-present, Reactdown Team
 * 
 */

var defaultConfig = {
  directives: {}
};

function parse(value) {
  var options = arguments.length <= 1 || arguments[1] === undefined ? defaultConfig : arguments[1];

  return (0, _remark2.default)(options).use((0, _directive2.default)(options.directives)).use((0, _tk2.default)()).use((0, _role2.default)()).parse(value);
}
