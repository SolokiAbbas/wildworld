import Game from './game';
import GameView from './game_view';


document.addEventListener("DOMContentLoaded", function(){
  const canvasEl = document.querySelector("canvas");
  const ctx = canvasEl.getContext("2d");
  ctx.fillStyle = 'grey';
  ctx.fillRect(1006, 5, 200, 700);
  let bgMusic =document.getElementById("bg-music");
  bgMusic.volume = 0.1;
  let volumeControl = document.getElementsByClassName("volume")[0];
  let punch = document.getElementById("punch");
  let volumePlay = document.getElementsByClassName("play")[0];
  let volumeMute = document.getElementsByClassName("mute")[0];
  volumeControl.onclick = () => {
    if(volumePlay.id === "true"){
      volumePlay.id = "false";
      volumePlay.style.display = "none";
      bgMusic.volume = 0.0;
      volumeMute.id = "true";
      volumeMute.style.display = "block";
    }else {
      volumePlay.id = "true";
      volumePlay.style.display = "block";
      bgMusic.volume = 0.1;
      volumeMute.id = "false";
      volumeMute.style.display = "none";
    }
  };
  let choose = document.getElementById("background");
    choose.style.display = "block";
  let background1 = document.getElementById("grass");
  let background2 = document.getElementById("grass2");
  let background3 = document.getElementById("yellow");
  let background4 = document.getElementById("brick");
  let background = new Image();

  background1.onclick = ()=>{
    background.src = 'images/background/grass.jpg';
    choose.style.display="none";
  };
  background2.onclick = ()=>{
    background.src = 'images/background/grassflower.jpg';
    choose.style.display="none";
  };
  background3.onclick = ()=>{
    background.src = 'images/background/yellow-dirt.jpg';
    choose.style.display="none";
  };
  background4.onclick = ()=>{
    background.src = 'images/background/brickwallmoss.jpg';
    choose.style.display="none";
  };

  const game = new Game(background);

  new GameView(game, ctx).setup();

});
