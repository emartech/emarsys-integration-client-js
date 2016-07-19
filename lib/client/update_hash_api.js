'use strict';

var BaseApi = require('./base_api');

class UpdateHashApi extends BaseApi {

  set(hash) {
    this.transmitter.messageToEmarsys('update_hash', { hash: hash });
  }

  static create(transmitter) {
    var api = new UpdateHashApi(transmitter);

    return api.exposeMethods([
      'set'
    ]);
  }

}

module.exports = UpdateHashApi;
