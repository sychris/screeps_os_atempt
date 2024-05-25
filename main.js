let spawn = require('basic starter')
let kernel = require("kernel")

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
  console.log("P")
  let test = {}
  global.k.fs.P.test = "test"
  console.log(JSON.stringify(global.k.fs.P))
  global.k.fs.P.asdf = "asdf"
  console.log(JSON.stringify(global.k.fs.P))
  global.k.fs.P.asdf = "jkl"
  console.log(JSON.stringify(global.k.fs.P))
  delete global.k.fs.P.asdf
  console.log(JSON.stringify(global.k.fs.P))
  
  console.log("V")
  global.k.fs.V.test = "test"
  console.log(JSON.stringify(global.k.fs.V))
  global.k.fs.V.asdf = "asdf"
  console.log(JSON.stringify(global.k.fs.V))
  global.k.fs.V.asdf = "jkl"
  console.log(JSON.stringify(global.k.fs.V))
  delete global.k.fs.V.asdf
  console.log(JSON.stringify(global.k.fs.V))
  
  
}


function thread() {
  return
}



