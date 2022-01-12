'use strict';

const Transmitter = require('./comm/transmitter');
const Receiver = require('./comm/receiver');

const AlertApi = require('./client/alert_api');
const DialogApi = require('./client/dialog_api');
const MiscApi = require('./client/misc_api');
const UnloadApi = require('./client/unload_api');
const UpdateHashApi = require('./client/update_hash_api');
const IntercomApi = require('./client/intercom_api');

module.exports = {
  init: function(options) {
    const transmitter = new Transmitter(options);
    const receiver = new Receiver(options.global);

    return Object.assign(
      {
        messageToEmarsys: transmitter.messageToEmarsys.bind(transmitter),
        messageToService: transmitter.messageToService.bind(transmitter),
        addMessageHandler: receiver.addMessageHandler.bind(receiver)
      },
      MiscApi.create(transmitter, receiver),
      {
        alert: AlertApi.create(transmitter),
        dialog: DialogApi.create(transmitter, receiver),
        updateHash: UpdateHashApi.create(transmitter),
        unload: UnloadApi.create(transmitter),
        intercom: IntercomApi.create(transmitter)
      }
    );
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
    UpdateHash: UpdateHashApi,
    Intercom: IntercomApi
  }
};
