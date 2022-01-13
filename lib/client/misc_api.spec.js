'use strict';

const MiscApi = require('./misc_api');
const Receiver = require('../comm/receiver');

describe('Misc API', () => {
  describe('getUrl', () => {
    it('should send get_url event to parent and resolve with response on success', async () => {
      let responseListener;
      const fakeWindow = {
        addEventListener(event, cb) {
          responseListener = cb;
        }
      };
      const receiver = new Receiver(fakeWindow);
      const transmitter = { messageToEmarsys: sinon.spy() };
      const miscApi = new MiscApi(transmitter, receiver);
      sinon.stub(miscApi, 'getRandomId').returns(14);

      const resultPromise = miscApi.getUrl({ target: 'home' });

      expect(transmitter.messageToEmarsys).to.have.been.calledWith('get_url', {
        eventId: 14,
        target: 'home'
      });

      responseListener({
        data: JSON.stringify({
          event: 'get_url:response',
          data: { id: 14, success: true, url: 'http://ka.csa' },
          source: { integration_id: 'EMARSYS' }
        })
      });

      const result = await resultPromise;
      expect(result.data).to.eql({ id: 14, success: true, url: 'http://ka.csa' });
    });

    it('should reject promise if parent responds with success: false', async () => {
      let responseListener;
      const fakeWindow = {
        addEventListener(event, cb) {
          responseListener = cb;
        }
      };
      const receiver = new Receiver(fakeWindow);
      const transmitter = { messageToEmarsys: sinon.spy() };
      const miscApi = new MiscApi(transmitter, receiver);
      sinon.stub(miscApi, 'getRandomId').returns(14);

      const resultPromise = miscApi.getUrl({ target: 'home' });

      responseListener({
        data: JSON.stringify({
          event: 'get_url:response',
          data: { id: 14, success: false },
          source: { integration_id: 'EMARSYS' }
        })
      });

      try {
        await resultPromise;
        throw new Error('should throw before');
      } catch (error) {
        expect(error.data).to.eql({ id: 14, success: false });
      }
    });

    it('should reject if no response is received within timeout', async () => {
      const receiver = { addMessageHandler: () => {} };
      const transmitter = { messageToEmarsys: sinon.spy() };
      const miscApi = new MiscApi(transmitter, receiver);
      sinon.stub(miscApi, 'getResponseTimeout').returns(10);

      try {
        await miscApi.getUrl({ target: 'home' });
        throw new Error('should throw before');
      } catch (error) {
        expect(error.message).to.eql('No response recieved within timeout');
      }
    });
  });

  describe('public methods', () => {
    var transmitter;
    let receiver;
    var miscApi;

    beforeEach(() => {
      transmitter = {
        messageToEmarsys: sinon.spy()
      };

      receiver = {
        addMessageHandler: sinon.spy()
      };

      miscApi = new MiscApi(transmitter, receiver);

      sinon.stub(miscApi, 'getRandomId').returns(1);
    });

    [
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
        method: 'track',
        input: { test: 'object' },
        eventName: 'track',
        eventData: { test: 'object' }
      }
    ].forEach(test => {
      it(`#${test.method} should send a proper message`, () => {
        miscApi[test.method](test.input);
        expect(transmitter.messageToEmarsys).to.have.been.calledWith(
          test.eventName,
          test.eventData
        );
      });
    });
  });
});
