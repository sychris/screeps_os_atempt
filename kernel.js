const scheduler = require("./scheduler");
const file_system = require("./file_system");
const creep_builder = require("creep_builder")

class kernel {
  constructor() {
    this.sched = new scheduler()
    this.fs = new file_system()
    this.creep_build = new creep_builder()
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
    //todo this is where we need to do cpu management
    this.sched.run()
    
    for (let t in global.threads) {
      this.sched.threads_to_tick.push(global.threads[t].thread)
    }
    while (this.sched.threads_to_tick.length > 0) {
      let current_thread = this.sched.threads_to_tick.pop()
      this.resume_thread(current_thread)
      
    }
    
    while (this.sched.requested_threads.length > 0) {
      let current_thread = this.sched.requested_threads.pop()
      this.exe(current_thread)
      
    }
  }
  
  get_surviving_children(children) {
    //we need to look 2 places running threads and thread que
    let survivers = []
    for (let child in children) {
      if (global.threads[children[child]] !== undefined) survivers.push(children[child])
      for (let requested of this.sched.requested_threads) {
        if (this.sched.requested_threads[requested].uuid === children[child]) {
          survivers.push(children[child])
        }
      }
    }
    return survivers
  }
  
  garbage_collect_old_threads() {
    let count = 0
    let time = Game.cpu.getUsed()
    let running_threads = []
    
    for (let t in global.threads) {
      running_threads.push(global.threads[t].thread)
    }
    console.log("collecting garbage on " + running_threads.length + " threads")
    
    while (running_threads.length > 0) {
      count += 1
      let collected = false
      let current_thread = running_threads.pop()
      if (global.threads[current_thread.uuid].status === "finished") {   // no more processing
        if (global.threads[current_thread.uuid].safe_to_kill() === true) { //try not to create orphans
          console.log("attempting garbage collection on: " + current_thread.uuid)
          collected = true
          delete global.threads[current_thread.uuid]
        }
      }
      if (collected === false) {
        
        if (global.threads[current_thread.uuid].status === "paused") {
          this.sched.que_thread_request()
        } else {
          if (global.threads[current_thread.uuid].status === "running") {
            console.log("warning attempted to garbage collect running thread this probably means you forgot to pause it")
            console.log(global.threads[current_thread.uuid].thread)
          }
          
          
        }
      }
    }
    
    console.log("outstanding threads: " + Object.keys(global.threads).length)
    console.log(JSON.stringify(global.threads))
    let used_cpu = Game.cpu.getUsed() - time
    console.log(count + " threads cleaned in " + used_cpu + " cpu")
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
    
    try {
      global.threads[thread.uuid] = new global.programs[thread.name](thread, thread.args);
      global.threads[thread.uuid].run()
    } catch (e) {
      //todo this might want to be in a database dump or otherwise processed
      console.log(JSON.stringify(thread))
      console.log(e.stack)
    }
  }
  
  resume_thread(thread) {
    try {
      global.threads[thread.uuid].run()
    } catch (e) {
      //todo this might want to be in a database dump or otherwise processed
      console.log(JSON.stringify(thread))
      console.log(e.stack)
    }
  }
}

module.exports = kernel