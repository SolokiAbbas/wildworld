import Monster from './monster';

class Game {
  constructor(){
    this.cannons = [];
    this.monsters = [];
    this.difficulty = 1;
    this.gap = 50;
    this.monsterNumbers = 10;
  }

  addDifficulty(){
    this.difficulty+=10;
  }

  addGold(){
    setTimeout(()=>this.user.addGold(10), 10000);
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

  moveObjects(){
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

  remove(object){
    this.monsters.splice(this.monsters.indexOf(object), 1);
  }

  draw(ctx){
    let backgroundImage2 = new Image();
    let backgroundImage = new Image();
    backgroundImage.src = 'images/background/grass.jpg';
    backgroundImage2.src = 'images/monsters/beargif.gif';


      backgroundImage2.onload = () =>{
        this.monsters.forEach((object)=>{
          ctx.drawImage(backgroundImage2, object.pos[0],object.pos[1], 100, 50);

          if(object.path === "done" ){
            this.remove(object);
          }
      }
    );
  };
    backgroundImage.onload = () =>{
      ctx.drawImage(backgroundImage, 5,5, 1000,700);
    };

  }

}

export default Game;
