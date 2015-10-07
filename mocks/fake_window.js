'use strict';

var sinon = require('sinon');
var fakeJQuery = require('./fake_jquery');
var jquery = require('jquery');

class FakeWindow {
  constructor() {
    this.listeners = {};

    this.location = {
      host: 'mocked.tld',
      pathname: 'mocked',
      reload: sinon.stub()
    };

    this.document = {
      getElementById: sinon.stub().returns('fake_element')
    };

    this.Emarsys = {
      config: {
        session_id: 'SESSIONID'
      },
      integration: {
        unload: {
          initialized: false
        },
        dialog: {
          modal: sinon.stub(),
          close: sinon.stub()
        }
      }
    };

    this.postMessage = sinon.stub();

    this.parent = {
      postMessage: sinon.stub()
    };

    this.$ = fakeJQuery.create();
  }

  addEventListener(type, callback) {
    if (!this.listeners[type]) {
      this.listeners[type] = [];
    }

    this.listeners[type].push((data) => callback(data));
  }

  trigger(type, data) {
    if (this.listeners[type]) {
      this.listeners[type].forEach((cb) => cb(data));
    }
  }

  gettext(text) {
    return text;
  }

  resolved(data) {
    var deferred = jquery.Deferred();
    deferred.resolve(data);
    return deferred.promise();
  }

  rejected(data) {
    var deferred = jquery.Deferred();
    deferred.reject(data);
    return deferred.promise();
  }

  static create() {
    return new FakeWindow();
  }
}

module.exports = FakeWindow;
