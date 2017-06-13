'use strict';
angular.module('app')
  .controller('TrainingCenterRecycleController', function ($rootScope, $scope, current, trainingCenterList, StructureService, ConfirmPopup, AlertPopup) {

    var vm = this;

    vm.trainingCenterList = trainingCenterList.TrainCenters;
    vm.current = current;
    vm.scope = $scope;

    vm.setSelectedTrainingCenter = function (stadium) {
      stadium.CapacitySlots = stadium.CampacitySlots;
      vm.selectedTrainingCenter = stadium;
    };
    vm.setSelectedTrainingCenter(trainingCenterList.TrainCenters[0]);

    vm.stadiumRecycle = function () {
      ConfirmPopup.open('Atenção', 'StadiumRecycleDetail.msgRecycleConfirmTitle')
        .then(function () {
          return StructureService.stadiumRecycle(vm.selectedTrainingCenter.Id);
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
  .factory('TrainingCenterRecycle', function (StructureService, ngDialog) {

    this.open = function (current) {
      return ngDialog.openConfirm({
        template: 'structure-training-center-recycle.html',
        appendClassName: 'ngdialog-structure-training-center-recycle',
        controller: 'TrainingCenterRecycleController as $ctrl',
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
