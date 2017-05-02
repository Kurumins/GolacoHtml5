'use strict';
angular.module('app')
  .controller('ExtraPlayerController', function (teamSpotPrices) {

    var vm = this;

    vm.D_INDEX = 4;
    vm.C_INDEX = 9;
    vm.B_INDEX = 14;
    vm.A_INDEX = 24;

    vm.getSerie = function (index) {
      return index < vm.D_INDEX ? 'D' :
        index < vm.C_INDEX ? 'C' :
        index < vm.B_INDEX ? 'B' :
        'A';
    };

    vm.teamSpotPrices = teamSpotPrices;

  });
