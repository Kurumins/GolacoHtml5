'use strict';
angular
  .module('app', [
    'ui.router',
    'ui.router.default',
    'slickCarousel',
    'ngDialog',
    'lvl.directives.dragdrop',
    'nsPopover'
  ])
  .run(function ($window) {

    $window._gaq = [];
    $window.fbq = null;

    // $window.baseUrl = '/golaco/';
    $window.baseUrl = '/data/';

  })

  .factory('PostToJs', function ($window, $q) {

    var vm = this;

    vm.callbacks = [];

    $window.thisMovie = function () {
      return vm.callbacks;
    };

    // postToJs(actionObj:Object, callbackAS:Function, data:Object = null, signed:Boolean = true, cacheId:Number = -1)
    return function (action, data, signed, cacheId) {

      var deferred = $q.defer();

      vm.callbacks[action] = function (result) {
        if ( result.Success !== false) {
          deferred.resolve(result);
        } else {
          deferred.reject(result);
        }
      };

      $window.doAction(action, action, data, signed || true, cacheId || +new Date() );

      return deferred.promise;

    };
  });
