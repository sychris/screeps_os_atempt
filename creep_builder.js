//spawnCreep takes (body,name,
// {mem=undefigned,energyStructures = undefigned,dryRun = false,directions=?})

class creep_builder {
  constructor() {
    //usless poop but dont feel like fixing
    this.role = {}
    this.role.prefix_dilimeter = "_"
    
    this.role.miner = {}
    this.role.miner.prefix = "M"
    this.role.miner.parts = {}
    this.role.miner.parts.rcl1 = "mwc"
    
    
  }
  
  /*
  apparently this won't work pre node v15
   */
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
  
  request_creeps(room, type) {
    let creep_data = {}
    if (type === "miner") {
      creep_data.name = this.role.miner.prefix + "_" + k.uuid()
      let energy_available = Game.rooms[room].energyCapacityAvailable
      if (energy_available < 300) console.log("ERROR: less than 300 energy capacity available in creep_builder")
      if (energy_available = 300) creep_data.parts = [MOVE, WORK, CARRY]
      if (energy_available > 300) creep_data.parts = [MOVE, WORK, WORK, CARRY]
      //making this on energy cap available should be more robust
      //switch (Game.rooms[room].controller.level){
      //  case 0:
      //    console.log("bad request of lvl 0 controller level")
      //    break
      //  case 1:
      //    console.log()
      //    break
      //
      //  default:
      //    console.log("bad request of creep_builder: fell to default does room have controller?")
      //}
      //replace all aparently needs node version 15+
      //creep_data.parts = this.parts_expander(creep_data.parts)
      console.log(JSON.stringify(creep_data))
      return creep_data
    }
  }
}

module.exports = creep_builder