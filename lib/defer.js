'use strict';

require('es6-promise').polyfill();

module.exports = function() {
  const deferred = {};
  deferred.promise = new Promise(function(resolve, reject) {
    deferred.resolve = resolve;
    deferred.reject = reject;
  });

  return deferred;
};
