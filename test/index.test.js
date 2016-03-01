'use strict';

const assert = require('assert');
const fs = require('fs');
const MT = require('..');

describe('MT', () => {
  const md = fs.readFileSync('./test/test.md');
  const ret = MT(md.toString());
  console.log(JSON.stringify(ret, null, 2));

  const meta = ret.meta;
  const content = ret.content;

  it('should process YAML as meta data', () => {
    assert.strictEqual(meta.title, 'test');
    assert.strictEqual(
      meta.description,
      'a sample Markdown for test'
    );
  });

  it('should process headers correctly', () => {
    assert.strictEqual(content[0].type, 'h1');
    assert.strictEqual(content[1].type, 'h2');
    assert.strictEqual(content[2].type, 'h3');
    assert.strictEqual(content[3].type, 'h4');
    assert.strictEqual(content[4].type, 'h5');
    assert.strictEqual(content[5].type, 'h6');

    assert.strictEqual(content[0].children, 'H1');
  });

  it('should process lists correctly', () => {
    const ol = content[6];
    assert.strictEqual(ol.type, 'ol');
    assert.strictEqual(ol.children[0].type, 'li');
    assert.strictEqual(ol.children[0].children, 'First');

    const ul = content[7];
    assert.strictEqual(ul.type, 'ul');
    assert.strictEqual(ul.children.length, 3);
    assert.strictEqual(ul.children[1].children, '<a href="www.something.com">Something</a>');
    assert.strictEqual(ul.children[2].children, '<img src="www.comething.com/img" alt="Somethong">');
  });

  it('should process nested list correctly', () => {
    const ol = content[8];
    const firstChild = ol.children[0];
    const parent = firstChild.children[0];
    const children = firstChild.children[1].children[0];
    assert.strictEqual(parent, 'Parent');
    assert.strictEqual(children.children, 'Children');
  });

  it('should process table correctly', () => {
    const table = content[9];
    assert.strictEqual(table.type, 'table');
    assert.strictEqual(table.children.length, 2);

    const theadRow = table.children[0].children[0];
    assert.strictEqual(theadRow.children[0].children, 'hello');
    assert.strictEqual(theadRow.children[1].children, 'world');

    const tbodyRow = table.children[1].children[0];
    assert.strictEqual(tbodyRow.children[0].children, '你好');
    assert.strictEqual(tbodyRow.children[1].children, '世界');
  });
});
