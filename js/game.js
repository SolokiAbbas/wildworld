import Monster from './monster';
import Cannon from './cannons';
import Bullet from './bullets';
import Util from './util';
import User from './user';
import Sprite from './sprite.js';

class Game {
  constructor(background, ctx){
    this.bullets = [];
    this.allBullets = {};
    this.cannons = [];
    this.monsters = [];
    this.gap = 50;
    this.user = new User();
    this.monsterNumbers = 3;
    this.monsterImage = new Image();
    this.monsterImage.src = 'images/monsters/beargif.gif';
    this.cannonImageWest = new Image();
    this.cannonImageWest.src = 'images/cannons/dragon-cannon-west.png';
    this.cannonImageNorth = new Image();
    this.cannonImageNorth.src = 'images/cannons/dragon-cannon-north.png';
    this.cannonImageSouth = new Image();
    this.cannonImageSouth.src = 'images/cannons/dragon-cannon-south.png';
    this.cannonImageEast = new Image();
    this.cannonImageEast.src = 'images/cannons/dragon-cannon-east.png';
    this.bulletImage = new Image();
    this.bulletImage.src = 'images/spr_bullet_strip.png';
    this.hearts = new Image();
    this.hearts.src = 'images/heart.png';
    this.background = background;
    this.ctx = ctx;
    this.sprites = [];
  }

  addBullets(){
    if(this.cannons.length>0){
    for(let i = 0; i<this.cannons.length; i++){
      let options = {};
      switch(this.cannons[i].direction){
        case "south":
        options = {
          pos: [this.cannons[i].pos[0]+16, this.cannons[i].pos[1]+53],
          origin: [this.cannons[i].pos[0]+16, this.cannons[i].pos[1]+53],
          direction: this.cannons[i].direction
        };
        break;
        case "north":
        options = {
          pos: [this.cannons[i].pos[0]+12, this.cannons[i].pos[1]],
          origin: [this.cannons[i].pos[0]+12, this.cannons[i].pos[1]],
          direction: this.cannons[i].direction
        };
        break;
        case "west":
        options = {
          pos: [this.cannons[i].pos[0], this.cannons[i].pos[1]+22],
          origin: [this.cannons[i].pos[0], this.cannons[i].pos[1]+22],
          direction: this.cannons[i].direction
        };
        break;
        case "east":
        options = {
          pos: [this.cannons[i].pos[0]+55, this.cannons[i].pos[1]+12],
          origin: [this.cannons[i].pos[0]+55, this.cannons[i].pos[1]+12],
          direction: this.cannons[i].direction
        };
        break;
    }
      const bull = new Bullet(options);
      this.bullets.push(bull);
    }}

  }

  addDifficulty(){
    this.difficulty+=10;
  }

  addGold(){
    setInterval(()=>this.user.addGold(50), 5000);
  }

  currentGold(){
    this.user.showGold();
  }

  drawGold(ctx){
    ctx.font = "26px arial";
    ctx.fillStyle = 'White';
    ctx.fillText(`Gold: ${this.user.showGold()}`, 470, 670);
    ctx.fillText(`Level: ${this.user.currentLevel()}`, 890, 670);
  }

  addCannons(cannon){
    let can = new Cannon(cannon);
    let dup = false;
    for(let i = 0; i<this.cannons.length; i++){
      if(this.cannons[i].origin.toString() === can.origin.toString()){
        dup = true;
      }
    }
    let tempGold = this.user.showGold();
    if(dup === false && can.cost <= this.user.showGold()){
      this.user.removeGold(can.cost);
      this.cannons.push(can);
    }
    if(can.cost > tempGold){
      let modal2 = document.getElementById('myModal2');
      let span2 = document.getElementsByClassName("close2")[0];
      modal2.style.display = "block";
      span2.onclick = () => {
        modal2.style.display = "none";
      };
      window.onclick = (event) => {
          if (event.target === modal2) {
            modal2.style.display = "none";
          }
      };
    }
  }

