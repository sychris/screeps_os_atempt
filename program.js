class program {
  constructor(thread) {
    this.thread = thread
    /**
     * "not_init" //Default not yet ran
     * "running"  //do not garbage collect
     * "paused"  //waiting on other tasks
     * "finished" //garbage collect
     * @type {string}
     */
    this.status = "not_init"
    this.children = []
  }
  
  
  run() {
    if (this.status === "not_init") {
      this.status = "running"
      this.start()
      
    }
    if (this.status === "paused") {
      this.resume()
    }
    if (this.status === "finished") return
    
  }
  
  /** start the thread
   *
   */
  start() {
    this.status = "finished"
  }
  
  /**
   * this should be called when we are in a paused state and it needs to take further action i.e next tick
   */
  resume() {
  
  }
  
  safe_to_kill() {
    this.children = k.get_surviving_children(this.children)
    return this.children.length === 0
  }
  
  spawn_child_thread(process_name, args = undefined, priority = 500) {
    let thread = k.sched.create_thread(this.thread.uuid, process_name, args, priority = 500)
    this.children.push(thread.uuid)
    k.sched.que_thread_request(thread)
    return thread
  }
  
  
  
}

module.exports = program