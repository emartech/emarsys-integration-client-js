'use strict';

var _extend = require('lodash/extend');
var Q = require('q');

var BaseApi = require('./base_api');

class DialogApi extends BaseApi {

  get params() {
    return JSON.parse(document.body.getAttribute('data-params'));
  }

  constructor(transmitter, receiver) {
    super(transmitter);

    this.deferreds = {};
    receiver.addMessageHandler('dialog:submit', this.handleSubmit.bind(this));
  }

  handleSubmit(message) {
    if (this.deferreds[message.data.dialogId]) {
      if (message.data.success) {
        this.deferreds[message.data.dialogId].resolve(message);
      } else {
        this.deferreds[message.data.dialogId].reject(message);
      }

      if (message.data.autoClose !== false) {
        this.close();
      }
    }
  }

  modal(options) {
    return this.dialog('modal', options);
  }

  confirm(options) {
    return this.dialog('confirm', options);
  }

  dialog(dialogType, options) {
    options.dialogId = this.getRandomId();
    this.deferreds[options.dialogId] = Q.defer();

    this.transmitter.messageToEmarsys(dialogType, options);
    return this.deferreds[options.dialogId].promise;
  }

  close() {
    this.transmitter.messageToEmarsys('modal:close');
  }

  submit(success, data) {
    data = data || {};
    var message = this.generateMessageData(success, data);
    this.transmitter.messageToService('dialog:submit', message, this.params.openerIntegrationInstanceId);
  }

  generateMessageData(success, data) {
    data = data || {};

    return _extend({
      dialogId: this.params.dialogId,
      success: success
    }, data);
  }

  static create(transmitter, receiver) {
    var api = new DialogApi(transmitter, receiver);

    return api.exposeMethods([
      'confirm',
      'close',
      'modal',
      'submit'
    ]);
  }

}

module.exports = DialogApi;
