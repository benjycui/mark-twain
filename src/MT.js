'use strict';

const remark = require('remark')();
const YFM = require('yaml-front-matter');
const transformer = require('./transformer');

module.exports = function MT(markdown) {
  const ret = {};

  const raw = YFM.loadFront(markdown);
  const ast = remark.parse(raw.__content);
  ret.content = transformer(ast);

  // Get meta data
  delete raw.__content;
  ret.meta = raw;

  return ret;
};
