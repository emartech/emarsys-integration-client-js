'use strict';

class Receiver {

  constructor(global) {
    this.window = global;
    this.messageHandlers = {};

    this.window.addEventListener('message', (event) => {
      try {
        this.handleMessage(this.parseMessage(event.data));
      }
      catch (e) {
        console.log(e.message);
        console.log('Message received:', event.data);
      }
    });
  }

  parseMessage(message) {
    if (typeof message === 'string') {
      try {
        message = JSON.parse(message);
      }
      catch (e) {
        throw new Error('Failed to parse message as JSON.');
      }
    } else {
      console.log('Non-string integration messages are deprecated. Message should be a stringified JSON.');
    }

    if (!this.isObject(message)) {
      throw new Error('Parsing the message should result an object.');
    }

    if (!message.hasOwnProperty('event')) {
      throw new Error('Event name missing.');
    }

    if (typeof message.event !== 'string') {
      throw new Error('Event name is not a string.');
    }

    if (!message.hasOwnProperty('source')) {
      throw new Error('Message source missing.');
    }

    if (!this.isObject(message.source)) {
      throw new Error('Message source is not an object.');
    }

    return message;
  }

  handleMessage(message) {
    if (this.messageHandlers[message.event]) {
      this.messageHandlers[message.event](message);
    }
  }

  addMessageHandler(message, callback) {
    this.messageHandlers[message] = callback;
  }

  isObject(subject) {
    var type = typeof subject;
    return type === 'function' || type === 'object' && !!subject;
  }

}

module.exports = Receiver;
