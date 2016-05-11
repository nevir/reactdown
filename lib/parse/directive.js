'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.default = directive;

var _jsYaml = require('js-yaml');

var _jsYaml2 = _interopRequireDefault(_jsYaml);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @copyright 2016-present, Reactdown Team
 * 
 */

var CUSTOM_BLOCK_TEST = /^\.\.([a-zA-Z]+) *([^\n]*)?\n/;
var CUSTOM_BLOCK_INDENT = 2;
var NEWLINE = '\n';

var defautlDirectiveConfig = {
  preformatted: false
};

function parseDirective(directives, eat, value) {

  // Get next line and shift value.
  function nextLine() {
    if (value.length === 0) {
      return null;
    }
    var line = void 0;
    var index = value.indexOf('\n');
    if (index > -1) {
      line = value.slice(0, index);
      value = value.slice(index + 1);
    } else {
      line = value;
      value = '';
    }
    return line;
  }

  function eatLine(line) {
    eat(line);
    if (value !== '') {
      eat('\n');
    }
  }

  var match = CUSTOM_BLOCK_TEST.exec(value);

  if (!match) {
    return;
  }

  // ..DirectiveName
  var bannerLine = nextLine();
  if (bannerLine === null) {
    return;
  }

  var _match = _slicedToArray(match, 3);

  var _ = _match[0];
  var name = _match[1];
  var _match$ = _match[2];
  var line = _match$ === undefined ? null : _match$;


  var config = _extends({}, defautlDirectiveConfig, directives[name]);
  var preformatted = config.preformatted;

  eatLine(bannerLine);

  var childrenPosition = eat.now();

  var currentLine = nextLine();
  var content = [];
  var dataContent = [];

  if (currentLine !== null && hasIndent(currentLine, CUSTOM_BLOCK_INDENT) && currentLine.trim() === '---') {
    eatLine(currentLine);
    currentLine = nextLine();
    while (currentLine !== null) {
      if (currentLine === '') {
        eatLine(currentLine);
        dataContent.push(currentLine);
      } else if (hasIndent(currentLine, CUSTOM_BLOCK_INDENT)) {
        eatLine(currentLine);
        if (currentLine.trim() === '---') {
          currentLine = nextLine();
          break;
        } else {
          dataContent.push(currentLine.slice(CUSTOM_BLOCK_INDENT));
        }
      } else {
        break;
      }
      currentLine = nextLine();
    }
  }

  while (currentLine !== null) {
    if (currentLine === '') {
      eatLine(currentLine);
      content.push(NEWLINE);
    } else if (hasIndent(currentLine, CUSTOM_BLOCK_INDENT) && !(hasIndent(currentLine, 4) && !hasIndent(currentLine, 5) && !content.some(function (line) {
      return line !== '\n';
    }))) {
      eatLine(currentLine);
      content.push(currentLine.slice(CUSTOM_BLOCK_INDENT));
    } else {
      break;
    }
    currentLine = nextLine();
  }

  var children = [];
  var data = null;

  if (dataContent.length > 0) {
    dataContent = dataContent.join(NEWLINE);
    data = _jsYaml2.default.safeLoad(dataContent);
  }

  content = content.join(NEWLINE);
  if (content.length > 0 && !preformatted) {
    children = this.tokenizeBlock(content, childrenPosition);
  }

  eat('')({
    type: 'directive',
    position: null,
    name: name,
    line: line ? line.trim() : line,
    children: preformatted ? undefined : children,
    value: preformatted ? content.trim() : undefined,
    data: data
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

function directive() {
  var directives = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];


  return function (remark) {

    function directive() {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return parseDirective.call.apply(parseDirective, [this, directives].concat(args));
    }

    var ParserPrototype = remark.Parser.prototype;

    ParserPrototype.blockTokenizers.directive = directive;
    ParserPrototype.blockMethods.splice(ParserPrototype.blockMethods.indexOf('fences') + 1, 0, 'directive');
  };
}
