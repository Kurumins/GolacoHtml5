'use strict';
angular.module('app')
  .controller('MainStatsController', function (teamStats) {

    var vm = this;

    vm.teamStats = teamStats;

  })
