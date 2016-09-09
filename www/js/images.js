'use strict';

var image = function(img, name, x, y, width, height) {
  this.img = img;
  if (name === undefined) {
    this.name = img.id;
  } else {
    this.name = name;
  }
  if (x === undefined) {
    this.x = 0;
  } else {
    this.x = x;
  }
  if (y === undefined) {
    this.y = 0;
  } else {
    this.y = y;
  }
  if (width === undefined) {
    this.width = img.width;
  } else {
    this.width = width;
  }
  if (height === undefined) {
    this.height = img.height;
  } else {
    this.height = height;
  }
};

var sprite = function(name, x, y, width, height) {
  this.name = name;
  this.x = x;
  this.width = width;
  this.height = height;
};

var images = {
  loadingCount: 0,
  imgList: {},
  addImage: function(img, name, x, y, width, height) {
    var newImg = new image(img, name, x, y, width, height);
    this.imgList[newImg.name] = newImg;
  },
  loadImage: function(url, sprites) {
    //sprites is an array of sprite objects
    //a sprite is an object that describes a sprite in an image: {name, x, y, width, height}
    var newImg = new Image();
    newImg.onload = function() {images._loadCallback(newImg, sprites)};
    console.log('loading ' + url);
    this.loadingCount += 1;
    newImg.src = url;
  },
  _loadCallback: function(img, sprites) {
    console.log('finished ' + img.src);
    sprites.forEach(function(s) {
      var newImg = new image(img, s.name, s.x, s.y, s.width, s.height);
      images.imgList[newImg.name] = newImg;
    });
    images.loadingCount -= 1;
  },
  draw: function(ctx, name, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight) {
    var img = this.imgList[name];
    if (img === undefined) {console.log('cant find image ' + name);}
    if (sWidth === undefined) {
      //draw the image at original size at sx,yx
      ctx.drawImage(img.img, img.x, img.y, img.width, img.height, sx, sy, img.width, img.height);
      //console.log('draw '  + img.x + ' ' + img.y + ' ' + img.width + ' ' + img.height + ' ' + sx + ' ' + sy + ' ' + img.width + ' ' + img.height);
    } else if (dx === undefined) {
      //draw the image at width sWidth, height sHeight at sx, sy
      ctx.drawImage(img.img, img.x, img.y, img.width, img.height, sx, sy, sWidth, sHeight);
    } else {
      //draw the portion of the image from (sx,sy)-(sx+sWidth,sy+sHeight) to dx, dy with width of dwidth and height of dheight
      ctx.drawImage(img.img, img.x + sx, img.y + sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
    }
  },
  getImgSize: function(name) {
    var img = this.imgList[name];
    return {w: img.width, h: img.height};
  }  
};

