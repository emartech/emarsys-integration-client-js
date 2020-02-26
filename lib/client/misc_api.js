'use strict';

var BaseApi = require('./base_api');
var defer = require('../defer');

class MiscApi extends BaseApi {

  constructor(transmitter, receiver) {
    super(transmitter);

    this.deferreds = {};
    receiver.addMessageHandler('navigate:response', this.handleResponse.bind(this));
    receiver.addMessageHandler('get_url:response', this.handleResponse.bind(this));
  }

  handleResponse(message) {
    if (message.source.integration_id === BaseApi.EMARSYS) {
      if (this.deferreds[message.data.id]) {
        if (message.data.success) {
          this.deferreds[message.data.id].resolve(message);
        } else {
          this.deferreds[message.data.id].reject(message);
        }
      }
    }
  }

  fit() {
    this.transmitter.messageToEmarsys('fit');
  }

  resize(height) {
    this.transmitter.messageToEmarsys('resize', {
      height: height
    });
  }

  track(options) {
    this.transmitter.messageToEmarsys('track', options);
  }

  refresh() {
    this.transmitter.messageToEmarsys('refresh', {});
  }

  enableButton(selector) {
    this.transmitter.messageToEmarsys('enable_button', {
      selector: selector
    });
  }

  navigate(eventPayload) {
    return this.sendMessage('navigate', eventPayload);
  }

  getUrl(eventPayload) {
    return this.sendMessage('get_url', eventPayload);
  }

  sendMessage(eventName, eventPayload) {
    var eventId = this.getRandomId();
    this.deferreds[eventId] = defer();
    this.transmitter.messageToEmarsys(eventName, Object.assign({}, eventPayload, { eventId: eventId }));
    return this.deferreds[eventId].promise;
  }

  static create(transmitter, receiver) {
    var api = new MiscApi(transmitter, receiver);

    return api.exposeMethods([
      'enableButton',
      'fit',
      'getUrl',
      'navigate',
      'refresh',
      'resize',
      'track'
    ]);
  }
}

module.exports = MiscApi;
