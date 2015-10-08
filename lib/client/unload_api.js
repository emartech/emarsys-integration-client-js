'use strict';

class UnloadApi {

  constructor(api) {
    this.api = api;
  }

  init(options) {
    this.api.messageToEmarsys('unload:init', options);
  }

  reset(selection) {
    this.api.messageToEmarsys('unload:reset', {
      selection: selection
    });
  }

}

module.exports = UnloadApi;
