/* Copyright (c) 2016 asteriskman. All rights reserved.
 */
var app = {
    canvas: undefined,
    ctx: undefined,
    // Application Constructor
    initialize: function() {
      app.canvas = document.getElementById('canvas_main');
      app.ctx = app.canvas.getContext('2d');
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
      canvas_x = e.pageX;
      canvas_y = e.pageY;
      app.ctx.fillText(canvas_x + ' , ' + canvas_y, 100, 100);
      app.doPointAction(canvas_x, canvas_y);
    },
    doTouchStart: function(e) {
      e.preventDefault();
      canvas_x = Math.round(e.targetTouches[0].pageX);
      canvas_y = Math.round(e.targetTouches[0].pageY);
      app.ctx.fillText(canvas_x + ' , ' + canvas_y, 100, 100);
      app.doPointAction(canvas_x, canvas_y);
    },
    doPointAction: function(x, y) {
      console.log('dpa: ' + x + ',' + y);
      //app.ctx.drawImage(app.img, x, y);
      //app.audio.currentTime = 0;
      //app.audio.play();
    },
    resizeCanvas: function() {
      app.canvas.width = window.innerWidth;
      app.canvas.height = window.innerHeight;

      app.ctx.fillStyle = "#FF0000";
      app.ctx.fillRect(20,20,app.canvas.width-40,app.canvas.height-40);
      app.ctx.font = "30px Arial";
      app.ctx.fillStyle = "#000000";
      app.ctx.fillText(app.canvas.width + ' x ' + app.canvas.height, 50, 50);
      //app.ctx.drawImage(app.img, 0, 0);

    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
      //app.receivedEvent('deviceready');
      app.resizeCanvas();
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        //var listeningElement = parentElement.querySelector('.listening');
        //var receivedElement = parentElement.querySelector('.received');

        //listeningElement.setAttribute('style', 'display:none;');
        //receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};
