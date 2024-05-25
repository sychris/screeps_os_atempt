let p_room = require("p_room")

class file_system {
  constructor() {
    //this is volitile and can become stale
    this.V = {}
    this.V_is_stale = false
    this.P = Memory.fs.Perm

    if (Memory.fs === undefined) {
      console.log("WARNING!!!  perminate memory corrupt! if this is expected please run command 'global.k.fs.rebuild_memory'")
    }
  }
  
  //user command rebuilds the memory but dont use it if unneeded as it will destroy all permanent memory
  rebuild_memory() {
    Memory.fs = {}
    Memory.fs.Perm = {}
    
    console.log("memory rebuilt =) have a nice day!")
  }
  
  
}

module.exports = file_system