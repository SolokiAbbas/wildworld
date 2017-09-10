import MovingParts from './moving_parts';

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

class Monsters extends MovingParts {
  constructor(options){
    super(options);
    this.pos = PATH.first.slice();
    this.name = options.name;
    this.hp = options.hp;
    this.worth = options.worth;
    this.path = "first";
    this.radius = 50;
  }

  move(){
    if(this.path === "first"){
      this.pos[0]+=5;
      if(this.pos[0]===400){
        this.path = "second";
      }
    }else if(this.path === "second"){
        this.pos[1]-=5;
        if (this.pos[1] === 200){
          this.path = "third";
        }
      }else if (this.path === "third"){
        this.pos[0]+=5;
        if(this.pos[0]===705){
          this.path="fourth";
        }
      }else if(this.path === "fourth"){
        this.pos[1]+=5;
        if(this.pos[1]===550){
          this.path="fifth";
        }
      }else if(this.path === "fifth"){
        this.pos[0]+=5;
        if(this.pos[0]>=920){
          this.path="done";
        }
      }
    }



}

export default Monsters;
