var canvas = null;
var modules = [];

var SIZE = 16 * Math.ceil( Math.random()*10 );
var STROKE_WEIGHT = Math.ceil( Math.random()*10 ) * 0.5 + 1;

var MARGIN = 40;
var MGX = 0;
var MGY = 0;

var THEME = '';
var COLOR_PT = '';
var COLOR_LINE = '';
var COLOR_BG = '';

var WIDTH = windowWidth;
var HEIGHT = windowHeight;

var counter = 0;

function Module(indexX,indexY) {
  this.indexX = indexX;
  this.indexY = indexY;
  this.lifespan = 0;
  this.speed = Math.floor( Math.random()*10 ) + 12;
  this.direction = 1;
  this.delay = Math.floor( Math.random()*200 );
  var x = this.indexX*SIZE+MGX;
  var y = this.indexY*SIZE+MGY;
  this.element = Math.random() > .5 ? new Arc(x, y) : new Line(x, y);
  this.display = function() {
    stroke(COLOR_PT);
    // strokeWeight(STROKE_WEIGHT*1.5);
    point(x, y);
    point(x+SIZE, y);
    point(x+SIZE, y+SIZE);
    point(x, y+SIZE);
    
    if(this.delay>0) {
      this.delay--;
      return;
    }
    if(this.direction==1 && this.lifespan>=255) {
      this.direction = -1;
      this.lifespan = 255;
    } else if(this.direction==-1 && this.lifespan<=0) {
      this.direction = 1;
      this.lifespan = 0;
      this.element.init();
    }
    noFill();
    stroke(COLOR_LINE);
    this.element.display(this.lifespan, this.direction);

    this.lifespan += this.direction*this.speed;
  }
}

function Arc(topLeftX,topLeftY) {
  this.topLeftX = topLeftX;
  this.topLeftY = topLeftY;
  this.center = null;
  this.center = Math.floor( Math.random()*4 );
  this.init = function() {
    this.center = Math.floor( Math.random()*4 );
  }
  this.display = function(lifespan, direction) {
    var cx = (this.center%3==0) ? this.topLeftX : this.topLeftX + SIZE;
    var cy = (this.center<2) ? this.topLeftY : this.topLeftY + SIZE;
    var angle = map(lifespan, 0, 255, 0, HALF_PI);
    if(direction==1) {
      begin = this.center * HALF_PI;
      angle = map(lifespan, 0, 255, 0, HALF_PI);
      arc(cx, cy, SIZE*2, SIZE*2, begin, begin+angle);
    } else {
      var end = (this.center+1) * HALF_PI;
      arc(cx, cy, SIZE*2, SIZE*2, end-angle, end);
    }
  }
}

function Line(topLeftX, topLeftY) {
  this.topLeftX = topLeftX;
  this.topLeftY = topLeftY;
  this.begin = null;
  this.end = null;
  this.display = function(lifespan,direction) {
    if(direction==1) {
      var moveX = map(lifespan, 0, 255, this.begin.x, this.end.x);
      var moveY = map(lifespan, 0, 255, this.begin.y, this.end.y);
      line(this.begin.x, this.begin.y, moveX, moveY);
    } else {
      var moveX = map(lifespan, 0, 255, this.end.x, this.begin.x);
      var moveY = map(lifespan, 0, 255, this.end.y, this.begin.y);
      line(moveX, moveY, this.end.x, this.end.y);
    }
  }
  this.getX = function(index) {
    return (index==0 || index==3) ? this.topLeftX : this.topLeftX + SIZE;
  }
  this.getY = function(index) {
    return (index==0 || index==1) ? this.topLeftY : this.topLeftY + SIZE;
  }
  this.init = function() {
    var list = [0,1,2,3];
    var beginIndex = Math.floor( Math.random()*4 );
    this.begin = createVector(this.getX(beginIndex), this.getY(beginIndex));
    list.splice(beginIndex,1);
    var endIndex = list[ Math.floor(Math.random() * 3) ];
    this.end = createVector(this.getX(endIndex), this.getY(endIndex));
  }
  this.init();
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  background(255);
  noFill();
  strokeWeight(STROKE_WEIGHT);
  
  init();
}

function init() {
  WIDTH = windowWidth;
  HEIGHT = windowHeight;
  
  THEME = random()>0.5 ? 'LIGHT' : 'DARK';
  COLOR_PT = THEME=='LIGHT'?'rgba(0,0,0,0.05)':'rgba(255,255,255,0.05)';
  COLOR_LINE = THEME=='LIGHT'?'rgba(0,0,0,0.06)':'rgba(255,255,255,0.06)';
  COLOR_BG = THEME=='LIGHT'?'rgba(255,255,255, 0.05)':'rgba(0,0,0,0.04)';
  
  background(THEME=='LIGHT'?255:0);
  modules = [];
  SIZE = 10 * (Math.ceil( Math.random()*16 )+2);
  var totalX = Math.floor( (WIDTH-MARGIN*2) / SIZE );
  var totalY = Math.floor( (HEIGHT-MARGIN*2) / SIZE );
  MGX = (windowWidth-totalX*SIZE)/2;
  MGY = (windowHeight-totalY*SIZE)/2;
  for(var i=0; i<totalX; i++) {
    for(var j=0; j<totalY; j++) {
      var m = new Module(i, j);
      modules.push(m);
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  init();
}

function keyPressed() {
  var k = key.toLowerCase();
  switch(k) {
    case 's':
      saveCanvas(canvas, 'canvas.jpg');
      break;
    case 'r':
      init();
      break;
  }
}

function draw() {
  if(counter==350) {
    init();
    counter = 0;
  }
  background(COLOR_BG);
  for(var i=0; i<modules.length; i++) {
    var m = modules[i];
    m.display();
  }
  counter++;
}
