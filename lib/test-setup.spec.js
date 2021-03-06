'use strict';

var sinon = require('sinon');
var chai = require('chai');
var sinonChai = require('sinon-chai');

before(function() {
  chai.use(sinonChai);
  global.expect = chai.expect;
  global.sinon = sinon;
});

afterEach(function() {
  sinon.restore();
});
