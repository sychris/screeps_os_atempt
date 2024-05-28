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
    this.status = "not_init"// no real point in not just starting in running
    this.children = []
  }
  
  
  /**
   * this is called by the kernel and generally should not be overridden
   */
  run() {
    if (this.status === "not_init") {
      this.status = "running"
      this.start()
      
    }
    //generally this would be called on tick 2+ of the event and is for maintenance
    if (this.status === "paused") {
      this.resume()
    }
    if (this.status === "finished") return
    
  }
  
  /** start the thread
   *
   */
  start() {
    //if you don't override this than the thread is useless so just set it to finished for cleanup
    this.status = "finished"
  }
  
  /**
   * this should be called when we are in a paused state and it needs to take further action i.e next tick
   */
  resume() {
  
  }
  
  /**
   * this is here so you dont orphen threads but idk if its even really needed in most cases
   * @returns {boolean}
   */
  safe_to_kill() {
    this.children = k.get_surviving_children(this.children)
    return this.children.length === 0
  }
  
  /**
   *
   * @param process_name  // program to be run
   * @param args          // any args the new program needs
   * @param priority      //I never really used this but its for cpu scheduling making sure nothing gets left behind
   * @returns {*}         //mostly so you can get the uuid back to the caller
   */
  spawn_child_thread(process_name, args = undefined, priority = 500) {
    let thread = k.sched.create_thread(this.thread.uuid, process_name, args, priority = 500)
    this.children.push(thread.uuid)
    k.sched.que_thread_request(thread)
    return thread
  }
  
  
  
}

module.exports = program