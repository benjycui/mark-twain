'use strict';

module.exports = function transformer(node) {
  if (node == null) return;

  if (Array.isArray(node)) {
    return node.map(transformer);
  }

  const transformedChildren = transformer(node.children);

  switch (node.type) {
    case 'root':
      return ['article'].concat(transformedChildren);
    case 'heading':
      return [`h${node.depth}`].concat(transformedChildren);
    case 'text':
      return node.value;
    case 'list':
      return [node.ordered ? 'ol' : 'ul'].concat(transformedChildren);
    case 'listItem':
      return ['li'].concat(transformedChildren);
    case 'paragraph':
      return ['p'].concat(transformedChildren);
    case 'link':
      return ['a', {
        title: node.title,
        href: node.url,
      }].concat(transformedChildren);
    case 'image':
      return ['img', {
        title: node.title,
        src: node.url,
        alt: node.alt,
      }];
    case 'table':
      return ['table'].concat(transformedChildren);
    case 'tableRow':
      return ['tr'].concat(transformedChildren);
    case 'tableCell':
      return ['td'].concat(transformedChildren);
    case 'emphasis':
      return ['em'].concat(transformedChildren);
    case 'strong':
      return ['strong'].concat(transformedChildren);
    case 'inlineCode':
      return ['code', node.value];
    case 'code':
      return ['pre', { lang: node.lang }, ['code', node.value]];
    case 'blockquote':
      return ['blockquote'].concat(transformedChildren);
    case 'thematicBreak':
      return ['hr'];
    case 'html':
      return ['innerHTML', node.value];
    default:
      return node;
  }
};
