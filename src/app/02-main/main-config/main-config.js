'use strict';
angular.module('app')
  .controller('MainConfigController', function (settings, MainService) {

    var vm = this;

    vm.settings = settings;

    vm.changeCountry = function (idCountry) {
      MainService.teamChangeCountry(idCountry)
        .then(function () {
          // body...
        })
    };


  });
