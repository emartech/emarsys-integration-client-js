'use strict';

var UpdateHashApi = require('./update_hash_api');

describe('UpdateHash API', function() {

  var transmitter;
  var updateHashApi;

  beforeEach(function() {
    transmitter = {
      messageToEmarsys: sinon.spy()
    };
  });

  describe('set method', function() {
    beforeEach(function() {
      updateHashApi = new UpdateHashApi(transmitter);
    });

    it('set should call #send', function() {
      var testHash = '#/campaigns/new';
      updateHashApi.set(testHash);
      expect(transmitter.messageToEmarsys).to.have.been.calledWith('update_hash', {
        hash: testHash
      });
    });
  });

});
