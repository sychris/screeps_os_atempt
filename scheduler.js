class scheduler {
  constructor() {
    //kinda the meat and potatoes here
    this.requested_threads = []
    this.threads_to_tick = []
  }
  
  //if we up all threads that didnt run every thing will eventually run
  //really though you need to drop them after they run as well
  //than set a modifyer for events like attacks
  //but yea never got around to it
  run() {
    this.up_all_thread_priority()
    this.launch_bot()
    
  }
  
  //starts the p_creepx program with the forced uuid of uu0 for easy reference to the top of the food chain
  launch_bot() {
    if (global.threads === undefined) global.threads = {}
    if (global.threads["UU0"] === undefined) {
      let bot = this.create_thread("-1", "p_creepx")
      //manual overide the uuid.  should not mave to do this any other time
      bot.uuid = "UU0"
      console.log(bot)
      this.que_thread_request(bot)
      console.log(this.requested_threads)
    }
    console.log(this.requested_threads)
    console.log(JSON.stringify(global.threads))
    
  }
  
  //tons of usage just a blueprint for making threads
  create_thread(parent, processes_name, args = [], priority = 500) {
    let thread = {}
    thread.parent = parent
    thread.uuid = global.k.uuid()
    thread.name = processes_name
    thread.args = args
    thread.priority = priority
    return thread
  }
  
  
  que_thread_request(thread) {
    this.requested_threads.push(thread)
    this.sort_thread_que()
  }
  
  //for priority again not really used but there for when its needed
  sort_thread_que() {
    this.requested_threads.sort(((a, b) => a.priority - b.priority))
    for (let i = 0; i <= this.requested_threads.length; i++) {
      if (this.requested_threads[i] === undefined || this.requested_threads[i] === null) {
        this.requested_threads.splice(i, 1)
      }
    }
  }
  
  //this us for debugging in the game console erm k.sched.out_thread_requests
  //dont think i ever used it...
  out_thread_requests() {
    console.log("threads currently requested")
    for (let t in this.requested_threads) {
      console.log(JSON.stringify(this.requested_threads[t]))
    }
  }
  
  //yep
  up_all_thread_priority(count = 1) {
    for (let t in this.requested_threads) {
      this.requested_threads[t].priority = this.requested_threads[t].priority + count
    }
  }
}


module.exports = scheduler