import Game from './game';
import GameView from './game_view';


document.addEventListener("DOMContentLoaded", function(){
  const canvasEl = document.querySelector("canvas");
  const ctx = canvasEl.getContext("2d");
  ctx.fillStyle = 'grey';
  ctx.fillRect(1006, 5, 200, 700);
  const game = new Game;

  new GameView(game, ctx).start();
});
