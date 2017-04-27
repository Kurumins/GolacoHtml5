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

function mainController(missionList, ngDialog) {
  var vm = this;

  vm.missionList = missionList.data.data;

  // vm.teamTrophyRoomResolve = {
  //   teamTrophyRoom: function (MainService) {
  //     return MainService.teamTrophyRoom()
  //   }
  // }

  vm.teamTrophyRoom = function () {
    ngDialog.open({
      template: 'main-trophy.html',
      appendClassName: 'ngdialog-main-trophy',
      controller: 'MainTrophyController as $ctrl',
      // controllerAs="$ctrl",
      resolve: {
        teamTrophyRoom: function (MainService) {
          return MainService.teamTrophyRoom()
            .then(function (result) {
              return result.data.data;
            })
        }
      },
      // data="{{$appCtrl}}",
    });
  }


  // ngDialog.open({ template: 'main.html', className: 'ngdialog-theme-default' });
  // ngDialog.open({ template: 'main.html', className2: 'ngdialog-theme-default' });

}
