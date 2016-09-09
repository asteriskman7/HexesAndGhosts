'use strict';

/* Copyright (c) 2016 asteriskman. All rights reserved. */
var app = {
    canvas: undefined,
    ctx: undefined,
    scene: undefined,    
    deviceReady: false,
    musicEnabled: true,
    sfxEnabled: true,
    // Application Constructor
    initialize: function() {
      app.canvas = document.getElementById('canvas_main');
      app.ctx = app.canvas.getContext('2d');
      app.resizeCanvas();
      images.loadImage('./img/logo.png', [new sprite('logo')]);
      images.loadImage('./img/button_play.png', [new sprite('button_play')]);
      images.loadImage('./img/background.jpg', [new sprite('background')]);
      images.loadImage('./img/sfx.png', [new sprite('sfx')]);
      images.loadImage('./img/music.png', [new sprite('music')]);      
      
      sounds.loadSound('./audio/bgmusic.ogg', 'bgmusic');
      sounds.loadSound('./audio/beep.wav', 'beep');
      app.changeScene('loading');
      this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        window.addEventListener('resize', this.resizeCanvas, false);
        document.body.addEventListener('touchstart', function(e){ e.preventDefault();}); //to prevent scrolling on mobile
        app.canvas.addEventListener('mousedown', app.doMouseDown, false);
        app.canvas.addEventListener('touchstart', app.doTouchStart, false);
    },
    doMouseDown: function(e) {
      var canvas_x = e.pageX;
      var canvas_y = e.pageY;      
      app.doPointAction(canvas_x, canvas_y);
    },
    doTouchStart: function(e) {
      e.preventDefault();
      var canvas_x = Math.round(e.targetTouches[0].pageX);
      var canvas_y = Math.round(e.targetTouches[0].pageY);      
      app.doPointAction(canvas_x, canvas_y);
    },
    doPointAction: function(x, y) {
      //console.log('dpa: ' + x + ',' + y);
      app.scene.doPointAction(x, y);
    },
    resizeCanvas: function() {
      app.canvas.width = window.innerWidth;
      app.canvas.height = window.innerHeight;
      app.ctx.width = app.canvas.width;
      app.ctx.height = app.canvas.height;
    },
    onDeviceReady: function() {
      console.log('device ready');
      //app.receivedEvent('deviceready');
      app.deviceReady = true;
      //navigator.splashscreen.hide();
      app.loadState();
      app.resizeCanvas();

      app.loop();
    },
    initState: function() {
    },
    loadState: function() {
      app.initState();
    },
    saveState: function() {
    },
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        //var listeningElement = parentElement.querySelector('.listening');
        //var receivedElement = parentElement.querySelector('.received');

        //listeningElement.setAttribute('style', 'display:none;');
        //receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },
    changeScene: function(name) {
      console.log('change scene to ' + name);
      if (app.scene !== undefined) {
        app.scene.save();
      }
      app.scene = scenes[name];
      app.scene.load(app.ctx);
    },
    loop: function(t) {
      var nextScene = app.scene.update(t);
      app.scene.render(t);
      app.scene.cleanup(t);
      if (nextScene !== undefined) {
        app.changeScene(nextScene);
      }
      window.requestAnimationFrame(app.loop);
    },
    toggleMusic: function() {
      app.musicEnabled = !app.musicEnabled;
      if (app.musicEnabled) {
        sounds.soundList['bgmusic'].play();
      } else {
        sounds.soundList['bgmusic'].pause();
      }
    },
    toggleSfx: function() {
      app.sfxEnabled = !app.sfxEnabled;
    }
};
