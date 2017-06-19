'use strict';
angular.module('app')
  .controller('MedicCenterRecycleController', function ($rootScope, $scope, current, trainingCenterList, StructureService, ConfirmPopup, AlertPopup) {

    var vm = this;

    vm.trainingCenterList = trainingCenterList.TrainCenters;
    vm.current = current;
    vm.scope = $scope;

    vm.setSelectedTrainingCenter = function (trainingCenter) {
      vm.selectedTrainingCenter = trainingCenter;
    };
    vm.setSelectedTrainingCenter(trainingCenterList.TrainCenters[0]);

    vm.trainingCenterRecycle = function () {
      ConfirmPopup.open('TrainingCenterReformDetail.lblRecycleConfirmTitle', 'TrainingCenterReformDetail.msgRecycleConfirmTitle')
        .then(function () {
          return StructureService.trainingCenterRecycle(vm.current.IdTeamTrainCenter, vm.selectedTrainingCenter.Id);
        })
        .catch(function (error) {
          AlertPopup.open('Atenção', error.Message);
        })
        .then(function () {
          $rootScope.$emit('balanceUpdate');
          vm.scope.confirm();
        });
    };

  })
  .factory('MedicCenterRecycle', function (StructureService, ngDialog) {

    this.open = function (current) {
      return ngDialog.openConfirm({
        template: 'structure-training-center-recycle.html',
        appendClassName: 'ngdialog-structure-training-center-recycle',
        controller: 'MedicCenterRecycleController as $ctrl',
        // scope: $scope,
        resolve: {
          current: function () {
            return current;
          },
          trainingCenterList: function () {
            return StructureService.trainingCenterList();
          }
        },
      });
    };

    return this;

  });
