'use strict';

class BaseApi {

  static get EMARSYS() { return 'EMARSYS'; }

  constructor(transmitter) {
    this.transmitter = transmitter;
  }

  getRandomId() {
    return Math.floor(Math.random() * 10000000);
  }

  exposeMethods(methodList) {
    return methodList.reduce((memo, methodName) => {
      memo[methodName] = this[methodName].bind(this);
      return memo;
    }, {});
  }

}

module.exports = BaseApi;
