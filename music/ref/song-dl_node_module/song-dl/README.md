# song-dl
download the best matching song from youtube

NOTE - requires `ffmpeg` (on osx install with `brew install ffmpeg`)

## usage

### command line

```js
$ npm intall -g song-dl
$ sdl "song name and artist" -o outputfile.mp3 -k <YOUTUBE API KEY>
$ open outputfile.mp3
```

### node

```js
var sdl = require('song-dl');

sdl('songname and artist', 'output filename', 'youtube apikey', function(err) {
    if(!err) {
      console.log('download success');
    }
});
```
