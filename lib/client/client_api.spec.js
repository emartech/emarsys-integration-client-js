'use strict';

var FakeWindow = require('../../mocks/fake_window');
var ClientApi = require('./client_api');

describe('ClientApi', function() {

  var fakeWindow;
  var clientApi;
  var testEvent = 'foo';
  var testData = {
    key: 'value'
  };

  beforeEach(function() {
    fakeWindow = FakeWindow.create();
    clientApi = new ClientApi({
      global: fakeWindow,
      integrationId: 'test-integration',
      integrationInstanceId: 1111
    });
  });

  describe('#messageToEmarsys', function() {
    it('should call window.parent.postMessage', function() {
      clientApi.messageToEmarsys(testEvent, testData);
      expect(fakeWindow.parent.postMessage).to.have.been.calledWith(JSON.stringify({
        event: testEvent,
        data: testData,
        source: {
          integration_id: clientApi.integrationId,
          integration_instance_id: clientApi.integrationInstanceId
        }
      }), '*');
    });

    it('should call #compileMessage', function() {
      this.sandbox.spy(clientApi, 'compileMessage');

      clientApi.messageToEmarsys(testEvent, testData);
      expect(clientApi.compileMessage).to.have.been.calledWith(testEvent, testData);
    });

    it('should call #setMessageSource', function() {
      this.sandbox.spy(clientApi, 'setMessageSource');

      clientApi.messageToEmarsys(testEvent, testData);
      expect(clientApi.setMessageSource).to.have.been.calledWith({
        event: testEvent,
        data: testData
      });
    });
  });

  describe('#compileMessage', function() {
    it('should return a message object', function() {
      var result = clientApi.compileMessage(testEvent, testData);
      expect(result).to.eql({
        event: testEvent,
        data: testData
      });
    });
  });

  describe('#setMessageSource', function() {
    it('should decorate message object with message source data', function() {
      var result = clientApi.setMessageSource({
        data: testData
      });
      expect(result).to.eql({
        data: testData,
        source: {
          integration_id: clientApi.integrationId,
          integration_instance_id: clientApi.integrationInstanceId
        }
      });
    });
  });

  describe('#messageToService', function() {
    it('should proxy the message', function() {
      this.sandbox.spy(clientApi, 'messageToEmarsys');

      clientApi.messageToService(testEvent, testData, 2222);
      expect(clientApi.messageToEmarsys).to.have.been.calledWith('proxy', {
        event: testEvent,
        envelope: testData,
        integrationInstanceId: 2222
      });
    });
  });

  describe('when calling event-inducing methods', function() {
    var testCases = [
      {
        method: 'resize',
        input: 100,
        eventName: 'resize',
        eventData: {
          height: 100
        }
      },
      {
        method: 'refresh',
        input: null,
        eventName: 'refresh',
        eventData: {}
      },
      {
        method: 'enableButton',
        input: 'e-btn',
        eventName: 'enable_button',
        eventData: {
          selector: 'e-btn'
        }
      }
    ];

    testCases.forEach((test) => {
      it(`#${test.method} should send a proper message`, function() {
        this.sandbox.spy(clientApi, 'messageToEmarsys');
        clientApi[test.method](test.input);
        expect(clientApi.messageToEmarsys).to.have.been.calledWith(test.eventName, test.eventData);
      });
    });
  });


});
