var through = require('through2');
var marked = require('marked');
var highlightJs = require('highlight.js');

module.exports = function(options) {
  if (!options)
    options = {};

  if (options.highlight === true) {
    options.highlight = function (code) {
      return highlightJs.highlightAuto(code).value;
    };
  }

  var md = '';
  var writeFn = function(chunk, enc, callback) {
    md += chunk;
    callback();
  };

  var endFn = function(callback) {
    var self = this;
    var html = marked(md, options);

    self.push(html);
    self.push(null);
    callback();
  };

  var transform = through.obj(writeFn, endFn);
  transform.contentType = 'text/html';

  return transform;
};