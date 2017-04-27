'use strict';
angular.module('app')
  .controller('AppController', function ($rootScope, user, teamPreview, AppService) {

    var vm = this;

    vm.user = user.data.data;

    // AppService.teamPreview();
    vm.teamPreview = teamPreview.data.data;

    $rootScope.$windowUser = window.user;

  });
