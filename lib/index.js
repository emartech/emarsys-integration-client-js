'use strict';

var AlertApi = require('./client/alert_api');
var ClientApi = require('./client/client_api');
var DialogApi = require('./client/dialog_api');
var UnloadApi = require('./client/unload_api');

module.exports = {
  init: function(options) {
    var clientApi = new ClientApi(options);

    return {
      alert: new AlertApi(clientApi),
      dialog: new DialogApi(clientApi),
      enableButton: clientApi.enableButton.bind(clientApi),
      navigate: clientApi.navigate.bind(clientApi),
      refresh: clientApi.refresh.bind(clientApi),
      resize: clientApi.resize.bind(clientApi),
      unload: new UnloadApi(clientApi)
    };
  }
};
