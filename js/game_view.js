import Util from './util';
import Cannon from './cannons';

class GameView {
  constructor(game, ctx){
    this.ctx = ctx;
    this.game = game;
    this.setupmode = true;
    this.singleCannon = {name: "Drag", cost: 500};
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
    this.backgroundImage.src = 'images/background/grass.jpg';
    this.backgroundImage.onload = () =>{
      this.ctx.drawImage(this.backgroundImage, 5,5, 1000,700);
      this.ctx.drawImage(this.shopWest, 1045,50, 100,50);
      this.ctx.drawImage(this.shopEast, 1045,120, 100,50);
      this.ctx.drawImage(this.shopNorth, 1075,200, 50,100);
      this.ctx.drawImage(this.shopSouth, 1075,320, 50,100);
    };
    this.clickedShop();
    this.drawGrid();

    requestAnimationFrame(this.setupAnimate.bind(this));
  }


  setupAnimate(){

    if(this.setupmode === true){

      this.game.drawCannons(this.ctx);
      setTimeout(()=>requestAnimationFrame(this.setupAnimate.bind(this)), 35);
    }else {
      this.start();
    }
  }

  start(){
    this.game.addMonster();
    for(let i = 0; i<10; i++){
      this.game.addBullets();
    }
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

          this.singleCannon.direction = "west";
        }else if(Util.dist([pos.x, pos.y], [1150,160]) < 40){

          this.singleCannon.direction = "east";
        }else if(Util.dist([pos.x, pos.y], [1150,290]) < 55){

          this.singleCannon.direction = "north";
        }else if(Util.dist([pos.x, pos.y], [1150,420]) < 55){

          this.singleCannon.direction = "south";
        }

        for(let y = 5; y<700; y+=150){
          for(let x = 5; x<1005; x+=150){
            if(Util.dist2([pos.x, pos.y], [x+70,y+70]) < 60 && this.singleCannon.direction === "west"){
              // alert([x,y]);
              this.singleCannon.pos = [x+35, y+50];
              this.game.addCannons(this.singleCannon);
            }else if(Util.dist2([pos.x, pos.y], [x+70,y+70]) < 60 && this.singleCannon.direction === "east"){
              // alert([x,y]);
              this.singleCannon.pos = [x+35, y+50];
              this.game.addCannons(this.singleCannon);
            }else if(Util.dist2([pos.x, pos.y], [x+70,y+70]) < 60 && this.singleCannon.direction === "north"){
              // alert([x,y]);
              this.singleCannon.pos = [x+50, y+30];
              this.game.addCannons(this.singleCannon);
            }else if(Util.dist2([pos.x, pos.y], [x+70,y+70]) < 60 && this.singleCannon.direction === "south"){
              // alert([x,y]);
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

  drawGrid(){
    for (var x = 5; x < 1000; x += 150) {
      this.ctx.moveTo(x, 5);
      this.ctx.lineTo(x, 605);
    }

    for (var y = 5; y < 750; y += 150) {
      this.ctx.moveTo(5, y);
      this.ctx.lineTo(1000, y);
    }

    this.ctx.strokeStyle = "#C6CCCF";
    this.ctx.stroke();
  }

  animate(){
    this.backgroundImage = new Image();
    this.backgroundImage.src = 'images/background/grass.jpg';
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
    if(this.game.difficulty === 2){
      this.game.increaseMonsterNumbers();
      this.game.addMonster();
    }
    this.game.moveMonsters();
    this.game.fireBullets();
    this.game.draw(this.ctx);
    if(this.game.monsters.length === 0){
      this.setupmode = true;
      this.setupAnimate();
    }
   setTimeout(()=>requestAnimationFrame(this.animate.bind(this)), 35-this.game.difficulty);
  }
}

export default GameView;
