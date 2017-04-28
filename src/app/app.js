'use strict';
angular.module('app')
  .controller('AppController', function ($rootScope, user, teamPreview, $window) {

    var vm = this;

    vm.user = user.data.data;
    vm.teamPreview = teamPreview.data.data;

    $rootScope.$windowUser = $window.user;

  });
