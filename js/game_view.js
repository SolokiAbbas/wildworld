import Util from './util';
import Cannon from './cannons';
import Game from './game';
import Sprite from './sprite';

class GameView {
  constructor(game, ctx){
    this.intro = true;
    this.ctx = ctx;
    this.game = game;
    this.setupmode = true;
    this.singleCannon = {name: "Drag", cost: 500};
    this.speed = 1;
    this.shopWest = new Image();
    this.shopWest.src = 'images/cannons/dragon-cannon-west.png';
    this.shopNorth = new Image();
    this.shopNorth.src = 'images/cannons/dragon-cannon-north.png';
    this.shopSouth = new Image();
    this.shopSouth.src = 'images/cannons/dragon-cannon-south.png';
    this.shopEast = new Image();
    this.shopEast.src = 'images/cannons/dragon-cannon-east.png';
    this.requestSetup = 0;
    this.requestAnimate = 0;
    this.hoverPos = {x: 0, y: 0};

  }

  setup(){
    if(this.intro){
      let intromodal = document.getElementById('introModal');
      let introspan = document.getElementsByClassName("close4")[0];
      intromodal.style.display = "block";
      introspan.onclick = () => {
        intromodal.style.display = "none";
        window.onclick = (event) => {
            if (event.target === intromodal) {
              intromodal.style.display = "none";
            }
        };
      };
      this.game.addGold();
      this.intro = false;
    }
    this.ctx.font = "italic 26pt Calibri";
    this.ctx.fillStyle = 'White';
    this.ctx.fillText("Shop Here", 1045, 30);
    this.ctx.font = "italic 16pt Calibri";
    this.ctx.fillStyle = 'White';
    this.ctx.fillText("Cost: 500 Gold", 1055, 450);
    this.ctx.font = "italic 20pt Calibri";
    this.ctx.fillStyle = 'White';
    this.ctx.fillText("Remove Cannon", 1035, 550);
    this.ctx.font = "italic 26pt Calibri";
    this.ctx.fillStyle = 'White';
    this.ctx.fillText("Start Battle", 1040, 680);
    this.backgroundImage = new Image();
    this.backgroundImage.src = this.game.background.src;
    this.ctx.drawImage(this.backgroundImage, 5,5, 1015,700);

    this.shopSouth.onload = () => {
      this.ctx.drawImage(this.shopSouth, 1085,320, 50,100);
    };
    this.shopNorth.onload = () => {
      this.ctx.drawImage(this.shopNorth, 1085,200, 50,100);
    };
    this.shopEast.onload = () => {
      this.ctx.drawImage(this.shopEast, 1055,120, 100,50);
    };
    this.shopWest.onload = () => {
      this.ctx.drawImage(this.shopWest, 1055,50, 100,50);
    };
    this.addHover();
    this.clickedShop();
    this.setupAnimate();
  }

 addHover(){
   const canvasEl = document.querySelector("canvas");
   let hoverPos = (e) => {
       this.hoverPos.x= e.offsetX;
       this.hoverPos.y= e.offsetY;
       if(this.setupmode === false){
         canvasEl.removeEventListener('mousemove', hoverPos);
       }
   };
   canvasEl.addEventListener('mousemove', hoverPos);
 }

  setupAnimate(){
    window.cancelAnimationFrame(this.requestAnimate);
    if(this.game.sprites.length > 0){
      this.game.deletAllSprites();
    }
    if(this.setupmode === true){

      this.game.drawHover(this.ctx, this.hoverPos,this.singleCannon.direction);
      this.game.drawCannons(this.ctx);
      this.request = requestAnimationFrame(this.setupAnimate.bind(this));
    }
  }

  start(){
      this.game.addMonster();
      this.game.increaseMonsterNumbers();
    for(let i = 0; i<50; i++){
      this.game.addBullets();
    }
    this.increaseSpeed();
    this.game.addAllBullets();
    requestAnimationFrame(this.animate.bind(this));
  }

