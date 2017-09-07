import Game from './game';
import GameView from './game_view';


document.addEventListener("DOMContentLoaded", function(){
  const canvasEl = document.querySelector("canvas");
  const ctx = canvasEl.getContext("2d");
  let backgroundImage = new Image();
  backgroundImage.src = 'images/background/grass.jpg';
  backgroundImage.onload = () =>{
    ctx.drawImage(backgroundImage, 5,5, 1000,700);
    let backgroundImage2 = new Image();
    backgroundImage2.src = 'images/cannons/dragon-cannon.png';
    backgroundImage2.onload = () =>{
      ctx.drawImage(backgroundImage2, 1010,50, 100,50);
    };
  };
  ctx.fillStyle = 'grey';
  ctx.fillRect(1006, 5, 200, 700);
  ctx.font = "26px arial";
  ctx.fillStyle = 'White';
  ctx.fillText("Shop Here", 1015, 30);
  const game = new Game;
  game.addMonster("Baer");
  new GameView(game, ctx).start();
});
