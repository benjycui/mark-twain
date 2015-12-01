'use strict';

const assert = require('assert');
const fs = require('fs');
const MT = require('..');

describe('MT', function() {
  const md = fs.readFileSync('./test/test.md');
  const elements = MT(md.toString());
  console.log(JSON.stringify(elements, null, 2));

  it('should process headers correctly', function() {
    assert.strictEqual(elements[0].type, 'h1');
    assert.strictEqual(elements[1].type, 'h2');
    assert.strictEqual(elements[2].type, 'h3');
    assert.strictEqual(elements[3].type, 'h4');
    assert.strictEqual(elements[4].type, 'h5');
    assert.strictEqual(elements[5].type, 'h6');

    assert.strictEqual(elements[0].children, 'H1');
  });

  it('should process lists correctly', function() {
    const ol = elements[6];
    assert.strictEqual(ol.type, 'ol');
    assert.strictEqual(ol.children[0].type, 'li');
    assert.strictEqual(ol.children[1].children[0].type, 'span');
    assert.strictEqual(ol.children[2].children[0].children, 'Third');

    const ul = elements[7];
    assert.strictEqual(ul.type, 'ul');
    assert.strictEqual(ul.children.length, 3);
  });
});
