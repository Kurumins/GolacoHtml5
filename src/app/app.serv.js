'use strict';
angular.module('app')
.service('AppService', function (PostToJs, $http, $window, $sessionStorage) {

  var vm = this;

  vm.userData = $sessionStorage.userData;

  // this.auth = function () {
  //   return $http.get('/data/Container/Auth', {
  //     'socket_id': '215916.7788328',
  //     'channel_name': 'private-1602447546449533',
  //   });
  // };

  vm.getFbDetails = function (accessToken) {
    // return PostToJs('userData')
    //   .then(function (result) {
    //     return vm.userData = result;
    //   });
    // return PostToJs('Account/SignIn', {
    //   email: '434@email.com',
    //   password: '123',
    //   rememberMe: false
    // })
    return $http.post($window.baseUrl + 'Account/GetFbDetails', {
        AccessToken: accessToken
      }/*, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      }*/)
      .then(function (result) {
        // $window.firstLogin = result.firstLogin,
        // $window.locale = result.locale,
        // $window.teamEvents = result.teamEvents,
        // $window.token = null;//result.token;

        // var userData = result.data.UserData

        // $window.ConsecutiveDays = userData.ConsecutiveDays;
        // $window.email = userData.Email;
        // $window.gender = userData.Gender;
        // $window.IdCity = userData.IdCity;
        // $window.IdCountry = userData.IdCountry;
        // $window.idSocialNetwork = userData.IdSocialNetwork;
        // $window.IdState = userData.IdState;
        // $window.picture = userData.Picture;
        // $window.profile = userData.Profile;
        // $window.refCode = userData.RefCode;
        // $window.refUrl = userData.RefUrl;
        // $window.socialNetwork = userData.SocialNetwork;
        // $window.userName = userData.Name;

        // debugger;
        return vm.userData = $sessionStorage.userData = result.data.UserData;
        // return $http.post($window.baseUrl + 'Container/Auth');
      })
      /*.then(function (result) {
        return vm.userData;
        // debugger;
      })*/;
  };

  vm.login = function (email, password) {
    return $http.post($window.baseUrl + 'Account/Login', {
        email: email,
        password: password
      })
      .then(function (result) {
        return vm.userData = $sessionStorage = result.data.Data;
      });
  };

  vm.userVerify = function () {
    // debugger;
    return PostToJs('User/Verify', {
      idCity: vm.userData.IdCity,
      idCountry: vm.userData.IdCountry,
      idState: vm.userData.IdState
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
