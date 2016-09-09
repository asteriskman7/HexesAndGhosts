'use strict';

/* Copyright (c) 2016 asteriskman. All rights reserved. */

var scenes = {};

scenes.loading = {
  objects: [],
  save: function() {
  },
  load: function(ctx) {
    this.ctx = ctx;
  },
  update: function(t) {
    console.log('loading update');
    if (images.loadingCount === 0 && app.deviceReady && sounds.loadingCount === 0) {
      console.log('loading finished');
      return('title');
    } else {
      console.log(images.loadingCount + ' , ' + app.deviceReady + ' , ' + sounds.loadingCount);
    }
  },
  render: function(t) {
    this.ctx.save();
    this.ctx.font = '64pt Arial';
    this.ctx.fillStyle = '#F00000';
    this.ctx.fillText('Loading', 100, 100);
    this.ctx.restore();
  },
  cleanup: function(t) {
  },
  doPointAction: function(x, y) { }
};

scenes.title = {
  objects: [],
  save: function() {},
  load: function(ctx) {
    this.ctx = ctx;
    var playButtonSize = images.getImgSize('button_play');
    this.objects.push(new objects.button(this.ctx, 'button_play', this.ctx.width * 0.5 - playButtonSize.w * 0.5, 
      this.ctx.height * 0.5 - playButtonSize.h * 0.5, 
      function(){
      app.changeScene('game');
      sounds.soundList['beep'].play();
    }));
    this.objects.push(new objects.button(this.ctx, 'sfx', 10, this.ctx.height * 0.5 - images.getImgSize('sfx').h * 0.5, app.toogleSfx));
    this.objects.push(new objects.button(this.ctx, 'music', this.ctx.width - 10 - images.getImgSize('music').w, this.ctx.height * 0.5 - images.getImgSize('music').h * 0.5, app.toggleMusic));
    
    sounds.soundList['bgmusic'].loop = true;
    sounds.soundList['bgmusic'].play();

  },
  update: function(t) {
    this.objects.forEach(function(v) {
      v.update(t);
    });
  },
  render: function(t) {
    this.ctx.save();
    this.ctx.fillStyle = '#000000';
    this.ctx.fillRect(0,0,this.ctx.width, this.ctx.height);
    images.draw(this.ctx, 'logo', 0, 0, this.ctx.width, this.ctx.height);
    this.ctx.restore();
    this.objects.forEach(function(v) {
      v.render(t);
    });
  },
  cleanup: function(t) {},
  doPointAction: function(x, y) {
    this.objects.forEach(function(v) {
      v.doPointAction(x, y);
    });
  }
};

scenes.game = {
  objects: [],
  save: function() {},
  load: function(ctx) {
    this.ctx = ctx;
    this.objects.push(new objects.background(this.ctx, 'background'));
    this.objects.push(new objects.gameBoard(this.ctx));
  },
  update: function(t) {
    this.objects.forEach(function(v) {
      v.update(t);
    });
  },
  render: function(t) {
    this.ctx.save();
    this.ctx.clearRect(0, 0, this.ctx.width, this.ctx.height);
    this.ctx.restore();
    this.objects.forEach(function(v) {
      v.render(t);
    });
  },
  cleanup: function(t) {},
  doPointAction: function(x, y) {
  }
};
