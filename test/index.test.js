'use strict';

const assert = require('assert');
const fs = require('fs');
const MT = require('..');

describe('MT', () => {
  const md = fs.readFileSync('./test/test.md').toString();
  const ret = MT(md);
  console.log(JSON.stringify(ret, null, 2));

  const meta = ret.meta;

  it('should process YAML as meta data', () => {
    assert.strictEqual(meta.title, 'test');
    assert.strictEqual(
      meta.description,
      'a sample Markdown for test'
    );
  });
});
