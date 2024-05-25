let spawn = require('basic starter')
//harvester = require('basic starter').harvester()
module.exports.loop = function () {
  console.log("\n\n\n")
  console.log("starting tick...")
  //console.log(Game.cpu.bucket)
  Game.cpu.generatePixel()
  spawn()
  if (!global.k) {
    global.k = new kernel
    console.log("kernel not found creating...")
  } else {
    global.k.verify_sliver()
  }
  global.k.run()
}

class kernel {
  constructor() {
    this.sched = new scheduler()
    this.valid_tick = Game.time
  }
  
  run() {
    let list_to_run = this.sched.run()
    for (let p in list_to_run) {
      this.exe(list_to_run[p])
    }
  }
  
  test() {
    console.log("test fired")
  }
  verify_sliver() {
    if (this.valid_tick != Game.time - 1) {
      this.valid_tick = Game.time
      console.log("out of date kernel flushing volatile fs files")
      //todo flush volatile fs files
    } else {
      console.log("kernel is running and up to date, current tick time is: " + Game.time)
      this.valid_tick = Game.time
    }
  }
  
  exe(process) {
    
    if (process.name in global && typeof global[process.name] === "function") {
      
      global[process.name](process.args);
    } else {
      console.log("attempted to call a bad program: " + process.name + "with: " + process.args)
      
    }
  }
}

function thread() {
  return
}

class scheduler {
  constructor() {
    this.availible_programs = [
      "p_room",
    ]
    for (let p in this.availible_programs) {
      //this.check_process_in_global(p)
    }
  }
  
  run() {
    let list = []
    list = list.concat(this.room_scheduler())
    return list
  }
  
  room_scheduler() {
    let room_processes = []
    for (let r in Game.rooms) {
      room_processes.push(create_process("p_room", Game.rooms[r].name))
    }
    return room_processes
  }
}

function create_process(p_name, args) {
  let p = {}
  p.name = p_name
  p.args = args
  return p
}

class processes_manager {
  constructor() {
    this.p_room = p_room()
  }
}

function fs() {
  // file system for various memory types
  return
}

global.p_room = function (room) {
  console.log("running p_room with id: " + room)
  console.log(Game.rooms[room].controller)
  console.log(JSON.stringify(Game.rooms[room]))
  if (Game.rooms[room].controller !== undefined) {
    if (Game.rooms[room].controller.my === true) {
      console.log("room controller in: " + Game.rooms[room].name + " owned by me")
    } else {
      console.log("room controller in: " + Game.rooms[room].name + " not owned by me")
    }
  }
//do room stuff
  return
}
