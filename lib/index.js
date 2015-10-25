'use strict';

var extend = require('extend');

var Transmitter = require('./comm/transmitter');

var AlertApi = require('./client/alert_api');
var DialogApi = require('./client/dialog_api');
var MiscApi  = require('./client/misc_api');
var UnloadApi = require('./client/unload_api');

module.exports = {
  init: function(options) {
    var transmitter = new Transmitter(options);

    return extend(
      MiscApi.create(transmitter), {
        alert: AlertApi.create(transmitter),
        dialog: DialogApi.create(transmitter),
        unload: UnloadApi.create(transmitter)
      });
  }
};
