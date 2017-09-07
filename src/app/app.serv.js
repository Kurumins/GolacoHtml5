'use strict';
angular.module('app')
.service('AppService', function (PostToJs, $http, $window) {

  var vm = this;

  // this.auth = function () {
  //   return $http.get('/data/Container/Auth', {
  //     'socket_id': '215916.7788328',
  //     'channel_name': 'private-1602447546449533',
  //   });
  // };

  vm.getUserData = function (accessToken) {
    // return PostToJs('userData')
    //   .then(function (result) {
    //     return vm.userData = result;
    //   });
    // return PostToJs('Account/SignIn', {
    //   email: '434@email.com',
    //   password: '123',
    //   rememberMe: false
    // })
    //   .then(function (result) {
    //     return vm.user = result;
    //   });
    // return PostToJs('Account/GetFbDetails', {
    return $http.post($window.baseUrl + 'Account/GetFbDetails', {
        AccessToken: accessToken
      })
      .then(function (result) {
        // debugger;
        return vm.userData = result.data.UserData;
      });
  };

  vm.userVerify = function (userData) {
    // debugger;
    return PostToJs('User/Verify', {
      idCity: userData.IdCity,
      idCountry: userData.IdCountry,
      idState: userData.IdState
    })
      .then(function (result) {
        return vm.user = result;
      });
  };

  vm.getTeamPreview = function () {
    return PostToJs('Team/Preview')
      .then(function (result) {
        return vm.teamPreview = result;
      });
  };

  vm.missionList = function () {
    return PostToJs('Mission/List');
  };

  vm.teamMatchesAlertView = function () {
    return PostToJs('Team/MatchesAlertView');
  };

  vm.countryList = function () {
    return $http.get('/data/countryList');
  };

  vm.getCurrentUploadBadge = function (idTeam) {
    return PostToJs('Team/GetCurrentUploadBadge', { IdTeam: idTeam });
  };

});
