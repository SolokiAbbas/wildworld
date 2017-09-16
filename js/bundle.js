/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

const Util ={
  dist (pos1, pos2) {
    return Math.sqrt(
      Math.pow(pos1[0] - pos2[0]+50, 2) + Math.pow(pos1[1] - pos2[1]+25, 2)
    );
  },
  dist2(pos1,pos2){
    return Math.sqrt(
      Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2)
  );
  }
};


/* harmony default export */ __webpack_exports__["a"] = (Util);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__monster__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__cannons__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__bullets__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__util__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__user__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__sprite_js__ = __webpack_require__(5);







class Game {
  constructor(background, ctx){
    this.bullets = [];
    this.allBullets = {};
    this.cannons = [];
    this.monsters = [];
    this.gap = 50;
    this.user = new __WEBPACK_IMPORTED_MODULE_4__user__["a" /* default */]();
    this.monsterNumbers = 3;
    this.monsterImage = new Image();
    this.monsterImage.src = 'images/monsters/beargif.gif';
    this.cannonImageWest = new Image();
    this.cannonImageWest.src = 'images/cannons/dragon-cannon-west.png';
    this.cannonImageNorth = new Image();
    this.cannonImageNorth.src = 'images/cannons/dragon-cannon-north.png';
    this.cannonImageSouth = new Image();
    this.cannonImageSouth.src = 'images/cannons/dragon-cannon-south.png';
    this.cannonImageEast = new Image();
    this.cannonImageEast.src = 'images/cannons/dragon-cannon-east.png';
    this.bulletImage = new Image();
    this.bulletImage.src = 'images/spr_bullet_strip.png';
    this.hearts = new Image();
    this.hearts.src = 'images/heart.png';
    this.background = background;
    this.ctx = ctx;
    this.sprites = [];
  }

  addBullets(){
    if(this.cannons.length>0){
    for(let i = 0; i<this.cannons.length; i++){
      let options = {};
      switch(this.cannons[i].direction){
        case "south":
        options = {
          pos: [this.cannons[i].pos[0]+16, this.cannons[i].pos[1]+53],
          origin: [this.cannons[i].pos[0]+16, this.cannons[i].pos[1]+53],
          direction: this.cannons[i].direction
        };
        break;
        case "north":
        options = {
          pos: [this.cannons[i].pos[0]+12, this.cannons[i].pos[1]],
          origin: [this.cannons[i].pos[0]+12, this.cannons[i].pos[1]],
          direction: this.cannons[i].direction
        };
        break;
        case "west":
        options = {
          pos: [this.cannons[i].pos[0], this.cannons[i].pos[1]+22],
          origin: [this.cannons[i].pos[0], this.cannons[i].pos[1]+22],
          direction: this.cannons[i].direction
        };
        break;
        case "east":
        options = {
          pos: [this.cannons[i].pos[0]+55, this.cannons[i].pos[1]+12],
          origin: [this.cannons[i].pos[0]+55, this.cannons[i].pos[1]+12],
          direction: this.cannons[i].direction
        };
        break;
    }
      const bull = new __WEBPACK_IMPORTED_MODULE_2__bullets__["a" /* default */](options);
      this.bullets.push(bull);
    }}

  }

  addDifficulty(){
    this.difficulty+=10;
  }

  addGold(){
    setInterval(()=>this.user.addGold(50), 5000);
  }

  currentGold(){
    this.user.showGold();
  }

  drawGold(ctx){
    ctx.font = "26px arial";
    ctx.fillStyle = 'White';
    ctx.fillText(`Gold: ${this.user.showGold()}`, 470, 670);
    ctx.fillText(`Level: ${this.user.currentLevel()}`, 890, 670);
  }

  addCannons(cannon){
    let can = new __WEBPACK_IMPORTED_MODULE_1__cannons__["a" /* default */](cannon);
    let dup = false;
    for(let i = 0; i<this.cannons.length; i++){
      if(this.cannons[i].origin.toString() === can.origin.toString()){
        dup = true;
      }
    }
    let tempGold = this.user.showGold();
    if(dup === false && can.cost <= this.user.showGold()){
      this.user.removeGold(can.cost);
      this.cannons.push(can);
    }
    if(can.cost > tempGold){
      let modal2 = document.getElementById('myModal2');
      let span2 = document.getElementsByClassName("close2")[0];
      modal2.style.display = "block";
      span2.onclick = () => {
        modal2.style.display = "none";
      };
      window.onclick = (event) => {
          if (event.target === modal2) {
            modal2.style.display = "none";
          }
      };
    }
  }

