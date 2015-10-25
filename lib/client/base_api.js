'use strict';

class BaseApi {

  constructor(transmitter) {
    this.transmitter = transmitter;
  }

  exposeMethods(methodList) {
    return methodList.reduce((memo, methodName) => {
      memo[methodName] = this[methodName].bind(this);
      return memo;
    }, {});
  }

}

module.exports = BaseApi;
