'use strict';

var _babelGenerator = require('babel-generator');

var _babelGenerator2 = _interopRequireDefault(_babelGenerator);

var _loaderUtils = require('loader-utils');

var _loaderUtils2 = _interopRequireDefault(_loaderUtils);

var _parse = require('./parse');

var _parse2 = _interopRequireDefault(_parse);

var _unistUtilVisit = require('unist-util-visit');

var _unistUtilVisit2 = _interopRequireDefault(_unistUtilVisit);

var _render = require('./render');

var _Config = require('./Config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Webpack loader for reactdown documents.
 */
/**
 * @copyright 2016-present, Reactdown Team
 * 
 */

function reactdown(source) {
  this.cacheable();

  var config = completeConfig(this._compiler, this.query);

  var mdast = toMDAST(config, source);
  resolveImages(config, this, mdast); // Mutates mdast.

  var jsast = toJSAST(config, mdast);
  var compiledSource = toSource(jsast);
  return unwrapUrls(compiledSource);
}

function completeConfig(compiler, query) {
  // We read the config once. That means on changes to config one must restart
  // the compiler.
  //
  // TODO: Improve on that, so changes to configration do not require restarting
  // Webpack compiler.
  if (compiler.__reactdownConfig === undefined) {
    // TODO: Error handling
    // https://github.com/andreypopp/reactdown/pull/16/files#diff-821a16d38cf4ff69edc6b5b48313aa0bR67
    compiler.__reactdownConfig = (0, _Config.findConfig)(compiler.context).config;
  }

  return (0, _Config.mergeConfig)(compiler.__reactdownConfig, (0, _Config.parseConfigFromQuery)(query));
}

function toMDAST(config, source) {
  var parseConfig = (0, _Config.toParseConfig)(config);
  // TODO: Error handling
  // https://github.com/andreypopp/reactdown/pull/16/files#diff-821a16d38cf4ff69edc6b5b48313aa0bR49
  return (0, _parse2.default)(source, parseConfig);
}

// Please note: This mutates the URL of any images in the MDAST!
function resolveImages(config, loader, mdast) {
  (0, _unistUtilVisit2.default)(mdast, 'image', function (image) {
    // Ignore remote URLs, either `scheme://` or `//`
    if (/^[^\/]+\/\//.test(image.url)) return;
    image.url = wrapUrl(_loaderUtils2.default.urlToRequest(image.url));
  });
}

function toJSAST(config, mdast) {
  var renderConfig = (0, _Config.toRenderConfig)(config);
  // TODO: Error handling
  // ???
  return (0, _render.renderToProgram)(mdast, renderConfig);
}

function toSource(jsast) {
  return (0, _babelGenerator2.default)(jsast, {
    compact: false,
    concise: false
  }).code;
}

// Webpack loaders can't resolve downstream loaders inline.  Instead, they're
// expected to emit calls to `require()`.  In order to avoid jumping through
// JSAST hoops, we transform URLs in the MDAST, and then find/replace them with
// require statements in the generated source.  This is the same strategy
// employed by Webpack's css-loader.
function wrapUrl(url) {
  return '___RD_URL___' + url + '___END_RD_URL___';
}

function unwrapUrls(source) {
  return source.replace(new RegExp('"___RD_URL___([^"]+)___END_RD_URL___"', 'g'), function (_match, resolvedPath) {
    return 'require("' + resolvedPath + '")';
  });
}

module.exports = reactdown;
