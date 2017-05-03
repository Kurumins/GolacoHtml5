'use strict';
angular.module('app')
  .controller('AppController', function ($rootScope, user, teamPreview, $window) {

    var vm = this;

    vm.user = user;
    vm.teamPreview = teamPreview;

    $rootScope.$windowUser = $window.user;

  });
