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

function mainController(missionList/*, ngDialog*/) {
  var vm = this;

  vm.missionList = missionList.data.data;

  // ngDialog.open({ template: 'main.html', className: 'ngdialog-theme-default' });
  // ngDialog.open({ template: 'main.html', className2: 'ngdialog-theme-default' });

}
