'use strict';

var BaseApi = require('./base_api');

class UnloadApi extends BaseApi {

  init(options) {
    this.transmitter.messageToEmarsys('unload:init', options);
  }

  reset(selector) {
    this.transmitter.messageToEmarsys('unload:reset', {
      selector: selector
    });
  }

  static create(transmitter) {
    var api = new UnloadApi(transmitter);

    return api.exposeMethods([
      'init',
      'reset'
    ]);
  }

}

module.exports = UnloadApi;