  addMonster(name = "Normal Bear"){
    let options = {
      name: name,
      hp: 1,
      speed: 1,
      worth: 50
    };
    this.removeAllMonsters();
    for(let i=0;i<this.monsterNumbers;i++){
      const mon = new __WEBPACK_IMPORTED_MODULE_0__monster__["a" /* default */](options);
      this.monsters.push(mon);
    }
  }
  removeAllMonsters(){
    this.monsters=[];
  }

  increaseMonsterNumbers(){
    if (this.user.currentLevel() % 2 === 0){
      this.monsterNumbers += 1;
    }
  }

  moveMonsters(speed){
    this.checkCollisions();

    if(this.monsters.length >= 1){
    this.monsters[0].move(speed);
    for(let i=1;i<this.monsters.length;i++){
      let prevMon = this.monsters[i-1];

      if(Math.abs(prevMon.pos[0]-this.monsters[i].pos[0]) > this.gap*3 || Math.abs(prevMon.pos[1]-this.monsters[i].pos[1]) > 0){

        this.monsters[i].move(speed);
      }
    }
    }
  }

  deletAllSprites(){
    this.sprites = [];
  }

  deleteSprite(){
    this.sprites.pop();
  }

  newSpritePos(pos){
    let sprite = new __WEBPACK_IMPORTED_MODULE_5__sprite_js__["a" /* default */](pos, this.ctx);
    this.sprites.push(sprite);
  }

  checkCollisions(){
    let audioPunch = document.getElementById("punch");
    audioPunch.volume = 0.3;
    let k;
    for (let i = 0; i < this.monsters.length; i++) {
      for (let j = 0; j < this.cannons.length; j++) {
        for(k = 0; k<this.allBullets[j].length;k++){
        if(this.monsters.length >= 1 && this.allBullets[j].length>1){
          if(typeof this.monsters[i] === 'undefined' || typeof this.allBullets[j][k] === 'undefined'){
            continue;
          }
          if(this.monsters[i].isCollidedWith(this.allBullets[j][k]) && this.allBullets[j][k].null !== "not real"){
            this.remove(this.monsters[i]);
            this.newSpritePos(this.allBullets[j][k].pos);
            this.user.addGold(50);
            this.nullBullet(j,k);
            audioPunch.play();
            }
          }
        }
        k=0;
      }
    }
  }

  addAllBullets(){
    let j;
    for(let i = 0; i<this.cannons.length; i++){
      this.allBullets[i] = [];
      for(j=1; j<this.bullets.length;j++){
        if(this.bullets[i].origin.toString() === this.bullets[j].origin.toString()){
          this.allBullets[i].push(this.bullets[j]);
        }
      }
      j=i+1;
    }
  }

  outsideBullets(){
    let j;
    for (let i = 0; i < this.cannons.length; i++) {
      for(j = 0; j<this.allBullets[i].length;j++){
          if(this.allBullets[i][j].pos[0]>985 || this.allBullets[i][j].pos[0] < 5){
            this.destroyBullet(i, this.allBullets[i][j]);
          } else if(this.allBullets[i][j].pos[1]>985 || this.allBullets[i][j].pos[1] < 5){
            this.destroyBullet(i, this.allBullets[i][j]);
            }
        }
        j=0;
      }
    }
    removeAllBullets(){
      for(let i=0; i<this.cannons.length;i++){
        this.allBullets[i]=[];
      }
    }

  fireBullets(){
    if(this.monsters.length === 0){
      this.removeAllBullets();
      this.bullets=[];
      this.user.incrementLevels();
    } else{
    for(let i = 0; i<this.cannons.length; i++){
      if(this.allBullets[i].length !== 0){
        this.outsideBullets();
        this.allBullets[i][0].bulletPath();
      for(let j=1;j<this.allBullets[i].length;j++){
        let prevBull = this.allBullets[i][j-1];
        if(Math.abs(prevBull.pos[0]-this.allBullets[i][j].pos[0]) > this.gap*5 || Math.abs(prevBull.pos[1]-this.allBullets[i][j].pos[1]) > 200){
          this.allBullets[i][j].bulletPath();
        }
      }
    }}
  }}

