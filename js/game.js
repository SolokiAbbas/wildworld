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
  }

  addBullets(){
    if(this.cannons.length>0){
    for(let i = 0; i<this.cannons.length; i++){
      let options = {
        pos: this.cannons[i].pos.slice(),
        direction: this.cannons[i].direction
      };
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

  addCannons(name = "Regular"){
    let options = {
      name: name,
      bulletSpeed: 1,
      pos: [500,400],
      cost: 200,
      direction: "north",
    };
    let options2 = {
      name: name,
      bulletSpeed: 1,
      pos: [800,200],
      cost: 200,
      direction: "south",
    };
    const can2 = new Cannon(options2);
    const can = new Cannon(options);
    this.cannons.push(can);
    this.cannons.push(can2);
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

      if(Math.abs(prevMon.pos[0]-this.monsters[i].pos[0]) > this.gap*2 || Math.abs(prevMon.pos[1]-this.monsters[i].pos[1]) > 0){

        this.monsters[i].move();
      }
    }
    }
  }

  checkCollisions(){
    for (let i = 0; i < this.monsters.length; i++) {
      for (let j = 0; j < this.bullets.length; j++) {
        if(this.monsters.length >= 1){
          if(this.monsters[i].isCollidedWith(this.bullets[j])){
            this.remove(this.monsters[i]);
          }
        }
      }
    }
  }


  fireBullets(){
    for(let i = 0; i<this.bullets.length; i++){
      for(let j=1; j<this.bullets.length;j++){
        if(this.bullets[i].origin === this.bullets[j].origin){
          this.allBullets[i]=this.bullets[i].pos;
        }
        j=i+1;
      }
    }

    if(this.bullets.length >=1){
      this.bullets[0].bulletPath();
      for(let i = 1; i<this.bullets.length;i++){
        let prevBull = this.bullets[i-1];
        if(Math.abs(prevBull.pos[0]-this.bullets[i].pos[0]) > 100 || Math.abs(prevBull.pos[1]-this.bullets[i].pos[1]) > 100){
          this.bullets[i].bulletPath();
        }
      }
    }
  }


  rateOfFire(speed){

  }

  remove(object){
    this.monsters.splice(this.monsters.indexOf(object), 1);
  }

  draw(ctx){
    let monsterImage = new Image();
    let backgroundImage = new Image();
    let cannonImage = new Image();
    backgroundImage.src = 'images/background/grass.jpg';
    monsterImage.src = 'images/monsters/beargif.gif';
    cannonImage.src = 'images/cannons/dragon-cannon.png';

      monsterImage.onload = () =>{
        this.monsters.forEach((object)=>{
          ctx.drawImage(monsterImage, object.pos[0],object.pos[1], 100, 50);
          if(object.path === "done" ){
            this.remove(object);
          }


      }
    );

    this.bullets.forEach((bullet)=>{
      ctx.fillStyle = 'black';
      ctx.fillRect(bullet.pos[0], bullet.pos[1], 10,10);
    });
  };

    backgroundImage.onload = () =>{
      ctx.drawImage(backgroundImage, 5,5, 1000,700);
      this.cannons.forEach((object)=>{
        ctx.drawImage(cannonImage, object.pos[0], object.pos[1], 75, 50);

      });
    };

  }

}

export default Game;
