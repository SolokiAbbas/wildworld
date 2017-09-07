import Util from './util';

class MovingParts{
  constructor(options){
    this.pos = options.pos;
  }

  isCollidedWith(otherObject){
    const center = Util.dist(this.pos, otherObject.pos);
    return center < (60);
  }
}

export default MovingParts;