  remove(object){
    this.monsters.splice(this.monsters.indexOf(object), 1);
  }
  destroyBullet(origin, bullet){
    this.allBullets[origin].splice(this.allBullets[origin].indexOf(bullet), 1);
  }

  nullBullet(i,j){
    this.allBullets[i][j].unrealBullet();
  }

  removePreviousCannon(){
    if(this.cannons.length !== 0){
      this.user.addGold(this.cannons.pop().cost);
    }
  }

  isGameOver(){
    if(this.user.showLife() <= 0){
      return true;
    } else {
      return false;
    }
  }

  draw(ctx){

    if (this.sprites.length > 0){
      for(let i = 0; i<this.sprites.length; i++){
        this.sprites[i].drawFrame();
        this.sprites[i].update();
        if(this.sprites[i].delete === true){
          this.deleteSprite();
        }
      }
    }


    let backgroundImage = new Image();
    backgroundImage.src = this.background.src;
    backgroundImage.onload = () =>{
      ctx.drawImage(backgroundImage, 5,5, 1000,700);
      this.cannons.forEach((object)=>{
        switch(object.direction){
          case "north":
            ctx.drawImage(this.cannonImageNorth, object.pos[0], object.pos[1], 50, 75);
            break;
          case "south":
            ctx.drawImage(this.cannonImageSouth, object.pos[0], object.pos[1], 50, 75);
            break;
          case "east":
            ctx.drawImage(this.cannonImageEast, object.pos[0], object.pos[1], 75, 50);
            break;
          case "west":
            ctx.drawImage(this.cannonImageWest, object.pos[0], object.pos[1], 75, 50);
            break;
        }
      });
          this.monsters.forEach((object)=>{
            if(object.pos.toString() !== "5,400"){
              ctx.drawImage(this.monsterImage, object.pos[0],object.pos[1], 100, 50);
              if(object.path === "done" ){
                this.user.removeLife(1);
                this.remove(object);
              }
            }
          }
      );

      for(let i = 0; i<this.user.showLife();i++){
        ctx.drawImage(this.hearts, (i*50)+20, 640, 50, 50);
      }
      let j;
      for(let i = 0; i<this.cannons.length; i++){
        for(j=0; j<this.allBullets[i].length;j++){
          let bull = this.allBullets[i][j];
          if( bull.pos.toString() !== bull.origin.toString() && bull.null !== "not real"){
            ctx.drawImage(this.bulletImage, this.allBullets[i][j].pos[0], this.allBullets[i][j].pos[1], 20,20);
        }}
        j=0;
      }

    };

  }
  drawGrid(ctx){
    for (var x = 5; x < 1000; x += 150) {
      ctx.moveTo(x, 5);
      ctx.lineTo(x, 605);
    }

    for (var y = 5; y < 750; y += 150) {
      ctx.moveTo(5, y);
      ctx.lineTo(1000, y);
    }

    ctx.strokeStyle = "#C6CCCF";
    ctx.stroke();
  }

  drawCannons(ctx){
    let backgroundImage = new Image();
    backgroundImage.src = this.background.src;
    // this.drawGrid(ctx);
    backgroundImage.onload = () =>{

      ctx.drawImage(backgroundImage, 5,5, 1000,700);
      this.drawGold(ctx);
      for(let i = 0; i<this.user.showLife();i++){
        ctx.drawImage(this.hearts, (i*50)+20, 640, 50, 50);
      }

      this.cannons.forEach((object)=>{
        ctx.save();
        switch(object.direction){
          case "north":
            ctx.drawImage(this.cannonImageNorth, object.pos[0], object.pos[1], 50, 75);
            break;
          case "south":
            ctx.drawImage(this.cannonImageSouth, object.pos[0], object.pos[1], 50, 75);
            break;
          case "east":
            ctx.drawImage(this.cannonImageEast, object.pos[0], object.pos[1], 75, 50);
            break;
          case "west":
            ctx.drawImage(this.cannonImageWest, object.pos[0], object.pos[1], 75, 50);
            break;
        }
      });
    };
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Game);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__moving_parts__ = __webpack_require__(4);


class Bullet extends __WEBPACK_IMPORTED_MODULE_0__moving_parts__["a" /* default */] {
  constructor(options){
    super(options);
    this.pos = options.pos.slice();
    this.origin = options.origin;
    this.direction = options.direction;
    this.radius = 10;
    this.null = "real";
  }

