class EventBus {
    constructor() {
        this.listeners = {};
    }
  
    on(event, callback) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        console.log(`ON::${event}:${callback}`)
        this.listeners[event].push(callback);
    }
  
    off(event, callback) {
        if (!this.listeners[event]) {
            throw new Error(`Нет события: ${event}`);
        }
        console.log(`OFF::${event}:${callback}`)
        this.listeners[event] = this.listeners[event].filter(
            listener => listener !== callback
        );
    }
  
    emit(event, ...args) {
        if (!this.listeners[event]) {
            throw new Error(`Нет события: ${event}`);
        }
        console.log(`EMIT::${event}:${{...args}}`)
        this.listeners[event].forEach(function(listener) {
            listener(...args);
        });
    }
}

export { EventBus };