  addMonster(name = "Normal Bear"){
    let options = {
      name: name,
      hp: 1,
      speed: 1,
      worth: 50
    };
    this.removeAllMonsters();
    for(let i=0;i<this.monsterNumbers;i++){
      const mon = new Monster(options);
      this.monsters.push(mon);
    }
  }
  removeAllMonsters(){
    this.monsters=[];
  }

  increaseMonsterNumbers(){
    if (this.user.currentLevel() % 2 === 0){
      this.monsterNumbers += 1;
    }
  }

  moveMonsters(speed){
    this.checkCollisions();

    if(this.monsters.length >= 1){
    this.monsters[0].move(speed);
    for(let i=1;i<this.monsters.length;i++){
      let prevMon = this.monsters[i-1];

      if(Math.abs(prevMon.pos[0]-this.monsters[i].pos[0]) > this.gap*3 || Math.abs(prevMon.pos[1]-this.monsters[i].pos[1]) > 0){

        this.monsters[i].move(speed);
      }
    }
    }
  }

  deletAllSprites(){
    this.sprites = [];
  }

  deleteSprite(){
    this.sprites.pop();
  }

  newSpritePos(pos){
    let sprite = new Sprite(pos, this.ctx);
    this.sprites.push(sprite);
  }

  checkCollisions(){
    let audioPunch = document.getElementById("punch");
    audioPunch.volume = 0.3;
    let k;
    for (let i = 0; i < this.monsters.length; i++) {
      for (let j = 0; j < this.cannons.length; j++) {
        for(k = 0; k<this.allBullets[j].length;k++){
        if(this.monsters.length >= 1 && this.allBullets[j].length>1){
          if(typeof this.monsters[i] === 'undefined' || typeof this.allBullets[j][k] === 'undefined'){
            continue;
          }
          if(this.monsters[i].isCollidedWith(this.allBullets[j][k]) && this.allBullets[j][k].null !== "not real"){
            this.remove(this.monsters[i]);
            this.newSpritePos(this.allBullets[j][k].pos);
            this.user.addGold(50);
            this.nullBullet(j,k);
            audioPunch.play();
            }
          }
        }
        k=0;
      }
    }
  }

  addAllBullets(){
    let j;
    for(let i = 0; i<this.cannons.length; i++){
      this.allBullets[i] = [];
      for(j=1; j<this.bullets.length;j++){
        if(this.bullets[i].origin.toString() === this.bullets[j].origin.toString()){
          this.allBullets[i].push(this.bullets[j]);
        }
      }
      j=i+1;
    }
  }

  outsideBullets(){
    let j;
    for (let i = 0; i < this.cannons.length; i++) {
      for(j = 0; j<this.allBullets[i].length;j++){
          if(this.allBullets[i][j].pos[0]>985 || this.allBullets[i][j].pos[0] < 5){
            this.destroyBullet(i, this.allBullets[i][j]);
          } else if(this.allBullets[i][j].pos[1]>985 || this.allBullets[i][j].pos[1] < 5){
            this.destroyBullet(i, this.allBullets[i][j]);
            }
        }
        j=0;
      }
    }
    removeAllBullets(){
      for(let i=0; i<this.cannons.length;i++){
        this.allBullets[i]=[];
      }
    }

  fireBullets(){
    if(this.monsters.length === 0){
      this.removeAllBullets();
      this.bullets=[];
      this.user.incrementLevels();
    } else{
    for(let i = 0; i<this.cannons.length; i++){
      if(this.allBullets[i].length !== 0){
        this.outsideBullets();
        this.allBullets[i][0].bulletPath();
      for(let j=1;j<this.allBullets[i].length;j++){
        let prevBull = this.allBullets[i][j-1];
        if(Math.abs(prevBull.pos[0]-this.allBullets[i][j].pos[0]) > this.gap*5 || Math.abs(prevBull.pos[1]-this.allBullets[i][j].pos[1]) > 200){
          this.allBullets[i][j].bulletPath();
        }
      }
    }}
  }}

