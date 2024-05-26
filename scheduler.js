class scheduler {
  constructor() {
    this.requested_threads = []
  }
  
  run() {
    this.up_all_thread_priority()
    this.room_scheduler()
    
  }
  
  room_scheduler() {
    for (let r in Game.rooms) {
      this.request_thread(this.create_process("-1", "p_room", Game.rooms[r].name))
    }
  }
  
  create_process(parent, processes_name, args, priority = 500) {
    let p = {}
    p.parent = parent
    p.uuid = global.k.uuid()
    p.name = processes_name
    p.args = args
    p.priority = priority
    return p
  }
  
  request_thread(process) {
    this.requested_threads.push(process)
    this.sort_requests()
  }
  
  sort_requests() {
    this.requested_threads.sort(((a, b) => a.priority - b.priority))
    for (let i = 0; i <= this.requested_threads.length; i++) {
      if (this.requested_threads[i] === undefined || this.requested_threads[i] === null) {
        this.requested_threads.splice(i, 1)
      }
    }
  }
  
  out_thread_requests() {
    console.log("threads currently requested")
    for (let t in this.requested_threads) {
      console.log(JSON.stringify(this.requested_threads[t]))
    }
  }
  
  up_all_thread_priority(count = 1) {
    for (let t in this.requested_threads) {
      this.requested_threads[t].priority = this.requested_threads[t].priority + count
    }
  }
}


module.exports = scheduler