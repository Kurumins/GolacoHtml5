'use strict';
angular.module('app')
  .controller('AppController', function (user, AppService) {

    var vm = this;

    vm.user = user;

    AppService.teamPreview();

  });
