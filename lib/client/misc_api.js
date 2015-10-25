'use strict';

var BaseApi = require('./base_api');

class MiscApi extends BaseApi {

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
    this.transmitter.messageToEmarsys('navigate', options);
  }

  static create(transmitter) {
    var api = new MiscApi(transmitter);

    return api.exposeMethods([
      'enableButton',
      'navigate',
      'refresh',
      'resize'
    ]);
  }
}

module.exports = MiscApi;