  bulletPath(){
    switch(this.direction){
      case "north":
        this.pos[1]-=4;
        break;
      case "south":
        this.pos[1]+=4;
        break;
      case "east":
        this.pos[0]+=4;
        break;
      case "west":
        this.pos[0]-=4;
        break;
      }
    }

    unrealBullet(){
      this.null = "not real";
    }
  }

/* harmony default export */ __webpack_exports__["a"] = (Bullet);


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__bullets__ = __webpack_require__(2);



class Cannon {
  constructor(options){
    this.name = options.name;
    this.pos = options.pos;
    this.origin = options.origin;
    this.cost = options.cost;
    this.direction = options.direction;
  }


}

/* harmony default export */ __webpack_exports__["a"] = (Cannon);


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(0);


class MovingParts{
  constructor(options){
    this.pos = options.pos;
  }

  isCollidedWith(otherObject){
    const center = __WEBPACK_IMPORTED_MODULE_0__util__["a" /* default */].dist(this.pos, otherObject.pos);
    return center < (39);
  }
}

/* harmony default export */ __webpack_exports__["a"] = (MovingParts);


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";



class Sprite {
  constructor(pos, ctx){
    this.ctx = ctx;
    this.spriteWidth = 811;
    this.spriteHeight= 710;
    this.rows = 3;
    this.cols = 3;
    this.width = this.spriteWidth/this.cols;
    this.height = this.spriteHeight/this.rows;
    this.curFrame = 0;
    this.curYFrame = 0;
    this.frameCount = 6;
    this.x = pos[0];
    this.y = pos[1];
    this.srcX = 0;
    this.srcY = 0;
    this.spriteX = new Image();
    this.spriteX.src = 'images/explosion.png';
    this.delete = false;
  }

  updateFrame(){
    this.srcX = this.curFrame * this.width;
    this.srcY = this.curYFrame * this.height;
    // this.ctx.clearRect(this.x,this.y,this.width,this.height);
    if(this.srcX>300){
    this.srcX = 0;
    this.curFrame = 0;
    this.curYFrame +=1;
  }
  if(this.curYFrame > 3){
    this.delete = true;
  }
  this.curFrame = ++this.curFrame % this.frameCount;
  }

  drawFrame(){
    this.ctx.drawImage(this.spriteX,this.srcX,this.srcY,this.width,this.height,this.x-100,this.y-100,this.width,this.height);
  }

  update(){
    this.updateFrame();
  }

}

/* harmony default export */ __webpack_exports__["a"] = (Sprite);


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__cannons__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__game__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__sprite__ = __webpack_require__(5);





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
      this.game.addGold();
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
    this.setupAnimate();
  }


  setupAnimate(){
    window.cancelAnimationFrame(this.requestAnimate);
    if(this.game.sprites.length > 0){
      this.game.deletAllSprites();
    }
    if(this.setupmode === true){
      this.game.drawCannons(this.ctx);
      this.request = requestAnimationFrame(this.setupAnimate.bind(this));
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
    let interactions = function(e){
      const pos = {
        x: e.offsetX,
        y: e.offsetY
      };
        if(__WEBPACK_IMPORTED_MODULE_0__util__["a" /* default */].dist([pos.x, pos.y], [1150,90]) < 40){
          this.ctx.beginPath();
          this.ctx.moveTo(1150, 70);
          this.ctx.lineTo(1175, 90);
          this.ctx.lineTo(1175, 50);
          this.ctx.fillStyle = "black";
          this.ctx.fill();
          this.ctx.fillStyle = "grey";
          this.ctx.fillRect(1149,100, 120,300);
          this.singleCannon.direction = "west";
        }else if(__WEBPACK_IMPORTED_MODULE_0__util__["a" /* default */].dist([pos.x, pos.y], [1150,160]) < 40){
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
        }else if(__WEBPACK_IMPORTED_MODULE_0__util__["a" /* default */].dist([pos.x, pos.y], [1150,290]) < 55){
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
        }else if(__WEBPACK_IMPORTED_MODULE_0__util__["a" /* default */].dist([pos.x, pos.y], [1150,420]) < 55){
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
            if(__WEBPACK_IMPORTED_MODULE_0__util__["a" /* default */].dist2([pos.x, pos.y], [x+70,y+70]) < 60 && this.singleCannon.direction === "west"){
              this.singleCannon.origin =[x,y];
              this.singleCannon.pos = [x+35, y+50];
              this.game.addCannons(this.singleCannon);
            }else if(__WEBPACK_IMPORTED_MODULE_0__util__["a" /* default */].dist2([pos.x, pos.y], [x+70,y+70]) < 60 && this.singleCannon.direction === "east"){
              this.singleCannon.origin =[x,y];
              this.singleCannon.pos = [x+35, y+50];
              this.game.addCannons(this.singleCannon);
            }else if(__WEBPACK_IMPORTED_MODULE_0__util__["a" /* default */].dist2([pos.x, pos.y], [x+70,y+70]) < 60 && this.singleCannon.direction === "north"){
              this.singleCannon.origin =[x,y];
              this.singleCannon.pos = [x+50, y+30];
              this.game.addCannons(this.singleCannon);
            }else if(__WEBPACK_IMPORTED_MODULE_0__util__["a" /* default */].dist2([pos.x, pos.y], [x+70,y+70]) < 60 && this.singleCannon.direction === "south"){
              this.singleCannon.origin =[x,y];
              this.singleCannon.pos = [x+50 , y+30];
              this.game.addCannons(this.singleCannon);
            }
          }
        }
        if(__WEBPACK_IMPORTED_MODULE_0__util__["a" /* default */].dist2([pos.x, pos.y], [1100, 540]) < 30){
          this.game.removePreviousCannon();
        }

        if(__WEBPACK_IMPORTED_MODULE_0__util__["a" /* default */].dist2([pos.x, pos.y], [1100,670]) < 50 && this.setupmode === true){
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
    const game = new __WEBPACK_IMPORTED_MODULE_2__game__["a" /* default */](this.game.background, this.ctx);
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
      }else{
        this.setupmode = true;
        this.setup();
      }

    } else {
      this.requestAnimate = requestAnimationFrame(this.animate.bind(this));

    }
  }
}