  clickedShop(){
    const canvasEl = document.querySelector("canvas");
    let interactions = function(e){
      const pos = {
        x: e.offsetX,
        y: e.offsetY
      };
        if(Util.dist([pos.x, pos.y], [1160,90]) < 40){
          this.ctx.beginPath();
          this.ctx.moveTo(1190, 70);
          this.ctx.lineTo(1195, 90);
          this.ctx.lineTo(1195, 50);
          this.ctx.fillStyle = "black";
          this.ctx.fill();
          this.ctx.fillStyle = "grey";
          this.ctx.fillRect(1179,100, 120,300);
          this.singleCannon.direction = "west";
        }else if(Util.dist([pos.x, pos.y], [1160,160]) < 40){
          this.ctx.beginPath();
          this.ctx.moveTo(1180, 140);
          this.ctx.lineTo(1195, 160);
          this.ctx.lineTo(1195, 120);
          this.ctx.fillStyle = "black";
          this.ctx.fill();
          this.ctx.fillStyle = "grey";
          this.ctx.fillRect(1179,170, 120,250);
          this.ctx.fillStyle = "grey";
          this.ctx.fillRect(1179,49, 120,50);
          this.singleCannon.direction = "east";
        }else if(Util.dist([pos.x, pos.y], [1160,290]) < 55){
          this.ctx.beginPath();
          this.ctx.moveTo(1170, 240);
          this.ctx.lineTo(1195, 260);
          this.ctx.lineTo(1195, 220);
          this.ctx.fillStyle = "black";
          this.ctx.fill();
          this.ctx.fillStyle = "grey";
          this.ctx.fillRect(1179,265, 120,150);
          this.ctx.fillStyle = "grey";
          this.ctx.fillRect(1179,49, 120,150);
          this.singleCannon.direction = "north";
        }else if(Util.dist([pos.x, pos.y], [1160,420]) < 55){
          this.ctx.beginPath();
          this.ctx.moveTo(1160, 370);
          this.ctx.lineTo(1185, 390);
          this.ctx.lineTo(1185, 350);
          this.ctx.fillStyle = "black";
          this.ctx.fill();
          this.ctx.fillStyle = "grey";
          this.ctx.fillRect(1179,49, 120,300);
          this.singleCannon.direction = "south";
        }

        for(let y = 5; y<600; y+=150){
          for(let x = 5; x<1005; x+=150){
            if(Util.dist2([pos.x, pos.y], [x+70,y+70]) < 60 && this.singleCannon.direction === "west"){
              this.singleCannon.origin =[x,y];
              this.singleCannon.pos = [x+35, y+50];
              this.game.addCannons(this.singleCannon);
            }else if(Util.dist2([pos.x, pos.y], [x+70,y+70]) < 60 && this.singleCannon.direction === "east"){
              this.singleCannon.origin =[x,y];
              this.singleCannon.pos = [x+35, y+50];
              this.game.addCannons(this.singleCannon);
            }else if(Util.dist2([pos.x, pos.y], [x+70,y+70]) < 60 && this.singleCannon.direction === "north"){
              this.singleCannon.origin =[x,y];
              this.singleCannon.pos = [x+50, y+30];
              this.game.addCannons(this.singleCannon);
            }else if(Util.dist2([pos.x, pos.y], [x+70,y+70]) < 60 && this.singleCannon.direction === "south"){
              this.singleCannon.origin =[x,y];
              this.singleCannon.pos = [x+50 , y+30];
              this.game.addCannons(this.singleCannon);
            }
          }
        }
        if(Util.dist2([pos.x, pos.y], [1100, 540]) < 30){
          this.game.removePreviousCannon();
        }

        if(Util.dist2([pos.x, pos.y], [1100,670]) < 50 && this.setupmode === true){
          this.setupmode = false;
          canvasEl.removeEventListener('click', interactions);
          this.start();
        }
    }.bind(this);
    canvasEl.addEventListener('click', interactions);
  }

  increaseSpeed(){
    this.speed +=1;
  }

  resetGame(){
    const canvasEl = document.querySelector("canvas");
    const game = new Game(this.game.background, this.ctx);
    this.speed = 1;
    this.game = game;
    this.setupmode = true;
    this.game.addGold();
  }

  animate(){
    window.cancelAnimationFrame(this.request);
    this.backgroundImage = new Image();
    this.backgroundImage.src = this.game.background.src;
    this.backgroundImage.onload = () =>{
      this.ctx.drawImage(this.backgroundImage, 5,5, 1010,700);
      this.ctx.drawImage(this.shopWest, 1055,50, 100,50);
      this.ctx.drawImage(this.shopEast, 1055,120, 100,50);
      this.ctx.drawImage(this.shopNorth, 1085,200, 50,100);
      this.ctx.drawImage(this.shopSouth, 1085,320, 50,100);
    };
    this.ctx.font = "26px arial";
    this.ctx.fillStyle = 'White';
    this.ctx.fillText("Shop Here", 1045, 30);
    this.game.moveMonsters(this.speed);
    this.game.fireBullets();
    this.game.draw(this.ctx);
    if(this.game.monsters.length === 0){

      if(this.game.isGameOver()){
        let modal = document.getElementById('myModal');
        let span = document.getElementsByClassName("close")[0];
        modal.style.display = "block";
        span.onclick = () => {
          modal.style.display = "none";
          this.resetGame();
          this.setup();
        };
        window.onclick = (event) => {
            if (event.target === modal) {
              modal.style.display = "none";
                this.resetGame();
                this.setup();
            }
        };
      }else{
        this.setupmode = true;
        this.setup();
      }

    } else {
      this.requestAnimate = requestAnimationFrame(this.animate.bind(this));

    }
  }
}

export default GameView;
