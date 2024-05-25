// noinspection JSUnusedGlobalSymbols

global.p_room = require("p_room")

class file_system {
  constructor() {
    //this is volatile and can become stale
    this.V = {}
    this.P = Memory.fs.Perm
    
    // noinspection PointlessBooleanExpressionJS
    if (Memory.fs === undefined) {
      console.log("WARNING!!!  permanent memory corrupt! if this is expected please run command 'global.k.fs.rebuild_memory'")
    }
  }
  
  //user command rebuilds the memory but don't use it if unneeded as it will destroy all permanent memory
  rebuild_memory() {
    Memory.fs = {}
    Memory.fs.Perm = {}
    
    console.log("memory rebuilt =) have a nice day!");
  }
  
  V_is_stale() {
    this.V = {}
    
  }
  
  
}

module.exports = file_system