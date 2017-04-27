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

function mainController(missionList) {
  var vm = this;

  vm.missionList = missionList.data.data;
}
