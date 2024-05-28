program = require("program")
creep_builder = require("creep_builder")

class p_room extends program {
  constructor(thread, room) {
    super(thread)
    this.room = room
    this.resources = {}
    this.resources.sources = {}
    this.structures = {}
    this.structures.spawns = {}
    this.spawn_pos = {
      "x": undefined,
      "y": undefined
    }
    this.requested_creeps = []
    this.creeps = []
    
    this.my = null
    
    
  }
  
  init() {
  
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
  
  
  start() {
    console.log("thread was started with: " + JSON.stringify(this.thread))
    if (Game.rooms[this.room].controller !== undefined) {
      if (Game.rooms[this.room].controller.my === true) {
        this.my = true
      } else {
        this.my = false
      }
    }
    
    
    if (this.my) this.my_controlled_room()
    if (!this.my) this.not_my_controlled_room()
    
    this.status = "paused"
  }
  
  resume() {
    console.log("resuming p_room with room name: " + this.room)
    if (this.my) this.my_controlled_room()
    if (!this.my) this.not_my_controlled_room()
    
  }
  
  update_room_sources() {
    let sources = Game.rooms[this.room].find(FIND_SOURCES)
    if (sources.length > 0) {
      for (let s in sources) {
        if (this.resources.sources[sources[s].id] !== undefined) return
        this.resources.sources[sources[s].id] = {}
        this.resources.sources[sources[s].id].pos = sources[s].pos
        this.resources.sources[sources[s].id].miner_pos = {"x": 0, "y": 0}
        this.resources.sources[sources[s].id].thread = this.spawn_child_thread("p_source", this.resources.sources[sources[s].id]).uuid
        
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
    }
  }
  
  update_room_structures() {
    let structs = Game.rooms[this.room].find(FIND_MY_STRUCTURES)
    let construction_sites = Game.rooms[this.room].find(FIND_CONSTRUCTION_SITES);
    
    for (let s in structs) {
      if (structs[s].structureType === "spawn") {
        if (this.structures.spawns[structs[s]] !== undefined) return
        this.structures.spawns[structs[s]] = structs[s]
        this.structures.spawns.thread = this.spawn_child_thread("p_spawn", this.structures.spawns[structs[s]]).uuid
        //console.log("found spawn!")
      }
      //console.log(structs[s])
    }
    //console.log(JSON.stringify(structs))
    console.log(JSON.stringify(this.structures.spawns))
  }
  
  my_controlled_room() {
    this.update_room_structures()
    this.update_room_sources()
    this.check_if_any_requested_creep_has_spawned()
    
  }
  
  not_my_controlled_room() {
  
  }
  
  request_creep(receving_uuid, creep_type) {
    console.log("creep request from: " + receving_uuid + " receved of type: " + creep_type)
    let creep = k.creep_build.request_creeps(this.room, "miner")
    this.requested_creeps.push(creep)
    console.log(JSON.stringify(this.requested_creeps))
    return creep.name
  }
  
  check_if_any_requested_creep_has_spawned() {
    console.log("todo: finish check_if_any_requested_creep_has_spawned game.creeps")
    console.log(JSON.stringify(Game.creeps))
    for (let c in Game.creeps) {
      for (let r in this.requested_creeps) {
        //if(Game.creeps[c].name === this.requested_creeps[r].name){
        //look up splice array logic again think i used it in the sched sort...
        //  console.log("found creep that spawned")
        //}
      }
    }
  }
  
}

module.exports = p_room

//locate all structures in room
//check each structure to see if it needs anything store id's of ones that do and assign threads to them
//store the key uuid pairs somewhere to run against as a reference against
//only one thread allowed on a structure at a time of the same type
