'use strict';

var extend = require('extend');

var BaseApi = require('./base_api');

class AlertApi extends BaseApi {

  send(data) {
    var defaultData = {
      timeout: 1500
    };

    this.transmitter.messageToEmarsys('alert', extend({}, defaultData, data));
  }

  log(text) {
    this.send({
      text: text
    });
  }

  success(text) {
    this.send({
      text: text,
      className: 'e-alert-success',
      icon: 'check'
    });
  }

  info(text) {
    this.send({
      text: text,
      className: 'e-alert-info',
      icon: 'e-info-circle'
    });
  }

  warn(text) {
    this.send({
      text: text,
      className: 'e-alert-warning',
      icon: 'exclamation-circle',
      timeout: 5000
    });
  }

  error(text) {
    this.send({
      text: text,
      className: 'e-alert-danger',
      icon: 'exclamation-circle',
      timeout: 5000
    });
  }

  static create(transmitter) {
    var api = new AlertApi(transmitter);

    return api.exposeMethods([
      'send',
      'log',
      'success',
      'info',
      'warn',
      'error'
    ]);
  }

}

module.exports = AlertApi;
