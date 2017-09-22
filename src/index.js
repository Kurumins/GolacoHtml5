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
    'ngSanitize',
    'pascalprecht.translate',
    'xml',
    'tmh.dynamicLocale',
    'ezfb',
    'ngStorage'
  ])
  .config(function ($qProvider) {
    $qProvider.errorOnUnhandledRejections(false);
  })

  .config(function (ezfbProvider) {
    ezfbProvider.setInitParams({
      // This is my FB app id for plunker demo app
      appId: '267503003269296'
    });
  })

  .factory('xmlTranslateInterceptor', function (x2js) {
    function responseHandler (response) {
      if (response && response.config.isTranslate) {

        var data = x2js.xml_str2json(response.data);

        response.data = data.i18n.section.reduce(function (data, section) {
          if ( section.key instanceof Array) {
            data[section._id] = section.key.reduce(function (data, key) {
              data[key._key] = key.toString();
              return data;
            }, {});
          } else if (section.key) {
            data[section._id] = {};
            data[section._id][section.key._key] = section.key.toString();
          }
          return data;
        }, {});

        return response;
      } else {
        return response;
      }
    }
    function responseErrorHandler(response) {
      if (response && responseIsXml(response)) {
        response.data = x2js.xml_str2json(response.data);
      }
      return response;
    }
    return {
      response: responseHandler,
      responseError: responseErrorHandler
    };
  })

  .factory('missingTranslationHandler', function ($translate, $filter) {
    function getLocalizedString(result, strParts, translationTable) {
      if ((strParts.length > 1)) {

        for (var i = 1; i < strParts.length; i++) {

          var tmpStr = strParts[i].slice(1);
          switch(strParts[i].charAt()) {

            case "d":
              result = result.replace("@" + i.toString(), $filter('date')(tmpStr, 'shortDate'));
              break;
            case "$":
              result = result.replace("@" + i.toString(), $filter('currency')(tmpStr));
              break;
            case "n":
              result = result.replace("@" + i.toString(), $filter('number')(tmpStr));
              break;
            case "t":
              result = result.replace("@" + i.toString(), tmpStr);
              break;
            case "p":
              result = result.replace("@" + i.toString(), translationTable["Ordinals." + tmpStr]);
              break;
            case "c":
              result = result.replace("@" + i.toString(), $filter('number')(tmpStr));
              break;
            case "s":
              result = result.replace("@" + i.toString(), tmpStr);
              break;
            // case "l":
            //   result = result.replace("@" + i.toString(), getLocalizedString('*', tmpStr));
            //   break;
          }
        }
      }

      return result;
    }

    return function (translationId, $uses, interpolateParams, defaultTranslationText, sanitizeStrategy) {
      var strParts = translationId.split(';'),
        translationTable = $translate.getTranslationTable($uses);
      return translationTable && translationTable[strParts[0]] && getLocalizedString(translationTable[strParts[0]], strParts, translationTable);
    }
  })

  .config(function($translateProvider, $httpProvider) {

    $httpProvider.interceptors.push('xmlTranslateInterceptor');

    $translateProvider.useStaticFilesLoader({
        prefix: 'i18n/',
        suffix: '.xml',
        $http: {
          isTranslate: true
        }
      });

    $translateProvider.useMissingTranslationHandler('missingTranslationHandler');

  })

  .config(function(tmhDynamicLocaleProvider) {
    tmhDynamicLocaleProvider.localeLocationPattern('i18n/angular-locale_{{locale}}.js');
  })

  .run(function ($window, $translate) {

    $window._gaq = [];
    $window.fbq = null;

    $window.baseUrl = '/game/';
    // $window.baseUrl = 'http://beta.golacogame.com.br/game/';
    // $window.baseUrl = '/data/';

    $.ajaxSetup({
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });

    // $translate.use($window.navigator.language || $window.navigator.userLanguage);

  })

  .factory('PostToJs', function ($window, $q, $loading, AlertPopup) {

    var vm = this;

    vm.callbacks = [];

    $window.thisMovie = function () {
      return vm.callbacks;
    };

    // postToJs(actionObj:Object, callbackAS:Function, data:Object = null, signed:Boolean = true, cacheId:Number = -1)
    return function (action, data, signed, cacheId, callback) {

      var deferred = $q.defer();

      vm.callbacks[callback || action] = function (result) {
        result = JSON.parse( JSON.stringify(result).split('http://beta.golacogame.com.br/game/Container/Index').join('https://www.golacogame.com.br/') );

        if ( result && result.Success !== false && result.Sucess !== false ) {
          deferred.resolve(result);
        } else {
          if (result && (result.Message === 'LabelNotEnoughCredit' || result.Message === 'LabelNotEnoughMoney')) {
            AlertPopup.open('Atenção', 'Popup a ser criado: ' + result.Message);
          } else {
            deferred.reject(result);
          }
        }

        delete vm.callbacks[callback || action];

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

      $window.doAction(action, callback || action, data, signed || true, cacheId || +new Date() );

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
