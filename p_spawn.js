let program = require("program")

class spawn extends program {
  constructor(thread, spawn) {
    super(thread)
    this.spawn = spawn
    
    this.spawning_creep = undefined
    
    
  }
  
  start() {
    this.check_if_parent_has_any_creeps_it_wants_spawned()
    this.status = "paused"
  }
  
  resume() {
  
  }
  
  check_if_parent_has_any_creeps_it_wants_spawned() {
    if (global.threads[this.thread.parent].requested_creeps.length > 0) {
      let qued_creep = global.threads[this.thread.parent].requested_creeps.pop()
      let result = Game.getObjectById(this.spawn.id).spawnCreep(qued_creep.parts, qued_creep.name)
      console.log("atempting spawn: " + result)
      if (result !== 0) {
        global.threads[this.thread.parent].requested_creeps.push(qued_creep)
      } else {
        this.spawning_creep = qued_creep
      }
    }
  }
}

module.exports = spawn