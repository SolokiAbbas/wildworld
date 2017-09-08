import MovingParts from './moving_parts';

class Bullet extends MovingParts {
  constructor(options){
    super(options);
    this.pos = options.pos.slice();
    this.origin = options.origin;
    this.direction = options.direction;
    this.radius = 10;
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
  }

export default Bullet;
