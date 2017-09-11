import Monster from './monster';
import Cannon from './cannons';
import Bullet from './bullets';
import Util from './util';

class Game {
  constructor(){
    this.bullets = [];
    this.allBullets = {};
    this.cannons = [];
    this.monsters = [];
    this.difficulty = 1;
    this.gap = 50;
    this.monsterNumbers = 10;
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
  }

  addBullets(){
    if(this.cannons.length>0){
    for(let i = 0; i<this.cannons.length; i++){
      let options = {};
      switch(this.cannons[i].direction){
        case "south":
        options = {
          pos: [this.cannons[i].pos[0]+12, this.cannons[i].pos[1]],
          origin: [this.cannons[i].pos[0]+12, this.cannons[i].pos[1]],
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
          pos: [this.cannons[i].pos[0], this.cannons[i].pos[1]+22],
          origin: [this.cannons[i].pos[0], this.cannons[i].pos[1]+22],
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
    setTimeout(()=>this.user.addGold(10), 10000);
  }

  addCannons(cannon){
    let can = new Cannon(cannon);
    let dup = false;
    for(let i = 0; i<this.cannons.length; i++){
      if(this.cannons[i].pos.toString() === can.pos.toString()){
        dup = true;
      }
    }
    if(dup === false){
      this.cannons.push(can);
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
    this.monsterNumbers += 1;
  }

  moveMonsters(){
    this.checkCollisions();
    if(this.monsters.length >= 1){
    this.monsters[0].move();
    for(let i=1;i<this.monsters.length;i++){
      let prevMon = this.monsters[i-1];

      if(Math.abs(prevMon.pos[0]-this.monsters[i].pos[0]) > this.gap*3 || Math.abs(prevMon.pos[1]-this.monsters[i].pos[1]) > 0){

        this.monsters[i].move();
      }
    }
    }
  }

  checkCollisions(){
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
            this.nullBullet(j,k);
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
      this.cannons.pop();
    }
  }

  draw(ctx){
    let backgroundImage = new Image();
    backgroundImage.src = 'images/background/grass.jpg';
    backgroundImage.onload = () =>{
      ctx.drawImage(backgroundImage, 5,5, 1000,700);
      this.cannons.forEach((object)=>{
        ctx.save();
        switch(object.direction){
          case "north":
            ctx.drawImage(this.cannonImageNorth, object.pos[0], object.pos[1], 50, 75);
            break;
          case "south":
            ctx.scale(1,-1);
            ctx.drawImage(this.cannonImageNorth, object.pos[0], -object.pos[1], 50, 75);
            ctx.restore();
            break;
          case "east":
            ctx.scale(-1,1);
            ctx.drawImage(this.cannonImageWest, -object.pos[0], object.pos[1], 75, 50);
            ctx.restore();
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
                this.remove(object);
              }
            }
          }
      );
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

  drawCannons(ctx){
    let backgroundImage = new Image();
    backgroundImage.src = 'images/background/grass.jpg';
    backgroundImage.onload = () =>{
      ctx.drawImage(backgroundImage, 5,5, 1000,700);
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
