'use strict';
angular
  .module('app', [
    'ui.router',
    'ui.router.default',
    'ct.ui.router.extras',
    'slickCarousel',
    'ngDialog',
    'lvl.directives.dragdrop',
    'nsPopover',
    'angular.filter',
    'darthwade.dwLoading',
    'angularMoment',
    'ngSanitize'
  ])
  .config(function ($qProvider) {
    $qProvider.errorOnUnhandledRejections(false);
  })

  .run(function ($window) {

    $window._gaq = [];
    $window.fbq = null;

    $window.baseUrl = '/golaco/';
    // $window.baseUrl = '/data/';

  })

  .factory('PostToJs', function ($window, $q, $loading, AlertPopup) {

    var vm = this;

    vm.callbacks = [];

    $window.thisMovie = function () {
      return vm.callbacks;
    };

    // postToJs(actionObj:Object, callbackAS:Function, data:Object = null, signed:Boolean = true, cacheId:Number = -1)
    return function (action, data, signed, cacheId) {

      var deferred = $q.defer();

      vm.callbacks[action] = function (result) {

        if ( result.Success !== false && result.Sucess !== false ) {
          deferred.resolve(result);
        } else {
          if (result.Message === 'LabelNotEnoughCredit' || result.Message === 'LabelNotEnoughMoney') {
            AlertPopup.open('Atenção', 'Popup a ser criado: ' + result.Message);
          } else {
            deferred.reject(result);
          }
        }

        delete vm.callbacks[action];

        if ( Object.size(vm.callbacks) === 0 ) {
          $loading.finish('PostToJs');
        }

      };

      $loading.start('PostToJs');

      deferred.promise.noLoading = function () {
        if ( Object.size(vm.callbacks) === 1 ) {
          $loading.finish('PostToJs');
        }
        return deferred.promise;
      };

      $window.doAction(action, action, data, signed || true, cacheId || +new Date() );

      return deferred.promise;

    };
  });

Object.size = function (obj) {
  var size = 0, key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      size++;
    }
  }
  return size;
};
