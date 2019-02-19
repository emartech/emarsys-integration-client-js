'use strict';

var FakeWindow = require('../../mocks/fake_window');
var Receiver = require('./receiver');

describe('Receiver', function() {
  var fakeWindow;
  var receiver;

  beforeEach(function() {
    fakeWindow = FakeWindow.create();
    receiver = new Receiver(fakeWindow);
  });

  describe('#parseMessage', function() {
    var receiverSpy;

    beforeEach(function() {
      receiver = new Receiver(fakeWindow);
      receiverSpy = sinon.spy(receiver, 'parseMessage');
    });

    var testCases = [
      {
        name: 'should throw an error for non-json string messages',
        message: 'testMessage'
      },
      {
        name: 'should throw an error for non-object json string messages',
        message: 'true'
      },
      {
        name: 'should throw an error for messages with no event set',
        message: '{"data":"testData"}'
      },
      {
        name: 'should throw an error for messages with event not an string',
        message: '{"event":1234}'
      },
      {
        name: 'should throw an error for messages with no source set',
        message: '{"event":"testEvent"}'
      },
      {
        name: 'should throw an error for messages with source not an object',
        message: '{"event":"testEvent","source":"testSource"}'
      }
    ];

    testCases.forEach(function(testCase) {
      it(testCase.name, function() {
        try {
          receiver.parseMessage(testCase.message);
        } catch (e) {
          //no-op
        }

        expect(receiverSpy.threw()).to.be.true;
      });
    });

    it('should return message if object for backward compatibility reasons', function() {
      var message = {
        event: 'testEvent',
        source: {
          testKey: 'testValue'
        }
      };
      var parsedMessage = receiver.parseMessage(message);
      expect(parsedMessage).to.eql(message);
    });

    it('should return message as object if all is good', function() {
      var message = {
        event: 'testEvent',
        source: {
          testKey: 'testValue'
        }
      };
      var parsedMessage = receiver.parseMessage(JSON.stringify(message));
      expect(parsedMessage).to.eql(message);
    });
  });

  describe('#addMessageHandler', function() {
    var eventName = 'foo';
    var messageHandler = 'fakeMessageHandler';

    it('should register message handler function', function() {
      receiver.addMessageHandler(eventName, messageHandler);
      expect(receiver.messageHandlers[eventName]).to.eql([messageHandler]);
    });
  });

  describe('#handleMessage', function() {
    var message;

    beforeEach(function() {
      receiver.messageHandlers = {
        foo: [sinon.spy()],
        bar: [sinon.spy()]
      };
      message = {
        event: 'foo',
        source: {
          testKey: 'testValue'
        }
      };
    });

    it('should call message handler function if it is set', function() {
      receiver.handleMessage(message);
      expect(receiver.messageHandlers.foo[0]).to.have.been.calledWith(message);
    });

    it('should trigger "foo" handler when receiving a "foo" event', function() {
      var eventData = {
        event: 'foo',
        source: {}
      };

      fakeWindow.trigger('message', {
        data: JSON.stringify(eventData)
      });
      expect(receiver.messageHandlers.foo[0]).to.have.been.calledWith(eventData);
    });

    it('should not trigger "bar" handler when receiving a "foo" event', function() {
      var eventData = {
        event: 'foo',
        source: {}
      };

      fakeWindow.trigger('message', {
        data: JSON.stringify(eventData)
      });
      expect(receiver.messageHandlers.bar[0]).to.have.callCount(0);
    });
  });
});
