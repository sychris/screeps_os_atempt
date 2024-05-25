let p_room = require("p_room")

class file_system {
  constructor() {
    this.v = {}
    this.P = Memory.fs
    if (Memory.fs === undefined) {
      console.log("WARNING!!!  perminate memory corrupt! if this is expected please run command 'global.k.fs.rebuild_memory'")
    }
  }
  
  write_out_P_mem() {
    Memory.fs.Perm = this.P
  }
  
  rebuild_memory() {
    Memory.fs = {}
    Memory.fs.Perm = {}
    
    console.log("memory rebuilt =) have a nice day!")
  }
  
  link_programs() {
  
  }
  
  // file system for various memory types
  parmanent() {
    return
  }
  
  volitile() {
  
  }
  
}

module.exports = file_system