'use strict';

var BaseApi = require('./base_api');
var Q = require('q');

class MiscApi extends BaseApi {

  constructor(transmitter, receiver) {
    super(transmitter);

    this.deferreds = {};
    receiver.addMessageHandler('navigate:response', this.handleNavigateResponse.bind(this));
  }

  handleNavigateResponse(message) {
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

  refresh() {
    this.transmitter.messageToEmarsys('refresh', {});
  }

  enableButton(selector) {
    this.transmitter.messageToEmarsys('enable_button', {
      selector: selector
    });
  }

  navigate(options) {
    options.eventId = this.getRandomId();
    this.deferreds[options.eventId] = Q.defer();
    this.transmitter.messageToEmarsys('navigate', options);
    return this.deferreds[options.eventId].promise;
  }

  static create(transmitter, receiver) {
    var api = new MiscApi(transmitter, receiver);

    return api.exposeMethods([
      'enableButton',
      'fit',
      'navigate',
      'refresh',
      'resize'
    ]);
  }
}

module.exports = MiscApi;
