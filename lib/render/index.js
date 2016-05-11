'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /**
                                                                                                                                                                                                                                                                   * @copyright 2016-present, Reactdown Team
                                                                                                                                                                                                                                                                   * 
                                                                                                                                                                                                                                                                   */

exports.renderToProgram = renderToProgram;
exports.renderToParts = renderToParts;

var _babelTypes = require('babel-types');

var build = _interopRequireWildcard(_babelTypes);

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _Renderer = require('./Renderer');

var _Renderer2 = _interopRequireDefault(_Renderer);

var _buildJSON = require('./buildJSON');

var _buildJSON2 = _interopRequireDefault(_buildJSON);

var _toc = require('../model/toc');

var _toc2 = _interopRequireDefault(_toc);

var _title = require('../model/title');

var _title2 = _interopRequireDefault(_title);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var defaultRendererConfig = {
  build: build,
  directives: {},
  roles: {}
};

var defaultRenderConfig = {
  build: build,
  components: null,
  directives: {},
  roles: {},
  model: { toc: _toc2.default, title: _title2.default }
};

function applyDefaultConfig(config, defaultConfig) {
  if (config !== defaultConfig) {
    config = _extends({}, defaultConfig, config, {
      directives: _extends({}, defaultConfig.directives, config.directives),
      roles: _extends({}, defaultConfig.roles, config.roles)
    });
  }
  return config;
}

function keyMirrorToJSAST(build, obj) {
  var result = {};
  for (var key in obj) {
    if (typeof obj[key] === 'string') {
      result[key] = build.stringLiteral(obj[key]);
    } else {
      result[key] = build.identifier(key);
    }
  }
  return result;
}

