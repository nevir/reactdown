'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.default = role;

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @copyright 2016-present, Reactdown Team
 * 
 */

var ROLE_TAG_RE = /^:([a-zA-Z\_\-]+):/;
var WORD_RE = /^([^\s\.\,\?!:]+)/;
var QUOTED_WORD_RE = /^`([^`]+)`/;

/**
 * Find a possible role.
 *
 * @example
 *   locateRole('foo :class:some'); // 4
 *
 * @param {string} value - Value to search.
 * @param {number} fromIndex - Index to start searching at.
 * @return {number} - Location of possible role sequence.
 */
function locateRole(value, fromIndex) {
  return value.indexOf(':', fromIndex);
}

/**
 * Tokenize a role.
 *
 * @example
 *   tokenizeRole(eat, ':class:some');
 *
 * @property {Function} locator - Mention locator.
 * @param {function(string)} eat - Eater.
 * @param {string} value - Rest of content.
 * @param {boolean?} [silent] - Whether this is a dry run.
 * @return {Node?|boolean} - `role` node.
 */
function tokenizeRole(eat, value, silent) {
  var match = ROLE_TAG_RE.exec(value);

  if (match) {
    if (silent) {
      return true;
    }

    var _match = _slicedToArray(match, 2);

    var token = _match[0];
    var name = _match[1];

    // Eat/slice the ':<role name>' but not the trailing ':', we need it later
    // in the word parsing loop.

    eat(token.slice(0, token.length - 1));
    value = value.slice(token.length - 1);

    var words = [];

    while (value[0] === ':' && value[1] !== ':') {
      // Eat slice the leading ':'.
      value = value.slice(1);
      eat(':');

      // parse quoted word (`some word`).
      if (value[0] === '`') {
        var wordMatch = QUOTED_WORD_RE.exec(value);
        (0, _invariant2.default)(wordMatch != null, 'Failed to parse word from: %s', value);

        var _wordMatch = _slicedToArray(wordMatch, 2);

        var quotedWord = _wordMatch[0];
        var word = _wordMatch[1];

        eat(quotedWord);
        value = value.slice(quotedWord.length);
        words.push(word);
        // parse regular word
      } else {
          var _wordMatch2 = WORD_RE.exec(value);
          (0, _invariant2.default)(_wordMatch2 != null, 'Failed to parse word from: %s', value);

          var _wordMatch3 = _slicedToArray(_wordMatch2, 2);

          var _ = _wordMatch3[0];
          var _word = _wordMatch3[1];

          eat(_word);
          value = value.slice(_word.length);
          words.push(_word);
        }
    }

    return eat('')({
      type: 'role',
      name: name,
      words: words,
      position: null,
      data: null
    });
  }
}

tokenizeRole.notInLink = true;
tokenizeRole.locator = locateRole;

function role() {

  return function (remark) {
    var ParserPrototype = remark.Parser.prototype;
    ParserPrototype.inlineTokenizers.role = tokenizeRole;
    ParserPrototype.inlineMethods.splice(ParserPrototype.inlineMethods.indexOf('inlineText'), 0, 'role');
  };
}
