

class User {
  constructor(){
    this.gold = 500;
    this.cannons = 2;
    this.lives = 3;
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

}

export default User;
