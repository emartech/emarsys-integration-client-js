'use strict';

var extend = require('extend');
var Q = require('q');

class DialogApi {

  get params() {
    return JSON.parse(document.body.getAttribute('data-params'));
  }

  constructor(api) {
    this.api = api;
    this.deferreds = {};
    this.api.global.addEventListener('message', (e) => {
      var message = JSON.parse(e.data);

      if (message.event === 'dialog:submit' && this.deferreds[message.data.dialogId]) {
        if (message.data.success) {
          this.deferreds[message.data.dialogId].resolve(message);
        } else {
          this.deferreds[message.data.dialogId].reject(message);
        }

        this.close();
      }
    });
  }

  modal(options) {
    return this.dialog('modal', options);
  }

  confirm(options) {
    return this.dialog('confirm', options);
  }

  dialog(dialogType, options) {
    options.dialogId = this._getDialogId();
    this.deferreds[options.dialogId] = Q.defer();

    this.api.messageToEmarsys(dialogType, options);
    return this.deferreds[options.dialogId].promise;
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

  _getDialogId() {
    return Math.floor(Math.random() * 10000000);
  }

}

module.exports = DialogApi;
