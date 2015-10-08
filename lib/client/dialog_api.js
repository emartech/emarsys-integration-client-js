'use strict';

var extend = require('extend');

class DialogApi {

  get params() {
    return JSON.parse(document.body.getAttribute('data-params'));
  }

  constructor(api) {
    this.api = api;
  }

  modal(options) {
    this.api.messageToEmarsys('modal', options);
  }

  confirm(options) {
    this.api.messageToEmarsys('confirm', options);
  }

  close() {
    this.api.messageToEmarsys('modal:close');
  }

  submit(success, data) {
    data = data || {};
    var message = this.generateMessageData(success, data);
    this.api.messageToService('dialog:submit', message, this.params.openerIntegrationInstanceId);
  }

  generateMessageData(success, data) {
    data = data || {};

    return extend({
      dialogId: this.params.dialogId,
      success: success
    }, data);
  }


}

module.exports = DialogApi;
