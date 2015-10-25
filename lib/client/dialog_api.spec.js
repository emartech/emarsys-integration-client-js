'use strict';

var DialogApi = require('./dialog_api');

describe('Dialog API', function() {

  var transmitter;
  var dialogApi;
  var fakeDialogId = 1111;

  beforeEach(function() {
    transmitter = {
      messageToEmarsys: this.sandbox.spy(),
      global: {
        addEventListener: this.sandbox.spy()
      }
    };
    dialogApi = new DialogApi(transmitter);
    this.sandbox.stub(dialogApi, 'getDialogId').returns(fakeDialogId);
  });

  describe('public methods', function() {
    var testCases = [
      {
        method: 'confirm',
        input: {
          testKey: 'testValue'
        },
        eventName: 'confirm',
        eventData: {
          testKey: 'testValue',
          dialogId: fakeDialogId
        }
      },
      {
        method: 'close',
        eventName: 'modal:close'
      },
      {
        method: 'modal',
        input: {
          testKey: 'testValue'
        },
        eventName: 'modal',
        eventData: {
          testKey: 'testValue',
          dialogId: fakeDialogId
        }
      }
    ];

    testCases.forEach((test) => {
      it(`#${test.method} should send a proper message`, function() {
        if (test.input) {
          dialogApi[test.method](test.input);
        } else {
          dialogApi[test.method]();
        }

        if (test.eventData) {
          expect(transmitter.messageToEmarsys).to.have.been.calledWith(test.eventName, test.eventData);
        } else {
          expect(transmitter.messageToEmarsys).to.have.been.calledWith(test.eventName);
        }
      });
    });
  });

});
