const scheduler = require("./scheduler");
const file_system = require("./file_system");


class kernel {
  constructor() {
    this.sched = new scheduler()
    this.fs = new file_system()
    this.valid_tick = Game.time
  }
  
  run() {
    this.init_tick()
    this.tick()
    this.post_tick()
  }
  
  init_tick() {
  
  }
  
  tick() {
    this.sched.run()
    while (this.sched.requested_threads.length > 0) {
      this.exe(this.sched.requested_threads.pop())
    }
  }
  
  post_tick() {
  
  }
  
  uuid() {
    Memory.kernel.UUID = Memory.kernel.UUID + 1
    return "UU" + Memory.kernel.UUID
  }
  verify_sliver() {
    if (this.valid_tick !== Game.time - 1) {
      this.valid_tick = Game.time
      console.log("out of date kernel flushing volatile fs files")
      this.fs.V_is_stale()
    } else {
      console.log("kernel is running and up to date, current tick time is: " + Game.time)
      this.valid_tick = Game.time
    }
  }
  
  exe(thread) {
    
    if (thread.name in global && typeof global[thread.name] === "function") {
      try {
        global[thread.name](thread, thread.args);
      } catch (e) {
        //todo this might want to be in a database dump or otherwise processed
        console.log(e.stack)
      }
    } else {
      console.log("attempted to call a bad program: " + thread.name + "with: " + thread.args)
      
    }
  }
}

module.exports = kernel