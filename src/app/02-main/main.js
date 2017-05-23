'use strict';
angular.module('app')
  .config(mainRoutesConfig);

function mainRoutesConfig ($stateProvider) {

  $stateProvider
    .state('app.main', {
      url: '/',
      sticky: true,
      // resolve: {
      //   missionList: function (AppService) {
      //     return AppService.missionList();
      //   },
      // },
      templateUrl: 'main.html',
      controller: mainController,
      controllerAs: '$ctrl'
    });
}

function mainController ($scope, /*missionList,*/ ngDialog, MainService, AppService) {
  var vm = this;

  // if ( missionList ) {
  //   vm.missionList = missionList;
  // } else {
    AppService.missionList().noLoading()
      .then(function (missionList) {
        vm.missionList = missionList;
      });
  // }

  vm.config = function () {
    ngDialog.open({
      template: 'main-config.html',
      appendClassName: 'ngdialog-main-config',
      controller: 'MainConfigController as $ctrl',
      scope: $scope,
      resolve: {
        settings: function () {
          return MainService.teamSettings();
            // .then(function (result) {
            //   return result;
            // });
        }
      },
    });
  };
  vm.config();

  vm.teamTrophyRoom = function () {
    ngDialog.open({
      template: 'main-trophy.html',
      appendClassName: 'ngdialog-main-trophy',
      controller: 'MainTrophyController as $ctrl',
      scope: $scope,
      resolve: {
        teamTrophyRoom: function () {
          return MainService.teamTrophyRoom();
            // .then(function (result) {
            //   return result.data.data;
            // });
        }
      },
    });
  };

  vm.stats = function () {
    ngDialog.open({
      template: 'main-stats.html',
      appendClassName: 'ngdialog-main-stats',
      controller: 'MainStatsController as $ctrl',
      scope: $scope,
      resolve: {
        teamStats: function () {
          return MainService.teamStats();
            // .then(function (result) {
            //   return result.data.data;
            // });
        }
      },
    });
  };

  vm.dailyBonus = function () {
    ngDialog.open({
      template: 'daily-bonus.html',
      appendClassName: 'ngdialog-daily-bonus',
      controller: 'DailyBonusController as $ctrl',
      scope: $scope
    });
  };

}
