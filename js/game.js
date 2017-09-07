import Monster from './monster';

class Game {
  constructor(){
    this.cannons = [];
    this.monster = [];
    this.difficulty = 1;
  }

  addDifficulty(){
    this.difficulty+=10;
  }

  addGold(){
    setTimeout(()=>this.user.addGold(10), 10000);
  }

  addMonster(name){
    let options = {
      name: name,
      hp: 1,
      speed: 1,
      worth: 50
    };
    const mon = new Monster(options);
    this.monster.push(mon);
  }

  moveObjects(){
    this.monster.forEach((object)=> {
      object.move();
    });
  }

  remove(object){
    this.monster.splice(this.monster.indexOf(object), 1);
  }

  draw(ctx){
    let backgroundImage2 = new Image();
    let backgroundImage = new Image();
    backgroundImage.src = 'images/background/grass.jpg';
    backgroundImage2.src = 'images/cannons/dragon-cannon.png';
    this.monster.forEach((object)=>{
      backgroundImage2.onload = () =>{
        ctx.drawImage(backgroundImage2, object.pos[0],object.pos[1], 100,50);
      };

    });
    backgroundImage.onload = () =>{
      ctx.drawImage(backgroundImage, 5,5, 1000,700);
    };

  }

}

export default Game;
