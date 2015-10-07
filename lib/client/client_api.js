'use strict';

var extend = require('extend');

class ClientApi {

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
    return extend({}, message, {
      source: {
        integration_id: this.integrationId,
        integration_instance_id: this.integrationInstanceId
      }
    });
  }

  resize(height) {
    this.messageToEmarsys('resize', {
      height: height
    });
  }

  refresh() {
    this.messageToEmarsys('refresh', {});
  }

  enableButton(selector) {
    this.messageToEmarsys('enable_button', {
      selector: selector
    });
  }

}

module.exports = ClientApi;
