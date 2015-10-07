'use strict';

var sinon = require('sinon');

class FakeIframe {
  constructor() {
    this.contentWindow = {
      postMessage: sinon.stub()
    };
  }

  static create() {
    return new FakeIframe();
  }
}

module.exports = FakeIframe;
