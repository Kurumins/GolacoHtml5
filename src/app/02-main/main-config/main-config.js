'use strict';
angular.module('app')
  .controller('MainConfigController', function (MainService) {

    var vm = this;

    MainService.teamSettings()
      .then(function (result) {
        vm.settings = result.data.data;
      });

  })
