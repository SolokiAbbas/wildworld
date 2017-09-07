import MovingParts from './moving_parts';

class Bullet extends MovingParts {
  constructor(options){
    super(options);
    this.pos = options.pos.slice();
    this.origin = options.pos.slice();
    this.direction = options.direction;
    this.radius = 10;
  }

  bulletPath(){
    switch(this.direction){
      case "north":
        this.pos[1]-=5;
        break;
      case "south":
        this.pos[1]+=5;
        break;
      case "east":
        this.pos[0]+=5;
        break;
      case "west":
        this.pos[0]-=5;
        break;
    }
  }
}

export default Bullet;
