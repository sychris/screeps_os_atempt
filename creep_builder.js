//spawnCreep takes (body,name,
// {mem=undefigned,energyStructures = undefigned,dryRun = false,directions=?})

class creep_builder {
  constructor() {
    function role(prefix, mem, parts) {
      this.prefix = prefix
      this.mem = mem
      //parts will be in shorthand format
      this.parts = parts
    }
    
    this.role = {}
    this.role.prefix_dilimeter = "_"
    
    this.role.miner = {}
    this.role.miner.prefix = "M"
    this.role.miner.parts = {}
    this.role.miner.parts.rcl1 = "mwc"
    
    
  }
  
  parts_expander(short_hand_parts) {
    //MOVE,WORK,CARRY,ATTACK,RANGED_ATTACK,HEAL,CLAIM,TOUGH
    //m,w,c,a,r,h,l,t
    let expanded = short_hand_parts
    expanded = expanded.replaceAll("m", "MOVE")
    expanded = expanded.replaceAll("m", "MOVE,")
    expanded = expanded.replaceAll("w", "WORK,")
    expanded = expanded.replaceAll("c", "CARRY,")
    expanded = expanded.replaceAll("a", "ATTACK,")
    expanded = expanded.replaceAll("r", "RANGED_ATTACK,")
    expanded = expanded.replaceAll("h", "HEAL,")
    expanded = expanded.replaceAll("l", "CLAIM,")
    expanded = expanded.replaceAll("t", "TOUGH,")
    expanded = expanded.substring(0, expanded.length - 1)//remove tail ,
    expanded = expanded.split(",") // turn in to array
    return expanded
  }
}
