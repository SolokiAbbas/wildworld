
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


export default Util;
