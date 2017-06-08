'use strict';
angular.module('app')
  .controller('HillDetailsController', function (hill, topTeams, HillService, moment) {

    var vm = this;

    vm.hill = hill;
    vm.topTeams = topTeams;
    vm.topTeamsMonthly = topTeams.TopTeamsMonthly;

    vm.firstYear = 2011;
    vm.currentYear = moment().year();

    vm.bestsMonthly = function (month, year) {
      HillService.bestsMonthly(hill.IdHill, month, year)
        .then(function (topTeamsMonthly) {
          vm.topTeamsMonthly = topTeamsMonthly.TopTeamsMonthly;
        });
    };

  })
  .factory('HillDetails', function (HillService, ngDialog) {

    this.open = function (hill) {
      ngDialog.open({
        template: 'hill-details.html',
        appendClassName: 'ngdialog-hill-details',
        controller: 'HillDetailsController as $ctrl',
        // scope: $scope,
        resolve: {
          hill: function () {
            return hill;
          },
          topTeams: function () {
            return HillService.topTeams(hill.IdHill);
          },
        },
      });
    };

    return this;

  });
