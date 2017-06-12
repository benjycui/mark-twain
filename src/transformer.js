'use strict';

const JsonML = require('jsonml.js/lib/dom');

let isTHead = false;
function transformTHead(node) {
  const transformedNode = transformer(node);
  isTHead = false;
  return transformedNode;
}

function transformer(node) {
  if (node == null) return;

  if (Array.isArray(node)) {
    return node.map(transformer);
  }

  const transformedChildren = node.type === 'table' ?
          transformer(node.children.slice(1)) :
          transformer(node.children);
  switch (node.type) {
    case 'root':
      return [ 'article' ].concat(transformedChildren);
    case 'heading':
      return [ `h${node.depth}` ].concat(transformedChildren);
    case 'text':
      return node.value;
    case 'list':
      return [ node.ordered ? 'ol' : 'ul' ].concat(transformedChildren);
    case 'listItem':
      return [ 'li' ].concat(transformedChildren);
    case 'paragraph':
      return [ 'p' ].concat(transformedChildren);
    case 'link':
      return [ 'a', {
        title: node.title,
        href: node.url,
      }].concat(transformedChildren);
    case 'image':
      return [ 'img', {
        title: node.title,
        src: node.url,
        alt: node.alt,
      }];
    case 'table':
      isTHead = true;
      return [
        'table',
        [ 'thead', transformTHead(node.children[0]) ],
        [ 'tbody' ].concat(transformedChildren),
      ];
    case 'tableRow':
      return [ 'tr' ].concat(transformedChildren);
    case 'tableCell':
      return [ isTHead ? 'th' : 'td' ].concat(transformedChildren);
    case 'emphasis':
      return [ 'em' ].concat(transformedChildren);
    case 'strong':
      return [ 'strong' ].concat(transformedChildren);
    case 'inlineCode':
      return [ 'code', node.value ];
    case 'code':
      return [ 'pre', { lang: node.lang }, [ 'code', node.value ]];
    case 'blockquote':
      return [ 'blockquote' ].concat(transformedChildren);
    case 'break':
      return [ 'br' ];
    case 'thematicBreak':
      return [ 'hr' ];
    case 'html':
      return JsonML.fromHTMLText(node.value);
    case 'linkReference':
      return [ 'span' ].concat(transformedChildren);
    default:
      return node;
  }
}

module.exports = transformer;
