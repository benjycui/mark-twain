'use strict';

const marked = require('marked');
const YFM = require('yaml-front-matter');
const Parser = require('./parser');

module.exports = function MT(markdown) {
  const ret = {};

  const raw = YFM.loadFront(markdown);
  const tokens = marked.lexer(raw.__content);
  ret.content = Parser.parse(tokens);

  // Get meta data
  raw.__content = undefined;
  ret.meta = raw;

  return ret;
};