/* harmony default export */ __webpack_exports__["a"] = (GameView);


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__moving_parts__ = __webpack_require__(4);


const PATH = {
  first: [5,400],
  second: [400,200],
  third: [200,200],
  fourth: [200,600],
  fifth: [600,600],
  sixth: [600,800],
  seventh: [500,800],
  eighth: [500,1000]
};

class Monsters extends __WEBPACK_IMPORTED_MODULE_0__moving_parts__["a" /* default */] {
  constructor(options){
    super(options);
    this.pos = PATH.first.slice();
    this.name = options.name;
    this.hp = options.hp;
    this.worth = options.worth;
    this.path = "first";
    this.radius = 50;
  }

  move(speed){
    if(this.path === "first"){
      this.pos[0]+=speed;
      if(this.pos[0]>=400 && this.pos[1]===400){
        this.path = "second";
      }
    }else if(this.path === "second"){
        this.pos[1]-=speed;
        if (this.pos[1] <= 280 && this.pos[0]>=400){
          this.path = "third";
        }
      }else if (this.path === "third"){
        this.pos[0]+=speed;
        if(this.pos[0]>=680 && this.pos[1] <=280){
          this.path="fourth";
        }
      }else if(this.path === "fourth"){
        this.pos[1]+=speed;
        if(this.pos[1]>=550 && this.pos[0] >=680){
          this.path="fifth";
        }
      }else if(this.path === "fifth"){
        this.pos[0]+=speed;
        if(this.pos[0]>=920){
          this.path="done";
        }
      }
    }



}

/* harmony default export */ __webpack_exports__["a"] = (Monsters);


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


class User {
  constructor(){
    this.gold = 500;
    this.lives = 4;
    this.levelsPassed = 0;
  }

  incrementLevels(){
    this.levelsPassed +=1;
  }

  currentLevel(){
    return this.levelsPassed;
  }

  showGold(){
    return this.gold;
  }

  addGold(amount){
    this.gold+=amount;
  }

  removeGold(amount){
    this.gold-=amount;
  }

  removeLife(num){
    this.lives-=num;
  }

  showLife(){
    return this.lives;
  }

}

/* harmony default export */ __webpack_exports__["a"] = (User);


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__game__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__game_view__ = __webpack_require__(6);




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

  const game = new __WEBPACK_IMPORTED_MODULE_0__game__["a" /* default */](background, ctx);

  new __WEBPACK_IMPORTED_MODULE_1__game_view__["a" /* default */](game, ctx).setup();

});


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map