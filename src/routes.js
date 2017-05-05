'use strict';
angular
  .module('app')
  .config(routesConfig);

/** @ngInject */
function routesConfig ($stateProvider, $urlRouterProvider/*, $locationProvider*/) {

  // $locationProvider.html5Mode(true);// .hashPrefix('!');

  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('app', {
      url: '',
      abstract: true,
      resolve: {
        user: function (AppService) {
          return AppService.auth()
            .then(function (/*result*/) {
              // console.log(result.data.auth);
              return AppService.userVerify();
            });
        },
        teamPreview: function (AppService) {
          return AppService.teamPreview();
        },
        teamMatchesAlert: function (AppService) {
          return AppService.teamMatchesAlertView();
        }
      },
      // component: 'app'
      templateUrl: 'app.html',
      controller: 'AppController as $appCtrl'
    });

}
