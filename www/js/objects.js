'use strict';

var objects = {};

objects.button = function(ctx, image, x, y, callback) {
  this.ctx = ctx;
  this.image = image;
  var imgSize = images.getImgSize(image);
  this.width = imgSize.w;
  this.height = imgSize.h;
  this.x = x;
  this.y = y;
  this.callback = callback;
}

objects.button.prototype.update = function(t) {};
objects.button.prototype.render = function(t) {
  images.draw(this.ctx, this.image, this.x, this.y);
};
objects.button.prototype.doPointAction = function(x, y) {
  if (this.callback) {
    if ((x >= this.x) && (x < (this.x + this.width)) && (y >= this.y) && (y < (this.y + this.height))) {
      this.callback();
    }
  }
};

objects.background = function(ctx, image) {
  this.ctx = ctx;
  this.image = image;
  //var imgSize = images.getImgSize(image);
  //this.width = imgSize.w;
  //this.height = imgSize.h;
}

objects.background.prototype.update = function(t) {};
objects.background.prototype.render = function(t) {
  
  images.draw(this.ctx, this.image, 0, 0, this.ctx.width, this.ctx.height);
};
objects.background.prototype.doPointAction = function(x, y) {};

objects.gameBoard = function(ctx) {
  this.ctx = ctx;
};

objects.gameBoard.prototype.update = function(t) {};
objects.gameBoard.prototype.render = function(t) {
  var ctx = this.ctx;
  ctx.save();
  ctx.strokeStyle = '#FFFF00';
  ctx.beginPath();
  ctx.moveTo(0,0);
  ctx.lineTo(this.ctx.width, this.ctx.height);
  ctx.stroke();
  ctx.restore();
};
objects.gameBoard.prototype.doPointAction = function(x, y) {};

objects.move = function(ctx) {
  this.ctx = ctx;
};

objects.move.prototype.update = function(t) {};
objects.move.prototype.render = function(t) {};
objects.move.prototype.doPointAction = function(x, y) {};




