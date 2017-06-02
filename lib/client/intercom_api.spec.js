'use strict';

const IntercomApi = require('./intercom_api');

describe('Intercom API', function() {
  let transmitter;
  let intercomApi;

  beforeEach(function() {
    transmitter = {
      messageToEmarsys: this.sandbox.spy()
    };

    intercomApi = IntercomApi.create(transmitter);
  });

  describe('#trackEvent', function() {
    it('should send a proper message', function() {
      intercomApi.trackEvent('test-name', { test: 'test-value' });

      expect(transmitter.messageToEmarsys).to.have.been.calledWith(
        'intercom:track_event',
        {
          name: 'test-name',
          metadata: { test: 'test-value' }
        }
      );
    });

  });
});
