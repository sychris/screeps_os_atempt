//all programs you write get required in fs
//seamed fitting
p_room = require("p_room")
p_creepx = require("p_creepx")
p_source = require("p_source")
p_spawn = require("p_spawn")

//and nor global stuff ><
global.programs = {
  p_room,
  p_creepx,
  p_source,
  p_spawn,
}

//really thought there would be more to this...   there really should be
//prolly where tons of stuff lived if I didn't make everything global
class file_system {
  constructor() {
    //this is volatile and can become stale(or so i thought)
    this.V = {}
    this.P = Memory.fs.Perm
    
    //todo replace with basic check... ie.  if(Memory.kernel === undefined)
    if (Memory.fs === undefined) {
      console.log("WARNING!!!  permanent memory corrupt! if this is expected please run command 'global.k.fs.rebuild_memory'")
    }
  }
  
  //user command rebuilds the memory but don't use it if unneeded as it will destroy all permanent memory
  rebuild_memory() {
    Memory.fs = {}
    Memory.fs.Perm = {}
    Memory.kernel = {}
    Memory.kernel.UUID = 0
    
    
    console.log("memory rebuilt =) have a nice day!");
  }
  
  V_is_stale() {
    this.V = {}
    
  }
  
  
}

module.exports = file_system