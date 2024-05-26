p_room = function (process, room) {
  console.log("process was started with: " + JSON.stringify(process))
  console.log("running p_room with id: " + room)
  console.log(Game.rooms[room].controller)
  
  console.log(JSON.stringify(Game.rooms[room]))
  if (Game.rooms[room].controller !== undefined) {
    if (Game.rooms[room].controller.my === true) {
      console.log("room controller in: " + Game.rooms[room].name + " owned by me")
      let structs = Game.rooms[room].find(FIND_MY_STRUCTURES)
      for (let s in structs) {
        if (structs[s].structureType === "spawn") {
          console.log("found spawn!")
          
        }
        console.log(structs[s])
      }
      
      console.log(JSON.stringify(structs))
    } else {
      console.log("room controller in: " + Game.rooms[room].name + " not owned by me")
    }
  }
}
module.exports = p_room
//locate all structures in room
//check each structure to see if it needs anything store id's of ones that do and assign threads to them
//store the key uuid pairs somewhere to run against as a reference against
//only one thread allowed on a structure at a time of the same type
