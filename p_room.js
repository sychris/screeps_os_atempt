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
module.exports = p_room