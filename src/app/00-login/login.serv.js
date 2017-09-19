'use strict';
angular.module('app')
  .service('LoginService', function ($window, $http, PostToJs) {

    var vm = this;

    // vm.getFbDetails = function (accessToken) {
    //   return $http.post($window.baseUrl + 'Account/GetFbDetails', {
    //       AccessToken: accessToken
    //     })
    //     .then(function (result) {
    //       return vm.userData = result.data.UserData;
    //     });
    // };

  });
