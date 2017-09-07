class GameView {
  constructor(game, ctx){
    this.ctx = ctx;
    this.game = game;
  }
  start(){
    this.game.addMonster();
    this.game.addCannons();

    for(let i = 0; i<10; i++){
      this.game.addBullets();
    }
    requestAnimationFrame(this.animate.bind(this));
  }

  animate(){
    let backgroundImage = new Image();
    backgroundImage.src = 'images/background/grass.jpg';
    backgroundImage.onload = () =>{
      this.ctx.drawImage(backgroundImage, 5,5, 1000,700);
      let backgroundImage2 = new Image();
      backgroundImage2.src = 'images/cannons/dragon-cannon.png';
      backgroundImage2.onload = () =>{
        this.ctx.drawImage(backgroundImage2, 1010,50, 100,50);
      };
    };
    this.ctx.font = "26px arial";
    this.ctx.fillStyle = 'White';
    this.ctx.fillText("Shop Here", 1015, 30);
    if(this.game.difficulty === 2){
      this.game.increaseMonsterNumbers();
      this.game.addMonster();
    }
    this.game.moveMonsters();
    this.game.fireBullets();
    this.game.draw(this.ctx);

  setTimeout(()=>requestAnimationFrame(this.animate.bind(this)), 10-this.game.difficulty);
  }
}

export default GameView;
