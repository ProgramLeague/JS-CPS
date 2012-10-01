var util = require('util');
var escodegen = require('escodegen');

var meta = require('./package.json');
var parser = require('./lib/parser');
var helpers = require('./lib/helpers');
  
var header = '/* Generated by Continuation.js v' + meta.version + ' */\n';

exports.transform = function (code, options) {
  if (!options) {
    options = {};
  }
  
  var indent = '  ';
  if (options.tabIndent) {
    indent = '\t';
  } else if (options.indentSpaces) {
    indent = Array(options.indentSpaces + 1).join(c);
  }
  
  helpers.reset();
  var ast = parser.parse(code);
  ast.normalize();
  //console.error(util.inspect(ast, false, null, true));
  ast.transform();
  //console.error(util.inspect(ast, false, null, true));

  //ast = escodegen.attachComments(ast, ast.comments, ast.tokens);
  var code = escodegen.generate(ast, {
    format: {
      indent: {
        style: indent,
        base: 0
      },
    },
    comment: true,
  });
  
  return header + code;
};
