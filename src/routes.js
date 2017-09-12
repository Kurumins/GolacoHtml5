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
              return AppService.getUserData(response.authResponse.accessToken);
              // return {
              //   idSocialNetwork: response.authResponse.userID
              // };
            })
          // debugger;
          // return AppService.getUserData('EAADzSuV8eLABAGlMh3oyiRrUMZCchEZB7byFU06ZAXmXl40ZBEt9Pbbonq0M1sW4jPlBoP8ZBtehWWwIMZApLHE4u4R9ZCTPUAQjloU3LIh1AJtuyZAErCJY8OKnNcezgcE3TzijIJ4BEoG80YCcPYKAPt1GZAu8LtxTiZBRlMjV5xcnVjHcLFtKC5QtNjEwkXV5EZD');
        },
        user: function (AppService, userData) {
          return AppService.userVerify(userData);
        },
        teamPreview: function (AppService, userData) {
          return AppService.getTeamPreview();
        },
        teamMatchesAlert: function (AppService, userData) {
          return {Matches:[]}; //TODO remover esta linha
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
