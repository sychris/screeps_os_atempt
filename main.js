let spawn = require('basic starter')
let kernel = require("kernel")


module.exports.loop = function () {
  //you know because generatePixel doesent work in sim...
  let sim = false
  console.log("\n\n\n")
  console.log("starting tick...")
  //console.log(Game.cpu.bucket)
  if (!sim) Game.cpu.generatePixel()
  //yea this could be moved or a basic check done but w/e
  if (Memory.kernel === undefined) {
    console.log("WARNING!!!  permanent memory corrupt! if this is expected please run command 'global.k.fs.rebuild_memory'")
  }
  //some tutorial code to watch while working on the os
  spawn()
  
  //how we chase the non believers away ^^
  if (!global.k) {
    global.k = new kernel
    console.log("kernel not found creating...")
  } else {
    //just checks this tick -1 vs last tick make sure were not jumping vm's
    global.k.verify_sliver()
  }
  global.k.run()
  if (!sim) console.log(Game.cpu.getUsed() + "cpu used this tick")
}



