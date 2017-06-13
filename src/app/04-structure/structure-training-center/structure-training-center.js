'use strict';
angular.module('app')
  .controller('StructureTrainingCenterController', function (trainingCenterManage, StructureService, StadiumRecycle, PlayerItemEquip, AlertPopup) {

    var vm = this;
    vm.trainingCenter = trainingCenterManage.TrainingCenter;

    // vm.stadiumRecycle = function () {
    //   StadiumRecycle.open(vm.stadium)
    //     .then(updateStructureStadium);

    // }
    // // vm.stadiumRecycle();

    vm.trainingCenterReform = function (slot) {
      // delete vm.trainingCenter.TrainingCenterItems;
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

    // vm.stadiumReform = function (type, slot) {
    //   StadiumItens.open(type, slot)
    //     .then(updateStructureStadium);
    // };
    // // vm.stadiumReform('Capacity', 1);

    function updateStructureStadium () {
      return StructureService.trainingCenterManage()
        .then( function (trainingCenterManage) {
          vm.trainingCenter = trainingCenterManage.TrainingCenter;
        });
    }

  });
