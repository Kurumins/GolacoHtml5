'use strict';
angular.module('app')
.service('AppService', function (PostToJs, $http) {

  var vm = this;

  // this.auth = function () {
  //   return $http.get('/data/Container/Auth', {
  //     'socket_id': '215916.7788328',
  //     'channel_name': 'private-1602447546449533',
  //   });
  // };

  vm.getUserData = function () {
    return PostToJs('userData')
      .then(function (result) {
        return vm.userData = result;
      });
  }

  vm.userVerify = function () {
    return PostToJs('User/Verify', {
      idCity: vm.userData.idCity,
      idCountry: vm.userData.idCountry,
      idState: vm.userData.idState
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

});
