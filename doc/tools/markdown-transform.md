var markdownTransform = require('markdown-transform');
 
fs.createReadStream('README.md')
    .pipe(markdownTransform({highlight: true}))
    .pipe(process.stdout);
