# Mark Twain

[![](https://img.shields.io/travis/benjycui/mark-twain.svg?style=flat-square)](https://travis-ci.org/benjycui/mark-twain)
[![npm package](https://img.shields.io/npm/v/mark-twain.svg?style=flat-square)](https://www.npmjs.org/package/mark-twain)
[![NPM downloads](http://img.shields.io/npm/dm/mark-twain.svg?style=flat-square)](https://npmjs.org/package/mark-twain)
[![Dependency Status](https://david-dm.org/benjycui/mark-twain.svg?style=flat-square)](https://david-dm.org/benjycui/mark-twain)

It is not easy to process Markdown directly. However, we can use `mark-twain` to parse a Markdown file(and YAML/HTML which in it) into [JsonML](http://www.jsonml.org/) which is easier to process.

## Installation

```bash
npm install mark-twain
```

## Usage

```js
const MT = require('mark-twain');
const fs = require('fs');
const jsonML = MT(fs.readFileSync('something.md').toString());
```

The returned value of `MT` would be JsonML, something looks like this:

```js
{
  // YAML will be parsed as meta data.
  meta: {
    title: 'Title',
    ...
  },

  // Others will be parsed as JsonML.
  content:  [
    "article",
    ["h1", "Here is a heading"],
    [
      "ol",
      [
        "li",
        [
          "p",
          "First"
        ]
      ],
      ...
    ],
    [
      "p",
      "This is a paragraph, including ",
      [
        "em",
        "EM"
      ],
      " and ",
      [
        "strong",
        "STRONG"
      ],
      ". Any question? Oh, I almost forget ",
      [
        "code",
        "inline code"
      ],
      "."
    ],
    ...
  ]
}
```

## Relative

* [jsonml-to-react-component](https://github.com/benjycui/jsonml-to-react-component) To convert JsonML to React Component.
* [jsonml.js](https://github.com/benjycui/jsonml.js) A collection of JsonML tools.

## Liscence

MIT
