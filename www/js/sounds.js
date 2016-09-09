'use strict';

var debug;

var sound = function(aud, name) {
  this.aud = aud;
  this.name = name;
};

var sounds = {
  loadingCount: 0,
  soundList: {},
  loadSound: function(url, name) {
    var newAudio = new Audio();
    newAudio.addEventListener('loadeddata', function() {sounds._loadCallback(newAudio, name)});
    console.log('loading ' + url);
    this.loadingCount += 1;
    newAudio.src = url;
    debug=newAudio;
  },
  _loadCallback: function(aud, name) {
    console.log('finished ' + aud.src);
    sounds.soundList[name] = aud;
    sounds.loadingCount -= 1;
  }
};
