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
        userData: function (AppService, ezfb, $q, $loading) {
          $loading.start('PostToJs');
          return ezfb.login()
            // .then(function (response) {
            //   return $q(function(resolve, reject) {
            //       setTimeout(function() {
            //         resolve(response);
            //       }, 5000);
            //     });
            // })
            .then(function (response) {
              // console.log(response.authResponse.userID);
              return AppService.getUserData();
              // return {
              //   idSocialNetwork: response.authResponse.userID
              // };
            })
        },
        user: function (AppService, userData) {
          return AppService.userVerify(userData);
        },
        teamPreview: function (AppService, userData) {
          return AppService.getTeamPreview();
        },
        teamMatchesAlert: function (AppService, userData) {
          return AppService.teamMatchesAlertView();
        },
        countryList: function (AppService, userData) {
          return AppService.countryList();
        }
      },
      // component: 'app'
      templateUrl: 'app.html',
      controller: 'AppController as $appCtrl'
    });

}
