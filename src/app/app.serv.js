'use strict';
angular.module('app')
.service('AppService', function (PostToJs) {

  var vm = this;

  // this.auth = function () {
  //   return $http.get('/data/Container/Auth', {
  //     'socket_id': '215916.7788328',
  //     'channel_name': 'private-1602447546449533',
  //   });
  // };

  vm.getUserData = function () {
    return PostToJs('userData', 'user_data_callback')
      .then(function (result) {
        vm.userData = result;
      });
  }

  vm.userVerify = function () {
    return PostToJs('User/Verify', 'user_verify_callback', {
      idCity: vm.userData.idCity,
      idCountry: vm.userData.idCountry,
      idState: vm.userData.idState
    });
  };

  vm.teamPreview = function () {
    return PostToJs('Team/Preview', 'team_preview_callback');
  };

  vm.missionList = function () {
    return PostToJs('Mission/List', 'mission_list_callback');
  };

});
