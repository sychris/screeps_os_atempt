let program = require("program")

class creepx extends program {
  constructor(thread) {
    super(thread);
  }
  
  start() {
    for (let r in Game.rooms) {
      this.spawn_child_thread("p_room", Game.rooms[r].name)
    }
    this.status = "paused"
  }
  
  resume() {
  
  }
  
  
}

module.exports = creepx
