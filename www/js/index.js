/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    ctx: undefined,
    img: undefined,
    audio: undefined,
    // Application Constructor
    initialize: function() {
      var canvas = document.getElementById('canvas_main');
      app.ctx = canvas.getContext('2d');
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      this.bindEvents();
      app.img = new Image();
      app.img.src = 'img/ufo.png';
      app.audio = new Audio('beep.wav');

      app.resizeCanvas();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        window.addEventListener('resize', this.resizeCanvas, false);
        document.body.addEventListener('touchstart', function(e){ e.preventDefault();}); //to prevent scrolling on mobile
        document.getElementById('canvas_main').addEventListener('mousedown', app.doMouseDown, false);
        document.getElementById('canvas_main').addEventListener('touchstart', app.doTouchStart, false);

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
      app.ctx.drawImage(app.img, x, y);
      app.audio.currentTime = 0;
      app.audio.play();
    },
    resizeCanvas: function() {
      var canvas = document.getElementById('canvas_main');
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      console.log("RESIZE");

      app.ctx.fillStyle = "#FF0000";
      app.ctx.fillRect(20,20,canvas.width-40,canvas.height-40);
      app.ctx.font = "30px Arial";
      app.ctx.fillStyle = "#000000";
      app.ctx.fillText(canvas.width + ' x ' + canvas.height, 50, 50);
      app.ctx.drawImage(app.img, 0, 0);

    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
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
