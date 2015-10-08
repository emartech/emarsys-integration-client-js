'use strict';

class UnloadApi {

  constructor(api) {
    this.api = api;
  }

  init(options) {
    this.api.messageToEmarsys('unload:init', options);
  }

  reset(selector) {
    this.api.messageToEmarsys('unload:reset', {
      selector: selector
    });
  }

}

module.exports = UnloadApi;
