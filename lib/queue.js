function Queue() {
   this.queue = [];
   this.waiting = [];
};

module.exports = Queue;

Queue.prototype._notify = function() {
  var self = this
    , clients = this.waiting
    , queue = this.queue
    , client
    , item;
  
  if (clients.length && queue.length) {
      client = clients.shift();
      clients.push(client);
      item = queue.shift();
     process.nextTick(function() {
          client(item, function() {
             self._notify()
          });
     });
  }
}

Queue.prototype.push = function push(item) {
  this.queue.push(item);
  this._notify();
}

Queue.prototype.pop = function pop(callback) {
  this.waiting.push(callback);
  this._notify();
}

