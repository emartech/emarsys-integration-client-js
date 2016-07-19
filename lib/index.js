'use strict';

var _extend = require('lodash/extend');

var Transmitter = require('./comm/transmitter');
var Receiver = require('./comm/receiver');

var AlertApi = require('./client/alert_api');
var DialogApi = require('./client/dialog_api');
var MiscApi = require('./client/misc_api');
var UnloadApi = require('./client/unload_api');
var UpdateHashApi = require('./client/update_hash_api');

module.exports = {
  init: function(options) {
    var transmitter = new Transmitter(options);
    var receiver = new Receiver(options.global);

    return _extend({
      messageToEmarsys: transmitter.messageToEmarsys.bind(transmitter),
      messageToService: transmitter.messageToService.bind(transmitter),
      addMessageHandler: receiver.addMessageHandler.bind(receiver)
    },
    MiscApi.create(transmitter, receiver), {
      alert: AlertApi.create(transmitter),
      dialog: DialogApi.create(transmitter, receiver),
      updateHash: UpdateHashApi.create(transmitter),
      unload: UnloadApi.create(transmitter)
    });
  },
  comm: {
    Transmitter: Transmitter,
    Receiver: Receiver
  },
  api: {
    Alert: AlertApi,
    Dialog: DialogApi,
    Misc: MiscApi,
    Unload: UnloadApi,
    UpdateHash: UpdateHashApi
  }
};
