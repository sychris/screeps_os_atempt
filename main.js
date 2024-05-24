let spawn = require('basic starter')
//harvester = require('basic starter').harvester()
module.exports.loop = function () {
  console.log(Game.cpu.bucket)
  Game.cpu.generatePixel()
  console.log(spawn())
}