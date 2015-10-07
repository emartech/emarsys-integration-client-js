'use strict';

var extend = require('extend');

class AlertApi {

  constructor(api) {
    this.api = api;
  }

  send(data) {
    var defaultData = {
      timeout: 1500
    };

    this.api.messageToEmarsys('alert', extend({}, defaultData, data));
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

}

module.exports = AlertApi;
