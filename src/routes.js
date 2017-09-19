'use strict';
angular
  .module('app')
  .config(routesConfig);

/** @ngInject */
function routesConfig ($stateProvider, $urlRouterProvider/*, $locationProvider*/) {

  // $locationProvider.html5Mode(true);// .hashPrefix('!');

  $urlRouterProvider.otherwise('/');
  $urlRouterProvider.otherwise('/login');

  $stateProvider

    // .state('login', {
    //   url: '/login',
    //   template: '<a ui-sref="app">app</a>'
    // })

    .state('app', {
      url: '',
      abstract: '.main',
      // abstract: true,
      resolve: {
        // userData: function (AppService, ezfb, $q, $loading) {
        //   $loading.start('PostToJs');
        //   return ezfb.login()
        //     // .then(function (response) {
        //     //   return $q(function(resolve, reject) {
        //     //       setTimeout(function() {
        //     //         resolve(response);
        //     //       }, 5000);
        //     //     });
        //     // })
        //     .then(function (response) {
        //       // console.log(response.authResponse.userID);
        //       return AppService.getUserData(response.authResponse.accessToken);
        //       // return {
        //       //   idSocialNetwork: response.authResponse.userID
        //       // };
        //     })
        //   // debugger;
        //   // return AppService.getUserData('EAADzSuV8eLABAGlMh3oyiRrUMZCchEZB7byFU06ZAXmXl40ZBEt9Pbbonq0M1sW4jPlBoP8ZBtehWWwIMZApLHE4u4R9ZCTPUAQjloU3LIh1AJtuyZAErCJY8OKnNcezgcE3TzijIJ4BEoG80YCcPYKAPt1GZAu8LtxTiZBRlMjV5xcnVjHcLFtKC5QtNjEwkXV5EZD');
        // },
        user: function (AppService) {
          return AppService.userVerify();
        },
        teamPreview: function (AppService) {
          return AppService.getTeamPreview();
        },
        teamMatchesAlert: function (AppService) {
          return {Matches:[]}; //TODO remover esta linha
          return AppService.teamMatchesAlertView();
        },
        countryList: function (AppService) {
          return AppService.countryList();
        }
      },
      // component: 'app'
      templateUrl: 'app.html',
      controller: 'AppController as $appCtrl'
    });

}
