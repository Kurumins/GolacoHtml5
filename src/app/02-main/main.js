'use strict';
angular.module('app')
  .config(routesConfig);

function routesConfig ($stateProvider) {

  $stateProvider
    .state('app.main', {
      url: '/',
      resolve: {
        missionList: function (AppService) {
          return AppService.missionList();
        },
      },
      templateUrl: 'main.html',
      controller: mainController,
      controllerAs: '$ctrl'
    })
}

function mainController($scope, missionList, ngDialog) {
  var vm = this;

  vm.missionList = missionList.data.data;

  // vm.teamTrophyRoomResolve = {
  //   teamTrophyRoom: function (MainService) {
  //     return MainService.teamTrophyRoom()
  //   }
  // }

  vm.config = function () {
    ngDialog.open({
      template: 'main-config.html',
      appendClassName: 'ngdialog-main-config',
      controller: 'MainConfigController as $ctrl',
      scope: $scope,
      resolve: {
        settings: function (MainService) {
          return MainService.teamSettings()
            .then(function (result) {
              return result.data.data;
            })
        }
      },
    });
  };

  vm.teamTrophyRoom = function () {
    ngDialog.open({
      template: 'main-trophy.html',
      appendClassName: 'ngdialog-main-trophy',
      controller: 'MainTrophyController as $ctrl',
      scope: $scope,
      resolve: {
        teamTrophyRoom: function (MainService) {
          return MainService.teamTrophyRoom()
            .then(function (result) {
              return result.data.data;
            })
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
        teamStats: function (MainService) {
          return MainService.teamStats()
            .then(function (result) {
              return result.data.data;
            })
        }
      },
    });
  };

  vm.stats();


  // ngDialog.open({ template: 'main.html', className: 'ngdialog-theme-default' });
  // ngDialog.open({ template: 'main.html', className2: 'ngdialog-theme-default' });

}
