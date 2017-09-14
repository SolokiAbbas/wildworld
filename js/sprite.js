


class Sprite {
  constructor(pos){
    this.spriteWidth = 811;
    this.spriteHeight= 710;
    this.rows = 3;
    this.cols = 3;
    this.width = this.spriteWidth/this.cols;
    this.height = this.spriteHeight/this.rows;
    this.curFrame = 0;
    this.curYFrame = 0;
    this.frameCount = 8;
    this.x = pos[0];
    this.y = pos[1];
    this.srcX = 0;
    this.srcY = 0;
    this.canvas = document.getElementById("canvasX");
    this.canvas.width = 255;
    this.canvas.height = 205;
    this.ctx = this.canvas.getContext("2d");
    this.spriteX = new Image();
    this.spriteX.src = 'images/explosion.png';
  }

  updateFrame(){
    this.srcX = this.curFrame * this.width;
    this.srcY = this.curYFrame * this.height;
  this.ctx.clearRect(this.x,this.y,this.width,this.height);
  if(this.srcX>300){
  this.srcX = 0;
  this.curFrame = 0;
  this.curYFrame +=1;
  }
  if(this.curYFrame > 3){
    this.curYFrame = 0;
  }
  this.curFrame = ++this.curFrame % this.frameCount;
  }

  drawFrame(){
    this.updateFrame();
    this.ctx.drawImage(this.spriteX,this.srcX,this.srcY,this.width,this.height,this.x,this.y,this.width,this.height);
  }

  draw(){
    setInterval(this.drawFrame(),100);
  }
}

export default Sprite;
