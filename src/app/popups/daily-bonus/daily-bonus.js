'use strict';
angular.module('app')
  .controller('DailyBonusController', function (MainService) {

    var vm = this;

    vm.bonus = [
      {
        cash: 10000
      },
      {
        cash: 30000
      },
      {
        cash: 50000
      },
      {
        cash: 70000
      },
      {
        cash: 90000,
        credits: 1
      },
    ];

  });
