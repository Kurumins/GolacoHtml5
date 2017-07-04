'use strict';
angular.module('app')
  .controller('HillDetailsController', function (hill, topTeams,/* lastMatchs, myLastMatchs,*/ HillService, moment) {

    var vm = this;

    vm.hill = hill;
    vm.topTeams = topTeams;
    vm.topTeamsMonthly = topTeams.TopTeamsMonthly;

    vm.firstYear = 2011;
    vm.currentYear = moment().year();

    vm.getLastMatchs = function () {
      return HillService.lastMatchs(hill.IdHill)
        .then(function (lastMatchs) {
          vm.lastMatchs = lastMatchs.LastMatchs;
        });
    };

    vm.getMyLastMatchs = function () {
      HillService.myLastMatchs(hill.IdHill)
        .then(function (myLastMatchs) {
          vm.myLastMatchs = myLastMatchs.LastMatchs;
        });
    },

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
        showClose: true,
        // scope: $scope,
        resolve: {
          hill: function () {
            return hill;
          },
          topTeams: function () {
            return HillService.topTeams(hill.IdHill);
          },
          // lastMatchs: function () {
          //   return HillService.lastMatchs(hill.IdHill);
          // },
          // myLastMatchs: function () {
          //   return HillService.myLastMatchs(hill.IdHill);
          // },
        },
      });
    };

    return this;

  });
