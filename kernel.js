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
      let current_thread = this.sched.requested_threads.pop()
      this.exe(current_thread)
      this.sched.finished_threads.push(current_thread)
    }
  }
  
  garbage_collect_old_threads() {
    let count = 0
    let time = Game.cpu.getUsed()
    console.log("collecting garbage")
    console.log(Object.keys(global.threads).length)
    while (this.sched.finished_threads.length > 0) {
      count += 1
      let current_thread = this.sched.finished_threads.pop()
      console.log("attempting garbage collection on: " + current_thread.uuid)
      delete global.threads[current_thread.uuid]
      
    }
    console.log("outstanding threads: " + Object.keys(global.threads).length)
    console.log(JSON.stringify(global.threads))
    console.log(count + " threads cleaned in " + Game.cpu.getUsed() - time + " cpu")
  }
  post_tick() {
    this.garbage_collect_old_threads()
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
    if (global.threads === undefined) {
      global.threads = {}
    }
    //todo the global[thread.name] needs to be set to the uuid and garbage collected at end of tick
    try {
      global.threads[thread.uuid] = new global.programs[thread.name](thread, thread.args);
      global.threads[thread.uuid].run()
    } catch (e) {
      //todo this might want to be in a database dump or otherwise processed
      console.log(e.stack)
    }
  }
}

module.exports = kernel