function renderToProgram(node) {
  var config = arguments.length <= 1 || arguments[1] === undefined ? defaultRenderConfig : arguments[1];

  config = applyDefaultConfig(config, defaultRenderConfig);
  var _config = config;
  var build = _config.build;
  var components = _config.components;
  var directives = _config.directives;
  var roles = _config.roles;

  var rendererConfig = {
    build: build,
    directives: _extends({}, keyMirrorToJSAST(build, directives), {
      meta: function () {
        return {
          "type": "MemberExpression",
          "object": {
            "type": "Identifier",
            "name": "defaultDirectives"
          },
          "property": {
            "type": "Identifier",
            "name": "meta"
          },
          "computed": false
        };
      }(),
      ref: function () {
        return {
          "type": "MemberExpression",
          "object": {
            "type": "Identifier",
            "name": "defaultDirectives"
          },
          "property": {
            "type": "Identifier",
            "name": "ref"
          },
          "computed": false
        };
      }()
    }),
    roles: keyMirrorToJSAST(build, roles)
  };

  var _renderToParts = renderToParts(node, rendererConfig);

  var expression = _renderToParts.expression;
  var identifiersUsed = _renderToParts.identifiersUsed;
  var metadata = _renderToParts.metadata;


  var model = {};

  for (var attr in config.model) {
    if (config.model.hasOwnProperty(attr)) {
      model[attr] = config.model[attr](node);
    }
  }

  expression = function (_param) {
    return {
      "type": "CallExpression",
      "callee": {
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
      },
      "arguments": [{
        "type": "Identifier",
        "name": "DocumentContext"
      }, {
        "type": "ObjectExpression",
        "properties": [{
          "type": "ObjectProperty",
          "method": false,
          "shorthand": false,
          "computed": false,
          "key": {
            "type": "Identifier",
            "name": "context"
          },
          "value": {
            "type": "ObjectExpression",
            "properties": [{
              "type": "ObjectProperty",
              "method": false,
              "shorthand": true,
              "computed": false,
              "key": {
                "type": "Identifier",
                "name": "metadata"
              },
              "value": {
                "type": "Identifier",
                "name": "metadata"
              },
              "extra": {
                "shorthand": true
              }
            }, {
              "type": "ObjectProperty",
              "method": false,
              "shorthand": true,
              "computed": false,
              "key": {
                "type": "Identifier",
                "name": "model"
              },
              "value": {
                "type": "Identifier",
                "name": "model"
              },
              "extra": {
                "shorthand": true
              }
            }]
          }
        }]
      }, _param]
    };
  }(expression);

  var statements = function (_param2, _param3, _param4) {
    return [{
      "type": "ExportDefaultDeclaration",
      "declaration": {
        "type": "FunctionDeclaration",
        "id": {
          "type": "Identifier",
          "name": "Document"
        },
        "generator": false,
        "expression": false,
        "async": false,
        "params": [],
        "body": {
          "type": "BlockStatement",
          "body": [{
            "type": "ReturnStatement",
            "argument": _param2
          }],
          "directives": []
        }
      }
    }, {
      "type": "ExportNamedDeclaration",
      "specifiers": [],
      "source": null,
      "declaration": {
        "type": "VariableDeclaration",
        "declarations": [{
          "type": "VariableDeclarator",
          "id": {
            "type": "Identifier",
            "name": "metadata"
          },
          "init": _param3
        }],
        "kind": "let"
      },
      "exportKind": "value"
    }, {
      "type": "ExportNamedDeclaration",
      "specifiers": [],
      "source": null,
      "declaration": {
        "type": "VariableDeclaration",
        "declarations": [{
          "type": "VariableDeclarator",
          "id": {
            "type": "Identifier",
            "name": "model"
          },
          "init": _param4
        }],
        "kind": "let"
      },
      "exportKind": "value"
    }];
  }(expression, (0, _buildJSON2.default)(build, metadata), (0, _buildJSON2.default)(build, model));

  identifiersUsed.forEach(function (identifier) {
    var spec = directives[identifier.name] || roles[identifier.name];
    (0, _invariant2.default)(spec !== undefined, 'Cannot resolve identifier to spec');
    if (typeof spec === 'string') {
      return;
    }
    if (spec.name === 'default') {
      statements.unshift(function (_param5, _param6) {
        return {
          "type": "ImportDeclaration",
          "specifiers": [{
            "type": "ImportDefaultSpecifier",
            "local": _param5
          }],
          "importKind": "value",
          "source": _param6
        };
      }(identifier, build.stringLiteral(spec.source)));
    } else {
      statements.unshift(function (_param7, _param8, _param9) {
        return {
          "type": "ImportDeclaration",
          "specifiers": [{
            "type": "ImportSpecifier",
            "imported": _param7,
            "local": _param8
          }],
          "importKind": "value",
          "source": _param9
        };
      }(build.identifier(spec.name), identifier, build.stringLiteral(spec.source)));
    }
  });

  var prelude = function () {
    return [{
      "type": "ImportDeclaration",
      "specifiers": [{
        "type": "ImportDefaultSpecifier",
        "local": {
          "type": "Identifier",
          "name": "React"
        }
      }],
      "importKind": "value",
      "source": {
        "type": "StringLiteral",
        "extra": {
          "rawValue": "react",
          "raw": "\"react\""
        },
        "value": "react"
      }
    }, {
      "type": "ImportDeclaration",
      "specifiers": [{
        "type": "ImportSpecifier",
        "imported": {
          "type": "Identifier",
          "name": "DocumentContext"
        },
        "local": {
          "type": "Identifier",
          "name": "DocumentContext"
        }
      }, {
        "type": "ImportSpecifier",
        "imported": {
          "type": "Identifier",
          "name": "directives"
        },
        "local": {
          "type": "Identifier",
          "name": "defaultDirectives"
        }
      }, {
        "type": "ImportSpecifier",
        "imported": {
          "type": "Identifier",
          "name": "components"
        },
        "local": {
          "type": "Identifier",
          "name": "defaultComponents"
        }
      }],
      "importKind": "value",
      "source": {
        "type": "StringLiteral",
        "extra": {
          "rawValue": "reactdown/runtime",
          "raw": "\"reactdown/runtime\""
        },
        "value": "reactdown/runtime"
      }
    }];
  }();

  if (components) {
    prelude = prelude.concat(function (_param10) {
      return [{
        "type": "ImportDeclaration",
        "specifiers": [{
          "type": "ImportNamespaceSpecifier",
          "local": {
            "type": "Identifier",
            "name": "customComponents"
          }
        }],
        "importKind": "value",
        "source": _param10
      }, {
        "type": "VariableDeclaration",
        "declarations": [{
          "type": "VariableDeclarator",
          "id": {
            "type": "Identifier",
            "name": "components"
          },
          "init": {
            "type": "ObjectExpression",
            "properties": [{
              "type": "SpreadProperty",
              "argument": {
                "type": "Identifier",
                "name": "defaultComponents"
              }
            }, {
              "type": "SpreadProperty",
              "argument": {
                "type": "Identifier",
                "name": "customComponents"
              }
            }]
          }
        }],
        "kind": "let"
      }];
    }(build.stringLiteral(components)));
  } else {
    prelude = prelude.concat(function () {
      return {
        "type": "VariableDeclaration",
        "declarations": [{
          "type": "VariableDeclarator",
          "id": {
            "type": "Identifier",
            "name": "components"
          },
          "init": {
            "type": "Identifier",
            "name": "defaultComponents"
          }
        }],
        "kind": "let"
      };
    }());
  }

  return build.program(prelude.concat(statements));
}

function renderToParts(node) {
  var config = arguments.length <= 1 || arguments[1] === undefined ? defaultRendererConfig : arguments[1];

  config = applyDefaultConfig(config, defaultRendererConfig);
  var renderer = new _Renderer2.default(config);
  renderer.render(node);
  (0, _invariant2.default)(renderer.expression != null, 'Renderer should result in a not null expression after render() call');
  return {
    expression: renderer.expression,
    identifiersUsed: renderer.identifiersUsed,
    metadata: renderer.metadata
  };
}
