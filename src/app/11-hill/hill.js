'use strict';
angular.module('app')
  .config(hillRoutesConfig);

function hillController (preview) {
  var vm = this;

  vm.preview = preview;

}

function hillRoutesConfig ($stateProvider) {

  $stateProvider
    .state('app.hill', {
      url: '/hill',
      sticky: true,
      resolve: {
        preview: function (HillService) {
          return HillService.preview();
        },
      },
      templateUrl: 'hill.html',
      controller: hillController,
      controllerAs: '$ctrl'
    });
}
