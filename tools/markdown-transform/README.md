# markdown-transform

[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][downloads-url]
[![Build Status][travis-image]][travis-url]
[![Test Coverage][coveralls-image]][coveralls-url]

Light streaming wrapper around the [marked](https://www.npmjs.com/package/marked) markdown parser. Useful for passing to APIs that expect a stream compliant interface. Note that marked itself does not support streams so the entire markdown string is buffered in memory. 

## Installation

```js
npm install markdown-transform
```

## Options

Supports passthrough of all the [marked options](https://www.npmjs.com/package/marked#options). As a shorthand, rather than passing a function to the `highlight` option, you can simply pass `true` which will perform syntax highlighting with [highlight.js](https://github.com/isagalaev/highlight.js).

## Usage 

```js
var markdownTransform = require('markdown-transform');

fs.createReadStream('README.md')
    .pipe(markdownTransform({highlight: true}))
    .pipe(process.stdout);
```

### Express middleware

```js
app.get('/readme', function(req, res, next) {
    var transform = markdownTransform({highlight: true});

    res.set('Content-Type', transform.contentType);
    fs.createReadStream('./markdown.md')
        .pipe(transform)
        .pipe(res);
});
```

### Express Api Proxy

Works seamlessly for transforming Markdown API responses to HTML with the 
[express-api-proxy](https://github.com/4front/express-api-proxy).

```js
// Express app
app.all('/proxy', require('express-api-proxy')({
   endpoints: [
        {
            pattern: /raw\.githubusercontent\.com\/.*\.md/,
            transform: require('markdown-transform')({highlight:true})
        }
   ]
}));

// Browser app
$.ajax({
	url: '/proxy',
	data: {
		url: 'https://raw.githubusercontent.com/4front/express-api-proxy/master/README.md'
	},
	success: function(data) {
		$('#readme').html(data);
	}
});
```

[npm-image]: https://img.shields.io/npm/v/markdown-transform.svg?style=flat
[npm-url]: https://npmjs.org/package/markdown-transform
[travis-image]: https://img.shields.io/travis/4front/markdown-transform.svg?style=flat
[travis-url]: https://travis-ci.org/4front/
[coveralls-image]: https://img.shields.io/coveralls/4front/markdown-transform.svg?style=flat
[coveralls-url]: https://coveralls.io/r/4front/markdown-transform?branch=master
[downloads-image]: https://img.shields.io/npm/dm/markdown-transform.svg?style=flat
[downloads-url]: https://npmjs.org/package/markdown-transform




