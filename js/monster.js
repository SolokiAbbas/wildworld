
const PATH = {
  first: [0,400],
  second: [400,200],
  third: [200,200],
  fourth: [200,600],
  fifth: [600,600],
  sixth: [600,800],
  seventh: [500,800],
  eighth: [500,1000]
};

class Monsters {
  constructor(options){
    this.name = options.name;
    this.hp = options.hp;
    this.worth = options.worth;
    this.pos = PATH.first;
    this.path = "first";
  }

  move(){
    if(this.path === "first"){
      this.pos[0]+=20;
      if(this.pos[0]>=400){
        this.path = "second";
      }
    }else if(this.path === "second"){
        this.pos[1]-=20;
        if (this.pos[1] === 200){
          this.path = "third";
        }
      }else if (this.path === "third"){
        this.pos[0]+=20;
        if(this.pos[0]>=1000){
          this.path="done";
        }
      }
    }



  pos(num){
    return this.pos[num];
  }

}

export default Monsters;
