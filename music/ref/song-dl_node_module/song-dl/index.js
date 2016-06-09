#! /usr/bin/env node

var cli = require('cli');
var BestVideo = require('youtube-best-video');
var ytdl = require('ytdl-core');
var ffmpeg = require('fluent-ffmpeg');


var downloadSong = function(query, outputFile, key, cb) {

  getYoutubeUrl(query, key, function(err, link) {
    if(err) {
      cb && cb(err);
      return;
    }

    try {
      var stream = ytdl(link);
      ffmpeg(stream)
        .save(outputFile)
        .on('end', function() {
          cb && cb(null);
        })
        .on('error', function(err) {
          cb && cb(err);
        });
    } catch(e) {
      cb && cb(e);
    }
  });
}


var getYoutubeUrl = function(query, key, cb) {
  var bestVideo = BestVideo(key)
  bestVideo.findBestMusicVideo(query, function(err, video) {
    if(err) {
      cb(err);
    } else {
      cb(null, video.link);
    }
  });
};

if (require.main === module) {
  cli.parse({
      output: [ 'o', 'Output filename', 'file', "song.mp3"],
      key: ['k', 'Youtube API Key', 'string']
  });

  cli.main(function(args, options) {

    var query = args.join(' ');
    if(query.trim() === '') {
      console.warn('Please provide a search term.');
      process.exit();
    }

    downloadSong(query, options.output, options.key, function(err) {
      if(err) {
        console.log(err);
      }
    });
  });
} else {
  // expose functions if this file has been
  // required from elsewhere
  module.exports = downloadSong;
}
