let program = require("program")


class p_source extends program {
  constructor(thread, source) {
    super(thread)
    this.assigned_creep = undefined
    this.source = source
  }
  
  start() {
    console.log("ticking source start")
    if (this.assigned_creep === undefined) {
      this.assigned_creep = global.threads[this.thread.parent].request_creep(this.thread.uuid, "miner")
    }
    this.status = "pause"
    //check if there is a creep for assignment
    //
  }
  
  resume() {
    console.log("p_source")
    console.log(Game.creeps[this.assigned_creep.name] !== undefined)
    console.log(Game.creeps[this.assigned_creep.name].pos.x !== this.source.miner_pos.x)
    console.log(Game.creeps[this.assigned_creep.name].pos.x !== this.source.miner_pos.x)
    console.log("p_source")
    if (Game.creeps[this.assigned_creep.name] !== undefined) {
      
      if (Game.creeps[this.assigned_creep.name].pos.x !== this.source.miner_pos.x ||
        Game.creeps[this.assigned_creep.name].pos.y !== this.source.miner_pos.y) {
        Game.creeps[this.assigned_creep.name].moveTo(this.source.miner_pos.x, this.source.miner_pos.x, {visualizePathStyle: {stroke: '#ffffff'}});
      }
    }
  }
}

module.exports = p_source