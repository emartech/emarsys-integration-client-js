'use strict';

var ClientApi = require('./client/client_api');
var AlertApi = require('./client/alert_api');
var DialogApi = require('./client/dialog_api');
var UnloadApi = require('./client/unload_api');

module.exports = {
  init: function(options) {
    var clientApi = new ClientApi(options);

    return {
      dialog: new DialogApi(clientApi),
      enableButton: clientApi.enableButton.bind(clientApi),
      alert: new AlertApi(clientApi),
      refresh: clientApi.refresh.bind(clientApi),
      resize: clientApi.resize.bind(clientApi),
      navigate: clientApi.navigate,
      unload: new UnloadApi(clientApi)
    };
  }
};
