let spawn = require('basic starter')
let kernel = require("kernel")


module.exports.loop = function () {
  let sim = false
  console.log("\n\n\n")
  console.log("starting tick...")
  //console.log(Game.cpu.bucket)
  if (!sim) Game.cpu.generatePixel()
  if (Memory.kernel === undefined) {
    console.log("WARNING!!!  permanent memory corrupt! if this is expected please run command 'global.k.fs.rebuild_memory'")
  }
  spawn()
  if (!global.k) {
    global.k = new kernel
    console.log("kernel not found creating...")
  } else {
    global.k.verify_sliver()
  }
  global.k.run()
  if (!sim) console.log(Game.cpu.getUsed() + "cpu used this tick")
}

function thread() {

}



