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

module.exports = scheduler