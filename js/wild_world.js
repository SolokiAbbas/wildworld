
document.addEventListener("DOMContentLoaded", function(){
  const canvasEl = document.querySelector("canvas");
  const ctx = canvasEl.getContext("2d");
  let backgroundImage = new Image();
  backgroundImage.src = 'images/background/grass.jpg';
  backgroundImage.onload = () =>{
    ctx.drawImage(backgroundImage, 5,5, 1000,700);
  };
  let backgroundImage2 = new Image();
  backgroundImage2.src = 'images/cannons/dragon-cannon.png';
  backgroundImage2.onload = () =>{
    ctx.drawImage(backgroundImage2, 30,30, 200,100);
  };
});
