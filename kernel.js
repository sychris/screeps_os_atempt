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
    let list_to_run = this.sched.run()
    for (let p in list_to_run) {
      this.exe(list_to_run[p])
    }
  }
  
  post_tick() {
  
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
  
  exe(process) {
    
    if (process.name in global && typeof global[process.name] === "function") {
      try {
        global[process.name](process.args);
      } catch (e) {
        //todo this might want to be in a database dump or otherwise processed
        console.log(e.stack)
      }
    } else {
      console.log("attempted to call a bad program: " + process.name + "with: " + process.args)
      
    }
  }
}

module.exports = kernel