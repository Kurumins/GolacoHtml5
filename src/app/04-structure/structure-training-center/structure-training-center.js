'use strict';
angular.module('app')
  .controller('StructureTrainingCenterController', function (trainingCenterManage, StructureService, TrainingCenterRecycle, PlayerItemEquip, AlertPopup) {

    var vm = this;
    vm.trainingCenter = trainingCenterManage.TrainingCenter;

    vm.trainingCenterRecycle = function () {
      TrainingCenterRecycle.open(vm.trainingCenter)
        .then(updateStructureStadium);
    }
    // vm.trainingCenterRecycle();

    vm.trainingCenterReform = function (slot) {

      var categories = {
        4: [1, 3],
        3: [4, 5],
        2: [6, 7],
        1: [8, 9]
      };

      PlayerItemEquip.openCategory( categories[vm.trainingCenter.Requirement_IdLeague] )
        .then(function (item) {
          return StructureService.trainingCenterSetItem(slot, item.Id, vm.trainingCenter.IdTeamTrainCenter)
            .catch(function (error) {
              AlertPopup.open('Atenção', error.Message);
            })
        })
        .finally(updateStructureStadium);
    };

    function updateStructureStadium () {
      return StructureService.trainingCenterManage()
        .then( function (trainingCenterManage) {
          vm.trainingCenter = trainingCenterManage.TrainingCenter;
        });
    }

  });
