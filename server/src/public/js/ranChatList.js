class ranChatList {
    constructor() {
      this.ranChatQueue = [];
    }

    getRanChatQueue() {
        return ranChatQueue;
    }
  
    enqueue(item) {
      this.ranChatQueue.push(item);
    }
  
    dequeue() {
      if (this.isEmpty()) {
        return null;
      }
      return this.ranChatQueue.shift();
    }
  
    front() {
      if (this.isEmpty()) {
        return null;
      }
      return this.ranChatQueue[0];
    }
  
    isEmpty() {
      return this.ranChatQueue.length === 0;
    }
  
    size() {
      return this.ranChatQueue.length;
    }
  
    clear() {
      this.ranChatQueue = [];
    }
  }
  
  module.exports = ranChatList;