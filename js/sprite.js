


class Sprite {
  constructor(pos, ctx){
    this.ctx = ctx;
    this.spriteWidth = 811;
    this.spriteHeight= 710;
    this.rows = 3;
    this.cols = 3;
    this.width = this.spriteWidth/this.cols;
    this.height = this.spriteHeight/this.rows;
    this.curFrame = 0;
    this.curYFrame = 0;
    this.frameCount = 6;
    this.x = pos[0];
    this.y = pos[1];
    this.srcX = 0;
    this.srcY = 0;
    this.spriteX = new Image();
    this.spriteX.src = 'images/explosion.png';
    this.delete = false;
  }

  updateFrame(){
    this.srcX = this.curFrame * this.width;
    this.srcY = this.curYFrame * this.height;
    if(this.srcX>300){
    this.srcX = 0;
    this.curFrame = 0;
    this.curYFrame +=1;
  }
  if(this.curYFrame > 3){
    this.delete = true;
  }
  this.curFrame = ++this.curFrame % this.frameCount;
  }

  drawFrame(){
      this.ctx.drawImage(this.spriteX,this.srcX,this.srcY,this.width,this.height,this.x-150,this.y-100,this.width,this.height);
  }

  update(){
    this.updateFrame();
  }

}

export default Sprite;
