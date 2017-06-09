'use strict';
angular.module('app')
  .controller('StadiumReformController', function ($rootScope, $scope, type, stadiumReform, StructureService, ConfirmPopup, AlertPopup) {

    var vm = this;

    vm.trainCenters = stadiumReform.TrainCenters;
    vm.myTrainCenter = stadiumReform.MyTrainCenter;
    vm.scope = $scope;

    vm.current = vm.trainCenters[0];

    vm.updateJuniorTrainCenter = function () {
      ConfirmPopup.open('Atenção', 'lblConfirmReform')
        .then(function () {
          return StructureService.updateJuniorTrainCenter(vm.current.Id);
        })
        .then(function () {
          $rootScope.$emit('balanceUpdate');
          vm.scope.closeThisDialog();
        })
        .catch(function (error) {
          AlertPopup.open('Atenção', error.Message);
        });
    };

  })
  .factory('StadiumReform', function (StructureService, ngDialog) {

    this.open = function (type) {
      return ngDialog.openConfirm({
        template: 'stadium-reform.html',
        appendClassName: 'ngdialog-stadium-reform',
        controller: 'StadiumReformController as $ctrl',
        // scope: $scope,
        resolve: {
          type: function () {
            return type;
          },
          stadiumReform: function () {
            return {};//StructureService.stadiumReform();
          }
        },
      });
    };

    return this;

  });
