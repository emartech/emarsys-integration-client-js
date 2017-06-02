'use strict';

const BaseApi = require('./base_api');

class IntercomApi extends BaseApi {

  trackEvent(name, metadata) {
    this.transmitter.messageToEmarsys(
      'intercom:track_event',
      { name, metadata }
    );
  }

  static create(transmitter) {
    const api = new IntercomApi(transmitter);

    return api.exposeMethods([
      'trackEvent'
    ]);
  }

}

module.exports = IntercomApi;
