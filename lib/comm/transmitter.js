'use strict';

class Transmitter {

  constructor(options) {
    this.global = options.global;
    this.integrationId = options.integrationId;
    this.integrationInstanceId = options.integrationInstanceId;
  }

  messageToEmarsys(eventName, data) {
    this.global.parent.postMessage(
      JSON.stringify(
        this.setMessageSource(
          this.compileMessage(eventName, data))), '*');
  }

  messageToService(eventName, data, targetInstanceId) {
    this.messageToEmarsys('proxy', {
      event: eventName,
      envelope: data,
      integrationInstanceId: targetInstanceId
    });
  }

  compileMessage(eventName, data) {
    return {
      event: eventName,
      data: data
    };
  }

  setMessageSource(message) {
    return Object.assign({}, message, {
      source: {
        integration_id: this.integrationId,
        integration_instance_id: this.integrationInstanceId
      }
    });
  }

}

module.exports = Transmitter;
