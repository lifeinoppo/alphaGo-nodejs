var assert = require('assert');
var stream = require('stream');
var transform = require('..');

describe('markdownTransform()', function() {
  it('transforms markdown', function(done) {
    var markdown = '# Header\n* bullet 1\n* bullet 2';

    var html = '';
    readStream(markdown).pipe(transform())
      .on('data', function(chunk) {
        html += chunk.toString();
      })
      .on('end', function() {
        assert.equal(html, '<h1 id="header">Header</h1>\n<ul>\n<li>bullet 1</li>\n<li>bullet 2</li>\n</ul>\n')
        done();
      });
  });

  it('performs syntax highlighting', function(done) {
    var markdown = '```js\nvar foo=1;\n```';
    var html = '';

    readStream(markdown).pipe(transform({highlight:true}))
      .on('data', function(chunk) {
        html += chunk.toString();
      })
      .on('end', function() {
        assert.equal(html, '<pre><code class="lang-js"><span class="hljs-keyword">var</span> foo=<span class="hljs-number">1</span>;\n</code></pre>\n');
        done();
      });
  });

  it('has correct content-type', function() {
    assert.equal(transform().contentType, 'text/html');
  });
});

function readStream(str) {
  var Readable = stream.Readable;
  var rs = Readable();
  rs._read = function () {
    rs.push(str);
    rs.push(null);
  };
  return rs;
}