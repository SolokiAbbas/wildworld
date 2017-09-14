import Util from './util';
import Cannon from './cannons';
import Game from './game';

class GameView {
  constructor(game, ctx){
    this.intro = true;
    this.ctx = ctx;
    this.game = game;
    this.setupmode = true;
    this.singleCannon = {name: "Drag", cost: 500};
    this.speed = 2;
    this.shopWest = new Image();
    this.shopWest.src = 'images/cannons/dragon-cannon-west.png';
    this.shopNorth = new Image();
    this.shopNorth.src = 'images/cannons/dragon-cannon-north.png';
    this.shopSouth = new Image();
    this.shopSouth.src = 'images/cannons/dragon-cannon-south.png';
    this.shopEast = new Image();
    this.shopEast.src = 'images/cannons/dragon-cannon-east.png';
  }

  setup(){
    if(this.intro){
      let intromodal = document.getElementById('introModal');
      let introspan = document.getElementsByClassName("next")[0];
      let intromodal2 = document.getElementById('introModal2');
      let introspan2 = document.getElementsByClassName("close4")[0];
      intromodal.style.display = "block";
      introspan.onclick = () => {
        intromodal.style.display = "none";
        intromodal2.style.display = "block";
        introspan2.onclick = () =>{
          intromodal2.style.display = "none";
        };
        window.onclick = (event) => {
            if (event.target === intromodal2 || event.target === intromodal) {
              intromodal2.style.display = "none";
              intromodal.style.display = "none";
            }
        };
      };

      this.intro = false;
    }
    this.ctx.font = "26px arial";
    this.ctx.fillStyle = 'White';
    this.ctx.fillText("Shop Here", 1045, 30);
    this.ctx.font = "20px arial";
    this.ctx.fillStyle = 'White';
    this.ctx.fillText("Remove Cannon", 1035, 550);
    this.ctx.font = "26px arial";
    this.ctx.fillStyle = 'White';
    this.ctx.fillText("Start Battle", 1040, 680);
    this.backgroundImage = new Image();
    this.backgroundImage.src = this.game.background.src;
    this.ctx.drawImage(this.backgroundImage, 5,5, 1000,700);
    this.shopSouth.onload = () => {
      this.ctx.drawImage(this.shopWest, 1045,50, 100,50);
      this.ctx.drawImage(this.shopEast, 1045,120, 100,50);
      this.ctx.drawImage(this.shopNorth, 1075,200, 50,100);
      this.ctx.drawImage(this.shopSouth, 1075,320, 50,100);
    };

    this.clickedShop();
    this.game.addGold();

    requestAnimationFrame(this.setupAnimate.bind(this));
  }


  setupAnimate(){

    if(this.setupmode === true){
      this.game.drawCannons(this.ctx);
      setTimeout(() => requestAnimationFrame(this.setupAnimate.bind(this)), 35);
    }
  }

  start(){
      this.game.addMonster();
      this.game.increaseMonsterNumbers();
    for(let i = 0; i<20; i++){
      this.game.addBullets();
    }
    this.increaseSpeed();
    this.game.addAllBullets();
    requestAnimationFrame(this.animate.bind(this));
  }


  clickedShop(){
    const canvasEl = document.querySelector("canvas");
    canvasEl.addEventListener('click', (e) => {
      const pos = {
        x: e.clientX,
        y: e.clientY
      };
        if(Util.dist([pos.x, pos.y], [1150,90]) < 40){
          this.ctx.beginPath();
          this.ctx.moveTo(1150, 70);
          this.ctx.lineTo(1175, 90);
          this.ctx.lineTo(1175, 50);
          this.ctx.fillStyle = "black";
          this.ctx.fill();
          this.ctx.fillStyle = "grey";
          this.ctx.fillRect(1149,100, 120,300);
          this.singleCannon.direction = "west";
        }else if(Util.dist([pos.x, pos.y], [1150,160]) < 40){
          this.ctx.beginPath();
          this.ctx.moveTo(1150, 140);
          this.ctx.lineTo(1175, 160);
          this.ctx.lineTo(1175, 120);
          this.ctx.fillStyle = "black";
          this.ctx.fill();
          this.ctx.fillStyle = "grey";
          this.ctx.fillRect(1149,170, 120,250);
          this.ctx.fillStyle = "grey";
          this.ctx.fillRect(1149,49, 120,50);
          this.singleCannon.direction = "east";
        }else if(Util.dist([pos.x, pos.y], [1150,290]) < 55){
          this.ctx.beginPath();
          this.ctx.moveTo(1150, 240);
          this.ctx.lineTo(1175, 260);
          this.ctx.lineTo(1175, 220);
          this.ctx.fillStyle = "black";
          this.ctx.fill();
          this.ctx.fillStyle = "grey";
          this.ctx.fillRect(1149,265, 120,150);
          this.ctx.fillStyle = "grey";
          this.ctx.fillRect(1149,49, 120,150);
          this.singleCannon.direction = "north";
        }else if(Util.dist([pos.x, pos.y], [1150,420]) < 55){
          this.ctx.beginPath();
          this.ctx.moveTo(1150, 370);
          this.ctx.lineTo(1175, 390);
          this.ctx.lineTo(1175, 350);
          this.ctx.fillStyle = "black";
          this.ctx.fill();
          this.ctx.fillStyle = "grey";
          this.ctx.fillRect(1149,49, 120,300);
          this.singleCannon.direction = "south";
        }

        for(let y = 5; y<700; y+=150){
          for(let x = 5; x<1005; x+=150){
            if(Util.dist2([pos.x, pos.y], [x+70,y+70]) < 60 && this.singleCannon.direction === "west"){

              this.singleCannon.pos = [x+35, y+50];
              this.game.addCannons(this.singleCannon);
            }else if(Util.dist2([pos.x, pos.y], [x+70,y+70]) < 60 && this.singleCannon.direction === "east"){

              this.singleCannon.pos = [x+35, y+50];
              this.game.addCannons(this.singleCannon);
            }else if(Util.dist2([pos.x, pos.y], [x+70,y+70]) < 60 && this.singleCannon.direction === "north"){

              this.singleCannon.pos = [x+50, y+30];
              this.game.addCannons(this.singleCannon);
            }else if(Util.dist2([pos.x, pos.y], [x+70,y+70]) < 60 && this.singleCannon.direction === "south"){

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
          this.start();
        }
    });
  }

  increaseSpeed(){
    this.speed +=1;
  }

  resetGame(){
    const game = new Game(this.game.background);
    this.speed = 2;
    this.game = game;
    this.setupmode = true;
    this.ctx.removeEventListener('click');
  }

  animate(){
    this.backgroundImage = new Image();
    this.backgroundImage.src = this.game.background.src;
    this.backgroundImage.onload = () =>{
      this.ctx.drawImage(this.backgroundImage, 5,5, 1000,700);
      this.ctx.drawImage(this.shopWest, 1045,50, 100,50);
      this.ctx.drawImage(this.shopEast, 1045,120, 100,50);
      this.ctx.drawImage(this.shopNorth, 1075,200, 50,100);
      this.ctx.drawImage(this.shopSouth, 1075,320, 50,100);
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
      }
      this.setupmode = true;
      this.setupAnimate();
    } else {
      setTimeout(()=>requestAnimationFrame(this.animate.bind(this)), 35);
    }
  }
}

export default GameView;
