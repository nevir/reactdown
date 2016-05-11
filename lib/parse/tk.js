'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.default = tk;
/**
 * @copyright 2016-present, Reactdown Team
 * 
 */

var TK_TEST = /^TK\s+([^\n]+)\n/;

function parseTK(eat, value) {
  var match = TK_TEST.exec(value);

  if (!match) {
    return;
  }

  var _match = _slicedToArray(match, 2);

  var wholeLine = _match[0];
  var line = _match[1];

  eat(wholeLine)({
    type: 'directive',
    position: null,
    name: 'TK',
    line: line,
    children: [],
    value: null,
    data: null
  });
}

function tk() {

  return function (remark) {

    var ParserPrototype = remark.Parser.prototype;

    ParserPrototype.blockTokenizers.tk = parseTK;
    ParserPrototype.blockMethods.splice(ParserPrototype.blockMethods.indexOf('fences') + 1, 0, 'tk');
  };
}
