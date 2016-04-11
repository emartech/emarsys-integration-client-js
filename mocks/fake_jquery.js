'use strict';

var sinon = require('sinon');
var _extend = require('lodash/extend');
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
    retval.extend = _extend;
    retval.Deferred = jquery.Deferred;
    return retval;
  }
}

module.exports = FakeJQuery;
