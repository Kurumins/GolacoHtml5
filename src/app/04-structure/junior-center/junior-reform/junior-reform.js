'use strict';
angular.module('app')
  .controller('JuniorReformController', function (juniorReform) {

    var vm = this;

    vm.trainCenters = juniorReform.TrainCenters;
    vm.myTrainCenter = juniorReform.MyTrainCenter;

    vm.current = vm.trainCenters[0];

  })
  .factory('JuniorReform', function (StructureService, ngDialog) {

    this.open = function () {
      ngDialog.open({
        template: 'junior-reform.html',
        appendClassName: 'ngdialog-junior-reform',
        controller: 'JuniorReformController as $ctrl',
        // scope: $scope,
        resolve: {
          juniorReform: function () {
            return StructureService.juniorReform();
          }
        },
      });
    };

    return this;

  });
