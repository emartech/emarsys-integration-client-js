'use strict';

var AlertApi = require('./alert_api');

describe('Alert API', function() {

  var transmitter;
  var alertApi;

  beforeEach(function() {
    transmitter = {
      messageToEmarsys: sinon.spy()
    };
  });

  describe('high level methods', function() {
    beforeEach(function() {
      alertApi = new AlertApi(transmitter);
      sinon.spy(alertApi, 'send');
    });

    var testCases = [
      {
        method: 'log',
        input: 'test message',
        eventData: {
          text: 'test message'
        }
      },
      {
        method: 'success',
        input: 'test message',
        eventData: {
          text: 'test message',
          className: 'e-alert-success',
          icon: 'check'
        }
      },
      {
        method: 'info',
        input: 'test message',
        eventData: {
          text: 'test message',
          className: 'e-alert-info',
          icon: 'e-info-circle'
        }
      },
      {
        method: 'warn',
        input: 'test message',
        eventData: {
          text: 'test message',
          className: 'e-alert-warning',
          icon: 'exclamation-circle',
          timeout: 5000
        }
      },
      {
        method: 'error',
        input: 'test message',
        eventData: {
          text: 'test message',
          className: 'e-alert-danger',
          icon: 'exclamation-circle',
          timeout: 5000
        }
      }
    ];

    testCases.forEach((test) => {
      it(`#${test.method} should call #send`, function() {
        alertApi[test.method](test.input);
        expect(alertApi.send).to.have.been.calledWith(test.eventData);
      });
    });
  });

  describe('#send', function() {
    beforeEach(function() {
      alertApi = AlertApi.create(transmitter);
    });

    var testCases = [
      {
        name: 'should apply default if timeout is not set',
        input: {
          text: 'test message'
        },
        eventData: {
          text: 'test message',
          timeout: 1500
        }
      },
      {
        name: 'should use timeout if set',
        input: {
          text: 'test message',
          timeout: 5000
        },
        eventData: {
          text: 'test message',
          timeout: 5000
        }
      }
    ];

    testCases.forEach((test) => {
      it(test.name, function() {
        alertApi.send(test.input);
        expect(transmitter.messageToEmarsys).to.have.been.calledWith('alert', test.eventData);
      });
    });
  });

});
