class GameView {
  constructor(game, ctx){
    this.ctx = ctx;
    this.game = game;
  }
  start(){
    requestAnimationFrame(this.animate.bind(this));
  }

  animate(){

  this.game.moveObjects();
  this.game.draw(this.ctx);

  setTimeout(()=>requestAnimationFrame(this.animate.bind(this)), 100-this.game.difficulty);
  }
}

export default GameView;
