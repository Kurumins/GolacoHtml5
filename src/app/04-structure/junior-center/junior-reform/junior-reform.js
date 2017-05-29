'use strict';
angular.module('app')
  .controller('JuniorReformController', function ($rootScope, $scope, juniorReform, StructureService, ConfirmPopup, AlertPopup) {

    var vm = this;

    vm.trainCenters = juniorReform.TrainCenters;
    vm.myTrainCenter = juniorReform.MyTrainCenter;

    vm.current = vm.trainCenters[0];

    vm.updateJuniorTrainCenter = function () {
      ConfirmPopup.open('Atenção', 'lblConfirmReform')
        .then(function () {
          return StructureService.updateJuniorTrainCenter(vm.current.Id);
        })
        .then(function (result) {
          $rootScope.$emit('balanceUpdate');
          $scope.closeThisDialog();
        })
        .catch(function (error) {
          AlertPopup.open('Atenção', error.Message);
        });
    }

  })
  .factory('JuniorReform', function (StructureService, ngDialog) {

    this.open = function () {
      return ngDialog.openConfirm({
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
