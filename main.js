let spawn = require('basic starter')
//harvester = require('basic starter').harvester()
module.exports.loop = function () {
  console.log("starting tick...")
  //console.log(Game.cpu.bucket)
  Game.cpu.generatePixel()
  spawn()
  if(!global.k){
    global.k = new kernel
    console.log("kernel not found creating...")
  }else{
    global.k.verify_sliver()
  }
  global.k.run()
  console.log(JSON.stringify(Game.rooms))
  
}
class kernel{
  constructor() {
    this.sched = new scheduler()
    this.valid_tick = Game.time
  }
  run(){
    this.sched.run()
  }
  verify_sliver(){
    if(this.valid_tick != Game.time -1){
      this.valid_tick = Game.time
      console.log("out of date kernel flushing volatile fs files")
      //todo flush volatile fs files
    }else{
      console.log("kernel is running and up to date, current tick time is: " + Game.time)
      this.valid_tick = Game.time
    }
  }
  
  exe(process_name){
  
  }
}
function thread(){
  return
}

class scheduler{
  constructor() {
  }
  run(){
    return
  }
}
function fs(){
  // file system for various memory types
  return
}
function p_room(){
  //do room stuff
  return
}
