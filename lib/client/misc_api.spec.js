'use strict';

var MiscApi = require('./misc_api');

describe('Misc API', function() {

  var transmitter;
  let receiver;
  var miscApi;

  beforeEach(function() {
    transmitter = {
      messageToEmarsys: sinon.spy()
    };

    receiver = {
      addMessageHandler: sinon.spy()
    };

    miscApi = new MiscApi(transmitter, receiver);

    sinon.stub(miscApi, 'getRandomId').returns(1);
  });

  it('should handle navigate:response event', function() {
    expect(receiver.addMessageHandler).to.have.been.calledWithMatch('navigate:response');
  });

  it('should handle get_url:response event', function() {
    expect(receiver.addMessageHandler).to.have.been.calledWithMatch('get_url:response');
  });

  describe('public methods', function() {
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
      },
      {
        method: 'navigate',
        input: {},
        eventName: 'navigate',
        eventData: { eventId: 1 }
      },
      {
        method: 'getUrl',
        input: {},
        eventName: 'get_url',
        eventData: { eventId: 1 }
      },
      {
        method: 'track',
        input: { test: 'object' },
        eventName: 'track',
        eventData: { test: 'object' }
      }
    ];

    testCases.forEach((test) => {
      it(`#${test.method} should send a proper message`, function() {
        miscApi[test.method](test.input);
        expect(transmitter.messageToEmarsys).to.have.been.calledWith(test.eventName, test.eventData);
      });
    });
  });

});
