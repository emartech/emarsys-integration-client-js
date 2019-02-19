'use strict';

var FakeWindow = require('../../mocks/fake_window');
var Transmitter = require('./transmitter');

describe('Transmitter', function() {

  var fakeWindow;
  var transmitter;
  var testEvent = 'foo';
  var testData = {
    key: 'value'
  };

  beforeEach(function() {
    fakeWindow = FakeWindow.create();
    transmitter = new Transmitter({
      global: fakeWindow,
      integrationId: 'test-integration',
      integrationInstanceId: 1111
    });
  });

  describe('#messageToEmarsys', function() {
    it('should call window.parent.postMessage', function() {
      transmitter.messageToEmarsys(testEvent, testData);
      expect(fakeWindow.parent.postMessage).to.have.been.calledWith(JSON.stringify({
        event: testEvent,
        data: testData,
        source: {
          integration_id: transmitter.integrationId,
          integration_instance_id: transmitter.integrationInstanceId
        }
      }), '*');
    });

    it('should call #compileMessage', function() {
      sinon.spy(transmitter, 'compileMessage');

      transmitter.messageToEmarsys(testEvent, testData);
      expect(transmitter.compileMessage).to.have.been.calledWith(testEvent, testData);
    });

    it('should call #setMessageSource', function() {
      sinon.spy(transmitter, 'setMessageSource');

      transmitter.messageToEmarsys(testEvent, testData);
      expect(transmitter.setMessageSource).to.have.been.calledWith({
        event: testEvent,
        data: testData
      });
    });
  });

  describe('#compileMessage', function() {
    it('should return a message object', function() {
      var result = transmitter.compileMessage(testEvent, testData);
      expect(result).to.eql({
        event: testEvent,
        data: testData
      });
    });
  });

  describe('#setMessageSource', function() {
    it('should decorate message object with message source data', function() {
      var result = transmitter.setMessageSource({
        data: testData
      });
      expect(result).to.eql({
        data: testData,
        source: {
          integration_id: transmitter.integrationId,
          integration_instance_id: transmitter.integrationInstanceId
        }
      });
    });
  });

  describe('#messageToService', function() {
    it('should proxy the message', function() {
      sinon.spy(transmitter, 'messageToEmarsys');

      transmitter.messageToService(testEvent, testData, 2222);
      expect(transmitter.messageToEmarsys).to.have.been.calledWith('proxy', {
        event: testEvent,
        envelope: testData,
        integrationInstanceId: 2222
      });
    });
  });

});
