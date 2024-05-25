let spawn = require('basic starter')
let kernel = require("kernel")

module.exports.loop = function () {
  console.log("\n\n\n")
  console.log("starting tick...")
  //console.log(Game.cpu.bucket)
  Game.cpu.generatePixel()
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
}

function thread() {

}



