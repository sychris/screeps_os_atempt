let program = require("program")

//the name of the bot running on the os
class creepx extends program {
  constructor(thread) {
    super(thread);
  }
  
  //bot only handles one room atm so it just spins it up and goes
  start() {
    for (let r in Game.rooms) {
      this.spawn_child_thread("p_room", Game.rooms[r].name)
    }
    this.status = "paused"
  }
  
  //this is where you would implement multi room stuffs
  resume() {
  
  }
  
  
}

module.exports = creepx
