'use strict';

var sinon = require('sinon');
var jquery = require('jquery');

class FakeJQuery extends Array {
  constructor() {
    super();

    this.removeClass = sinon.stub();

    this.off = sinon.stub();

    this.remove = sinon.stub();

    this.push({
      contentWindow: {
        postMessage: sinon.stub()
      }
    });
  }

  static create() {
    var retval = sinon.stub().returns(new FakeJQuery());
    retval.extend = Object.assign;
    retval.Deferred = jquery.Deferred;
    return retval;
  }
}

module.exports = FakeJQuery;
