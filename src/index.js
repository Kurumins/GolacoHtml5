'use strict';
angular
  .module('app', [
    'ui.router',
    'ui.router.default',
    'slickCarousel',
    'ngDialog'
  ])
  .run(function ($window, $q) {

    var vm = {};

    $window._gaq = [];
    $window.fbq = null;

    vm.callbacks = [];

    $window.thisMovie = function () {
      return vm.callbacks;
    };

    $window.baseUrl = '/golaco/';

    // $window._doAction = $window.doAction;

    // postToJs(actionObj:Object, callbackAS:Function, data:Object = null, signed:Boolean = true, cacheId:Number = -1)
    $window.postToJs = function (action, callback, data, signed, cacheId) {

      var deferred = $q.defer();

      vm.callbacks[callback] = function (result) {
        if ( result.Success !== false) {
          deferred.resolve(result);
        } else {
          deferred.reject(result);
        }
      };

      $window.doAction(action, callback, data, signed || true, cacheId || +new Date() );

      return deferred.promise;

    };

  });
