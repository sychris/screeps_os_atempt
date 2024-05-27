program = require("program")

class p_room extends program {
  constructor(thread, room) {
    super(thread)
    this.room = room
    this.resources = {}
    this.resources.sources = {}
    this.spawn_pos = {
      "x": undefined,
      "y": undefined
    }
    
    this.my = null
    
    this.init()
  }
  
  init() {
    if (Game.rooms[this.room].controller !== undefined) {
      if (Game.rooms[this.room].controller.my === true) {
        this.my = true
      } else {
        this.my = false
      }
    }
    let sources = Game.rooms[this.room].find(FIND_SOURCES)
    if (sources.length > 0) {
      let ids = []
      for (let s in sources) {
        this.resources.sources[sources[s].id] = {}
        this.resources.sources[sources[s].id].pos = sources[s].pos
        this.resources.sources[sources[s].id].miner_pos = {"x": 0, "y": 0}
        
        let passable = this.look_for_passable_around_point(sources[s].pos.x, sources[s].pos.y)
        if (passable.plains.length > 0) {
          this.resources.sources[sources[s].id].miner_pos =
            {"x": passable.plains[0][0], "y": passable.plains[0][1]}
        } else {
          if (passable.swamp > 0) {
            this.resources.sources[sources[s].id].miner_pos =
              {"x": passable.swamp[0][0], "y": passable.swamp[0][1]}
          } else console.log("ERROR in: " + this.room + "found source that is not accessible!")
        }
        
      }
      console.log(JSON.stringify(this.resources.sources))
    }
  }
  
  /**
   * takes an x,y pos and returns an object with passable planes and swamps as arrays
   * {"plains":[[40,41],[41,41],[41,42]],"swamp":[]}
   * @param x
   * @param y
   * @returns {"plains":[],"swamp":[]}
   */
  look_for_passable_around_point(x, y) {
    const terrain = Game.rooms[this.room].getTerrain()
    let plains = []
    let swamp = []
    let passable = {}
    
    for (const dx of [-1, 0, 1]) {
      for (const dy of [-1, 0, 1]) {
        if (dx === 0 && dy === 0) continue;
        let tx = x + dx
        let ty = y + dy
        if (terrain.get(tx, ty) === 0) plains.push([tx, ty])
        if (terrain.get(tx, ty) === 2) swamp.push([tx, ty])
      }
    }
    
    passable.plains = plains
    passable.swamp = swamp
    return passable
  }
  
  
  run() {
    console.log("thread was started with: " + JSON.stringify(this.thread))
    console.log("running p_room with room name: " + this.room)
    console.log(Game.rooms[this.room].controller)
    console.log(JSON.stringify(this.resources.sources))
    console.log(JSON.stringify(this.spawn_pos))
    
    if (this.my) {
      console.log("room controller in: " + Game.rooms[this.room].name + " owned by me")
      let structs = Game.rooms[this.room].find(FIND_MY_STRUCTURES)
      
      for (let s in structs) {
        if (structs[s].structureType === "spawn") {
          this.spawn_pos.x = structs[s].pos.x
          this.spawn_pos.y = structs[s].pos.y
          console.log("fount spawn!")
        }
        console.log(structs[s])
        
      }
      console.log(JSON.stringify(structs))
      
      
    } else {
      console.log("room in: " + Game.rooms[this.room] + " is not owned by me :(")
    }
  }
  
}


module
  .exports = p_room

//locate all structures in room
//check each structure to see if it needs anything store id's of ones that do and assign threads to them
//store the key uuid pairs somewhere to run against as a reference against
//only one thread allowed on a structure at a time of the same type