  remove(object){
    this.monsters.splice(this.monsters.indexOf(object), 1);
  }
  destroyBullet(origin, bullet){
    this.allBullets[origin].splice(this.allBullets[origin].indexOf(bullet), 1);
  }

  nullBullet(i,j){
    this.allBullets[i][j].unrealBullet();
  }

  removePreviousCannon(){
    if(this.cannons.length !== 0){
      this.user.addGold(this.cannons.pop().cost);
    }
  }

  isGameOver(){
    if(this.user.showLife() <= 0){
      return true;
    } else {
      return false;
    }
  }

  draw(ctx){

    if (this.sprites.length > 0){
      for(let i = 0; i<this.sprites.length; i++){
        this.sprites[i].drawFrame();
        this.sprites[i].update();
        if(this.sprites[i].delete === true){
          this.deleteSprite();
        }
      }
    }


    let backgroundImage = new Image();
    backgroundImage.src = this.background.src;
    backgroundImage.onload = () =>{
      ctx.drawImage(backgroundImage, 5,5, 1000,700);
      this.cannons.forEach((object)=>{
        switch(object.direction){
          case "north":
            ctx.drawImage(this.cannonImageNorth, object.pos[0], object.pos[1], 50, 75);
            break;
          case "south":
            ctx.drawImage(this.cannonImageSouth, object.pos[0], object.pos[1], 50, 75);
            break;
          case "east":
            ctx.drawImage(this.cannonImageEast, object.pos[0], object.pos[1], 75, 50);
            break;
          case "west":
            ctx.drawImage(this.cannonImageWest, object.pos[0], object.pos[1], 75, 50);
            break;
        }
      });
          this.monsters.forEach((object)=>{
            if(object.pos.toString() !== "5,400"){
              ctx.drawImage(this.monsterImage, object.pos[0],object.pos[1], 100, 50);
              if(object.path === "done" ){
                this.user.removeLife(1);
                this.remove(object);
              }
            }
          }
      );

      for(let i = 0; i<this.user.showLife();i++){
        ctx.drawImage(this.hearts, (i*50)+20, 640, 50, 50);
      }
      let j;
      for(let i = 0; i<this.cannons.length; i++){
        for(j=0; j<this.allBullets[i].length;j++){
          let bull = this.allBullets[i][j];
          if( bull.pos.toString() !== bull.origin.toString() && bull.null !== "not real"){
            ctx.drawImage(this.bulletImage, this.allBullets[i][j].pos[0], this.allBullets[i][j].pos[1], 20,20);
        }}
        j=0;
      }

    };

  }
  drawGrid(ctx){
    for (var x = 5; x < 1000; x += 150) {
      ctx.moveTo(x, 5);
      ctx.lineTo(x, 605);
    }

    for (var y = 5; y < 750; y += 150) {
      ctx.moveTo(5, y);
      ctx.lineTo(1000, y);
    }

    ctx.strokeStyle = "#C6CCCF";
    ctx.stroke();
  }

  drawCannons(ctx){
    let backgroundImage = new Image();
    backgroundImage.src = this.background.src;
    // this.drawGrid(ctx);
    backgroundImage.onload = () =>{

      ctx.drawImage(backgroundImage, 5,5, 1000,700);
      this.drawGold(ctx);
      for(let i = 0; i<this.user.showLife();i++){
        ctx.drawImage(this.hearts, (i*50)+20, 640, 50, 50);
      }

      this.cannons.forEach((object)=>{
        ctx.save();
        switch(object.direction){
          case "north":
            ctx.drawImage(this.cannonImageNorth, object.pos[0], object.pos[1], 50, 75);
            break;
          case "south":
            ctx.drawImage(this.cannonImageSouth, object.pos[0], object.pos[1], 50, 75);
            break;
          case "east":
            ctx.drawImage(this.cannonImageEast, object.pos[0], object.pos[1], 75, 50);
            break;
          case "west":
            ctx.drawImage(this.cannonImageWest, object.pos[0], object.pos[1], 75, 50);
            break;
        }
      });
    };
  }
}

export default Game;
