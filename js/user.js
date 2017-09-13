

class User {
  constructor(){
    this.gold = 500;
    this.cannons = 2;
    this.lives = 3;
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

export default User;
