# Mark Twain

It is not easy to process Markdown directly. However, we can use `mark-twain` to parse a Markdown file(and YAML which in it) into a JavaScript object which is easier to process.

## Installation

```bash
npm install mark-twain
```

## Usage

```js
const MT = require('mark-twain');
const fs = require('fs');
const mdData = MT(fs.readFileSync('something.md').toString());
```

The returned value of `MT` would be something like this:

```js
{
  // YAML will be parsed as meta data.
  meta: {
    title: 'Title',
    ...
  },

  // Others will be parsed as a tree
  content: [{
    type: 'h1',
    children: 'heading'
   }, {
    type: 'ul',
    children: [{
      type: 'li',
      children: [{
        type: 'span',
        children: 'Bla bla ...'
      }]
    }]
   }, {
    type: 'hr'
   }, {
    type: 'p',
    children: 'Bla bla ...'
  }]
}
```

## Liscence

MIT
