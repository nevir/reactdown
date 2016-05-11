'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @copyright 2016-present, Reactdown Team
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _detab = require('detab');

var _detab2 = _interopRequireDefault(_detab);

var _collapseWhiteSpace = require('collapse-white-space');

var _collapseWhiteSpace2 = _interopRequireDefault(_collapseWhiteSpace);

var _normalizeUri = require('normalize-uri');

var _normalizeUri2 = _interopRequireDefault(_normalizeUri);

var _trimLines = require('trim-lines');

var _trimLines2 = _interopRequireDefault(_trimLines);

var _babelTypes = require('babel-types');

var build = _interopRequireWildcard(_babelTypes);

var _unistUtilVisit = require('unist-util-visit');

var _unistUtilVisit2 = _interopRequireDefault(_unistUtilVisit);

var _jsYaml = require('js-yaml');

var _jsYaml2 = _interopRequireDefault(_jsYaml);

var _buildReactElement = require('./buildReactElement');

var _buildReactElement2 = _interopRequireDefault(_buildReactElement);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Renderer = function () {
  function Renderer(config) {
    _classCallCheck(this, Renderer);

    this.build = config.build || build;
    this.directives = config.directives || {};
    this.roles = config.roles || {};

    this.definitions = {};
    this.footnotes = [];
    this.expression = null;
    this.identifiersUsed = [];
    this.metadata = {};
  }

  _createClass(Renderer, [{
    key: 'renderElement',
    value: function renderElement(component) {
      var props = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

      if (typeof component === 'string') {
        component = function (_param) {
          return {
            "type": "MemberExpression",
            "object": {
              "type": "Identifier",
              "name": "components"
            },
            "property": _param,
            "computed": false
          };
        }(this.build.identifier(component));
      }
      if (component === null) {
        return this.renderNothing();
      }
      if (component !== null && this.build.isIdentifier(component)) {
        if (this.identifiersUsed.indexOf(component) === -1) {
          this.identifiersUsed.push(component);
        }
      }

      for (var _len = arguments.length, children = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        children[_key - 2] = arguments[_key];
      }

      return _buildReactElement2.default.apply(undefined, [this.build, component, props].concat(children));
    }
  }, {
    key: 'renderText',
    value: function renderText(value) {
      if (value === null) {
        return this.build.nullLiteral();
      } else {
        return this.build.stringLiteral(value);
      }
    }
  }, {
    key: 'renderNothing',
    value: function renderNothing() {
      return this.build.nullLiteral();
    }

    /**
     * Stringify all footnote definitions, if any.
     *
     * @example
     *   generateFootnotes(); // '<div class="footnotes">\n<hr>\n...'
     *
     * @return {string} - Compiled footnotes, if any.
     * @this {HTMLCompiler}
     */

  }, {
    key: 'generateFootnotes',
    value: function generateFootnotes() {
      var definitions = this.footnotes;
      var index = -1;
      var results = [];

      if (!definitions.length) {
        return this.renderNothing();
      }

      while (++index < definitions.length) {
        var def = definitions[index];

        results[index] = this.listItem({
          'type': 'listItem',
          'data': {
            'htmlAttributes': {
              'id': 'fn-' + def.identifier
            }
          },
          'children': def.children.concat({
            'type': 'link',
            'url': '#fnref-' + def.identifier,
            'data': {
              'htmlAttributes': {
                'class': 'footnote-backref'
              }
            },
            'children': [{
              'type': 'text',
              'value': '↩'
            }]
          }),
          'position': def.position
        }, null);
      }

      return this.renderElement.apply(this, ['Footnotes', null].concat(results));
    }
  }, {
    key: 'break',
    value: function _break(_node) {
      return this.renderElement('Break');
    }

    /**
     * Stringify an unknown node.
     *
     * @example
     *   unknown({
     *     data: {
     *       htmlName: 'section'
     *     },
     *     children: [
     *       {
     *         type: 'text',
     *         value: 'foo'
     *       }
     *     ]
     *   }); // '<section>foo</section>'
     *
     * @param {Node} node - Node to compile.
     * @return {string} - Compiled node.
     * @this {HTMLCompiler}
     */

  }, {
    key: 'unknown',
    value: function unknown(node) {
      if (typeof node !== 'string') {
        node = JSON.stringify(node, null, 2);
      }
      var content = this.renderText(node);
      return this.renderElement('Unknown', null, content);
    }

    /**
     * Visit a node.
     *
     * @example
     *   var compiler = new Renderer();
     *
     *   compiler.visit({
     *     type: 'strong',
     *     children: [{
     *       type: 'text',
     *       value: 'Foo'
     *     }]
     *   });
     *   // '**Foo**'
     *
     * @param {Object} node - Node.
     * @param {Object?} [parent] - `node`s parent.
     * @return {string} - Compiled `node`.
     */

  }, {
    key: 'visit',
    value: function visit(node, parent) {
      var type = node && node.type;
      //$FlowIssue
      var fn = this[type];

      /*
       * Fail on non-nodes.
       */

      if (!type) {
        throw new Error('Expected node `' + JSON.stringify(node) + '`');
      }

      if (typeof fn !== 'function') {
        fn = this.unknown;
      }

      return fn.call(this, node, parent);
    }

    /**
     * Stringify the children of `node`.
     *
     * @example
     *   all({
     *     children: [
     *       {
     *         type: 'text',
     *         value: 'foo'
     *       }
     *     ]
     *   }); // 'foo'
     *
     * @param {Node} parent - Parent to visit.
     * @return {Array.<string>} - List of compiled nodes.
     * @this {HTMLCompiler}
     */

  }, {
    key: 'all',
    value: function all(parent) {
      var nodes = parent.children;
      var values = [];
      var index = -1;

      while (++index < nodes.length) {
        var value = this.visit(nodes[index], parent);
        if (value) {
          values.push(value);
        }
      }

      return values;
    }

    /**
     * Stringify a root object.
     *
     * @example
     *   // This will additionally include defined footnotes,
     *   // when applicable.
     *   root({
     *     children: [
     *       {
     *         type: 'paragraph',
     *         children: [
     *           {
     *             type: 'text',
     *             value: 'foo'
     *           }
     *         ]
     *       }
     *     ]
     *   }); // '<p>foo</p>\n'
     *
     * @param {Node} node - Node to compile.
     * @return {string} - Compiled node.
     * @this {HTMLCompiler}
     */

  }, {
    key: 'root',
    value: function root(node) {
      var _this = this;

      (0, _unistUtilVisit2.default)(node, 'definition', function (definition) {
        _this.definitions[definition.identifier.toUpperCase()] = definition;
      });

      (0, _unistUtilVisit2.default)(node, 'footnoteDefinition', function (definition) {
        _this.footnotes.push(definition);
      });

      return this.renderElement.apply(this, ['Root', null].concat(_toConsumableArray(this.all(node))));
    }

    /**
     * Stringify a block quote.
     *
     * @example
     *   blockquote({
     *     children: [
     *       {
     *         type: 'paragraph',
     *         children: [
     *           {
     *             type: 'text',
     *             value: 'foo'
     *           }
     *         ]
     *       }
     *     ]
     *   }); // '<blockquote>\n<p>foo</p>\n</blockquote>'
     *
     * @param {Node} node - Node to compile.
     * @return {string} - Compiled node.
     * @this {HTMLCompiler}
     */

  }, {
    key: 'blockquote',
    value: function blockquote(node) {
      return this.renderElement.apply(this, ['Blockquote', null].concat(_toConsumableArray(this.all(node))));
    }

    /**
     * Stringify an inline footnote.
     *
     * @example
     *   // This additionally adds a definition at the bottem
     *   // of the document.
     *   footnote({
     *     children: [
     *       {
     *         type: 'text',
     *         value: 'foo'
     *       }
     *     ]
     *   }); // '<sup id="fnref-1"><a href="#fn-1">1</a></sup>'
     *
     * @param {Node} node - Node to compile.
     * @return {string} - Compiled node.
     * @this {HTMLCompiler}
     */

  }, {
    key: 'footnote',
    value: function footnote(node) {
      var index = -1;
      var identifiers = [];

      while (++index < this.footnotes.length) {
        identifiers[index] = this.footnotes[index].identifier;
      }

      var identifier = 1;

      while (identifiers.indexOf(String(identifier)) !== -1) {
        identifier++;
      }

      identifier = String(identifier);

      this.footnotes.push({
        type: 'footnoteDefinition',
        identifier: identifier,
        children: node.children,
        position: node.position
      });

      return this.footnoteReference({
        type: 'footnoteReference',
        identifier: identifier,
        position: node.position,
        data: null
      });
    }

    /**
     * Stringify a list.
     *
     * @example
     *   list({
     *     ordered: true
     *     loose: false
     *     children: [
     *       {
     *         type: 'listItem',
     *         children: [
     *           {
     *             type: 'paragraph',
     *             children: [
     *               {
     *                 type: 'text',
     *                 value: 'foo'
     *               }
     *             ]
     *           }
     *         ]
     *       }
     *     ]
     *   }); // '<ol>\n<li>foo</li>\n</ol>'
     *
     * @param {Node} node - Node to compile.
     * @return {string} - Compiled node.
     * @this {HTMLCompiler}
     */

  }, {
    key: 'list',
    value: function list(node) {
      var component = node.ordered ? 'OrderedList' : 'UnorderedList';
      return this.renderElement.apply(this, [component, null].concat(_toConsumableArray(this.all(node))));
    }

    /**
     * Stringify a list-item.
     *
     * @example
     *   listItem({
     *     children: [
     *       {
     *         type: 'paragraph',
     *         children: [
     *           {
     *             type: 'text',
     *             value: 'foo'
     *           }
     *         ]
     *       }
     *     ]
     *   }, {
     *     loose: false
     *   }); // '<li>foo</li>'
     *
     * @param {Node} node - Node to compile.
     * @param {Node} parent - Parent of `node`.
     * @return {string} - Compiled node.
     * @this {HTMLCompiler}
     */

  }, {
    key: 'listItem',
    value: function listItem(node, parent) {
      var single = (!parent || !parent.loose) && node.children.length === 1 && 'children' in node.children[0];
      return this.renderElement.apply(this, ['ListItem', null].concat(_toConsumableArray(this.all(single ? node.children[0] : node))));
    }

    /**
     * Stringify a heading.
     *
     * @example
     *   heading({
     *     depth: 3,
     *     children: [
     *       {
     *         type: 'text',
     *         value: 'foo'
     *       }
     *     ]
     *   }); // '<h3>foo</h3>'
     *
     * @param {Node} node - Node to compile.
     * @return {string} - Compiled node.
     * @this {HTMLCompiler}
     */

  }, {
    key: 'heading',
    value: function heading(node) {
      return this.renderElement.apply(this, ['Heading', { level: node.depth }].concat(_toConsumableArray(this.all(node))));
    }

    /**
     * Stringify a paragraph.
     *
     * @example
     *   paragraph({
     *     children: [
     *       {
     *         type: 'text',
     *         value: 'foo'
     *       }
     *     ]
     *   }); // 'foo'
     *
     * @param {Node} node - Node to compile.
     * @return {string} - Compiled node.
     * @this {HTMLCompiler}
     */

  }, {
    key: 'paragraph',
    value: function paragraph(node) {
      var children = this.all(node);
      return this.renderElement.apply(this, ['Paragraph', null].concat(_toConsumableArray(children)));
    }

    /**
     * Stringify a code block.
     *
     * @example
     *   code({
     *     value: 'foo &amp; bar;'
     *   }); // '<pre><code>foo &amp;amp; bar\n</code></pre>'
     *
     * @param {Node} node - Node to compile.
     * @return {string} - Compiled node.
     * @this {HTMLCompiler}
     */

  }, {
    key: 'code',
    value: function code(node) {
      var value = node.value ? (0, _detab2.default)(node.value + '\n') : '';
      value = this.encode(value);
      value = this.renderText(value);
      return this.renderElement('Code', null, value);
    }

    /**
     * Stringify a table.
     *
     * @example
     *   table({
     *     children: [
     *       {
     *         type: 'tableRow',
     *         ...
     *       }
     *     ]
     *   }); // '<table><thead>...'
     *
     * @param {Node} node - Node to compile.
     * @return {string} - Compiled node.
     * @this {HTMLCompiler}
     */

  }, {
    key: 'table',
    value: function table(node) {
      var rows = node.children;
      var index = rows.length;
      var align = node.align;
      var alignLength = align.length;
      var result = [];

      while (index--) {
        var pos = alignLength;
        var row = rows[index].children;
        var out = [];
        var name = index === 0 ? 'TableHeaderCell' : 'TableCell';

        while (pos--) {
          var cell = row[pos];
          out[pos] = this.renderElement.apply(this, [name, { align: align[pos] }].concat(_toConsumableArray(cell ? this.all(cell) : [])));
        }

        result[index] = this.renderElement.apply(this, ['TableRow', null].concat(out));
      }

      return this.renderElement('Table', null, this.renderElement('TableHead', null, result[0]), this.renderElement.apply(this, ['TableBody', null].concat(_toConsumableArray(result.slice(1)))));
    }

    /**
     * Stringify a literal HTML.
     *
     * @example
     *   html({
     *     value: '<i>italic</i>'
     *   }); // '<i>italic</i>'
     *
     * @param {Node} node - Node to compile.
     * @return {string} - Compiled node.
     * @this {HTMLCompiler}
     */

  }, {
    key: 'html',
    value: function html(node) {
      return this.renderElement('HTML', { html: node.value });
    }

    /**
     * Stringify a horizontal rule.
     *
     * @example
     *   rule(); // '<hr>'
     *
     * @param {Node} node - Node to compile.
     * @return {string} - Compiled node.
     * @this {HTMLCompiler}
     */

  }, {
    key: 'rule',
    value: function rule(_node) {
      return this.renderElement('Rule');
    }

    /**
     * Stringify inline code.
     *
     * @example
     *   inlineCode({
     *     value: 'foo &amp; bar;'
     *   }); // '<code>foo &amp;amp; bar;</code>'
     *
     * @param {Node} node - Node to compile.
     * @return {string} - Compiled node.
     * @this {HTMLCompiler}
     */

  }, {
    key: 'inlineCode',
    value: function inlineCode(node) {
      var value = node.value;
      value = this.encode(value);
      value = (0, _collapseWhiteSpace2.default)(value);
      value = this.renderText(value);
      return this.renderElement('InlineCode', null, value);
    }

    /**
     * Stringify strongly emphasised content.
     *
     * @example
     *   strong({
     *     children: [
     *       {
     *         type: 'text',
     *         value: 'foo'
     *       }
     *     ]
     *   }); // '<strong>foo</strong>'
     *
     * @param {Node} node - Node to compile.
     * @return {string} - Compiled node.
     * @this {HTMLCompiler}
     */

  }, {
    key: 'strong',
    value: function strong(node) {
      return this.renderElement.apply(this, ['Strong', null].concat(_toConsumableArray(this.all(node))));
    }

    /**
     * Stringify emphasised content.
     *
     * @example
     *   emphasis({
     *     children: [
     *       {
     *         type: 'text',
     *         value: 'foo'
     *       }
     *     ]
     *   }); // '<em>foo</em>'
     *
     * @param {Node} node - Node to compile.
     * @return {string} - Compiled node.
     * @this {HTMLCompiler}
     */

  }, {
    key: 'emphasis',
    value: function emphasis(node) {
      return this.renderElement.apply(this, ['Emphasis', null].concat(_toConsumableArray(this.all(node))));
    }

    /**
     * Stringify an inline break.
     *
     * @example
     *   hardBreak(); // '<br>\n'
     *
     * @param {Node} node - Node to compile.
     * @return {string} - Compiled node.
     * @this {HTMLCompiler}
     */

  }, {
    key: 'hardBreak',
    value: function hardBreak(_node) {
      return this.renderElement('Break');
    }
  }, {
    key: 'thematicBreak',
    value: function thematicBreak(_node) {
      return this.renderElement('Break');
    }

    /**
     * Stringify a link.
     *
     * @example
     *   link({
     *     url: 'http://example.com',
     *     children: [
     *       {
     *         type: 'text',
     *         value: 'foo'
     *       }
     *     ]
     *   }); // '<a href="http://example.com">foo</a>'
     *
     * @param {Node} node - Node to compile.
     * @return {string} - Compiled node.
     * @this {HTMLCompiler}
     */

  }, {
    key: 'link',
    value: function link(node) {
      return this.renderElement.apply(this, ['Link', {
        href: (0, _normalizeUri2.default)(node.url || ''),
        title: node.title
      }].concat(_toConsumableArray(this.all(node))));
    }

    /**
     * Stringify a reference to a footnote.
     *
     * @example
     *   // If a definition was added previously:
     *   footnoteReference({
     *     identifier: 'foo'
     *   });
     *   // <sup id="fnref-foo">
     *   //   <a class="footnote-ref" href="#fn-foo">foo</a>
     *   // </sup>
     *
     * @param {Node} node - Node to compile.
     * @return {string} - Compiled node.
     * @this {HTMLCompiler}
     */

  }, {
    key: 'footnoteReference',
    value: function footnoteReference(node) {
      var identifier = node.identifier;

      return this.renderElement('Sup', { id: 'fnref-' + identifier }, this.renderElement('Link', {
        href: '#fn-' + identifier,
        className: 'footnote-ref'
      }, this.renderText(identifier)));
    }

    /**
     * Stringify a reference to a link.
     *
     * @example
     *   // If a definition was added previously:
     *   linkReference({
     *     identifier: 'foo'
     *   }); // '<a href="http://example.com/fav.ico"></a>'
     *
     * @param {Node} node - Node to compile.
     * @return {string} - Compiled node.
     * @this {HTMLCompiler}
     */

  }, {
    key: 'linkReference',
    value: function linkReference(node) {
      var def = this.definitions[node.identifier.toUpperCase()] || {};

      return this.renderElement.apply(this, ['Link', {
        href: (0, _normalizeUri2.default)(def.url || ''),
        title: def.title
      }].concat(_toConsumableArray(this.all(node))));
    }

    /**
     * Stringify a reference to an image.
     *
     * @example
     *   // If a definition was added previously:
     *   imageReference({
     *     identifier: 'foo'
     *   }); // '<img src="http://example.com/fav.ico" alt="">'
     *
     * @param {Node} node - Node to compile.
     * @return {string} - Compiled node.
     * @this {HTMLCompiler}
     */

  }, {
    key: 'imageReference',
    value: function imageReference(node) {
      var def = this.definitions[node.identifier.toUpperCase()] || {};

      return this.renderElement('Image', {
        src: (0, _normalizeUri2.default)(def.url || ''),
        alt: node.alt || '',
        title: def.title
      });
    }

    /**
     * Stringify an image.
     *
     * @example
     *   image({
     *     url: 'http://example.com/fav.ico'
     *   }); // '<img src="http://example.com/fav.ico" alt="">'
     *
     * @param {Node} node - Node to compile.
     * @return {string} - Compiled node.
     * @this {HTMLCompiler}
     */

  }, {
    key: 'image',
    value: function image(node) {
      return this.renderElement('Image', {
        src: (0, _normalizeUri2.default)(node.url || ''),
        alt: node.alt || '',
        title: node.title
      });
    }

    /**
     * Stringify a deletion.
     *
     * @example
     *   strikethrough({
     *     children: [
     *       {
     *         type: 'text',
     *         value: 'foo'
     *       }
     *     ]
     *   }); // '<del>foo</del>'
     *
     * @param {Node} node - Node to compile.
     * @return {string} - Compiled node.
     * @this {HTMLCompiler}
     */

  }, {
    key: 'strikethrough',
    value: function strikethrough(node) {
      return this.renderElement.apply(this, ['Strikethrough', null].concat(_toConsumableArray(this.all(node))));
    }
  }, {
    key: 'delete',
    value: function _delete(node) {
      return this.renderElement.apply(this, ['Strikethrough', null].concat(_toConsumableArray(this.all(node))));
    }

    /**
     * Stringify text.
     *
     * @example
     *   text({value: '&'}); // '&amp;'
     *
     *   text({value: 'foo'}); // 'foo'
     *
     * @param {Node} node - Node to compile.
     * @return {string} - Compiled node.
     * @this {HTMLCompiler}
     */

  }, {
    key: 'text',
    value: function text(node) {
      var value = (0, _trimLines2.default)(this.encode(node.value));
      return this.renderText(value);
    }
  }, {
    key: 'yaml',
    value: function yaml(node) {
      this.metadata = _jsYaml2.default.safeLoad(node.value);
      return this.renderNothing();
    }
  }, {
    key: 'definition',
    value: function definition(_node) {
      return this.renderNothing();
    }
  }, {
    key: 'footnoteDefinition',
    value: function footnoteDefinition(_node) {
      return this.renderNothing();
    }
  }, {
    key: 'role',
    value: function role(node) {
      var component = this.roles[node.name];
      if (component === undefined) {
        return this.unknown(node);
      } else if (component === null) {
        return this.renderNothing();
      } else {
        return this.renderElement(component, { words: node.words });
      }
    }
  }, {
    key: 'directive',
    value: function directive(node) {
      var component = this.directives[node.name];
      if (component === undefined) {
        return this.unknown(node);
      } else if (component === null) {
        return this.renderNothing();
      } else if (node.children !== undefined) {
        var props = node.data;
        if (node.line != null) {
          props = _extends({ line: node.line }, props);
        }
        return this.renderElement.apply(this, [component, props].concat(_toConsumableArray(this.all(node))));
      } else if (node.value !== undefined) {
        var _props = node.data;
        if (node.line != null) {
          _props = _extends({ line: node.line }, _props);
        }
        return this.renderElement(component, _props, this.renderText(node.value));
      } else {
        var _props2 = node.data;
        if (node.line != null) {
          _props2 = _extends({ line: node.line }, _props2);
        }
        return this.renderElement(component, _props2);
      }
    }
  }, {
    key: 'encode',
    value: function encode(value) {
      // TODO: make sure we do right here
      return value;
    }
  }, {
    key: 'render',
    value: function render(node) {
      this.expression = this.visit(node);
    }
  }]);

  return Renderer;
}();

exports.default = Renderer;
