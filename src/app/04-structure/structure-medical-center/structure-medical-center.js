'use strict';
angular.module('app')
  .controller('StructureMedicalCenterController', function (medicCenterManage, StructureService, MedicCenterRecycle, PlayerItemEquip, AlertPopup) {

    var vm = this;
    vm.medicCenterManage = medicCenterManage.MedicCenter;

    // vm.medicCenterManageRecycle = function () {
    //   MedicCenterRecycle.open(vm.medicCenterManage)
    //     .then(updateStructureStadium);
    // }
    // vm.medicCenterManageRecycle();

    // function updateStructureStadium () {
    //   return StructureService.medicCenterManage()
    //     .then( function (medicCenterManage) {
    //       vm.medicCenterManage = medicCenterManage.MedicCenter;
    //     });
    // }

  });
