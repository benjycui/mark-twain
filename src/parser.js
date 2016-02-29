'use strict';

const marked = require('marked');

class Parser {
  // @Private
  constructor() {
    this.tokens = [];
    this.token = null;
    this.links = null;
  }

  static parse(tokens) {
    const parser = new Parser();
    return parser.parse(tokens);
  }

  parse(tokens) {
    this.tokens = tokens.reverse();
    this.links = tokens.links;

    const content = [];
    while (this.next()) {
      const element = this.parseElement();
      if (element === null) continue;
      content.push(element);
    }

    return content;
  }

  next() {
    return this.token = this.tokens.pop();
  }

  peek() {
    return this.tokens[this.tokens.length - 1] || 0;
  }

  parseElement() {
    const token = this.token;
    switch (token.type) {
      case 'hr': return {type: 'hr'};
      case 'heading': return this.parseHeading(token);
      case 'code': return this.parseCode(token);
      case 'table': return null; // TODO
      case 'blockquote_start': return this.parseBlockquote(token);
      case 'list_start': return this.parseList(token);
      case 'list_item_start': return this.parseListItem(token);
      case 'loose_item_start': return this.parseLooseItem(token);
      case 'html': return {type: 'html', children: token.text};
      case 'paragraph': return this.parseParagraph(token);
      case 'text': return this.parseText(token);
      default: return null;
    }
  }

  parseHeading(token) {
    return {type: 'h' + token.depth, children: token.text};
  }

  parseCode(token) {
    return {
      type: 'code',
      props: {lang: token.lang},
      children: token.text,
    };
  }

  parseBlockquote() {
    const blockquote = {
      type: 'blockquote',
      children: [],
    };

    while (this.next().type !== 'blockquote_end') {
      blockquote.children.push(this.parseElement());
    }

    return blockquote;
  }

  parseList(token) {
    const list = {
      type: token.ordered ? 'ol' : 'ul',
      children: [],
    };

    while (this.next().type !== 'list_end') {
      list.children.push(this.parseElement());
    }

    return list;
  }

  parseListItem() {
    const listItem = {
      type: 'li',
      children: [],
    };

    while (this.next().type !== 'list_item_end') {
      const child = this.token.type === 'text' ?
              this.token.text :
              this.parseElement();
      if (child !== null) {
        listItem.children.push(child);
      }
    }

    // If there is just only one text child, just set it instead of store into array.
    if (listItem.children.length === 1 && typeof listItem.children[0] === 'string') {
      listItem.children = marked.inlineLexer(listItem.children[0], this.links);
    }

    return listItem;
  }

  parseLooseItem() {
    const looseItem = {
      type: 'li',
      children: [],
    };

    while (this.next().type !== 'list_item_end') {
      looseItem.children.push(this.parseElement());
    }

    return looseItem;
  }

  parseParagraph(token) {
    return {
      type: 'p',
      children: marked.inlineLexer(token.text, this.links), // TODO
    };
  }

  parseText(token) {
    let text = token.text;

    while (this.peek().type === 'text') {
      text += '\n' + this.next().text;
    }

    return {
      type: 'span',
      children: marked.inlineLexer(text, this.links), // TODO
    };
  }
}

module.exports = Parser;
