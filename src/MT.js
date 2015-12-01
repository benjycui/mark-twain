'use strict';

const marked = require('marked');
const Parser = require('./parser');

module.exports = function MT(markdown) {
  const tokens = marked.lexer(markdown);
  return Parser.parse(tokens);
};
