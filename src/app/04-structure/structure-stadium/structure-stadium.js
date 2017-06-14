'use strict';
angular.module('app')
  .controller('StructureStadiumController', function (stadiumManage, InputPopup, StructureService, StadiumRecycle, StadiumItens) {

    var vm = this;
    vm.stadium = stadiumManage.Stadium;

    vm.editName = function () {
      InputPopup.open('Nome do Estádio', {
        confirmText: 'Salvar',
        initialText: vm.stadium.Name
      })
        .then(function (stadiumName) {
          StructureService.stadiumRename(stadiumName)
            .then(function () {
              vm.stadium.Name = stadiumName;
            });
        });
    };

    vm.stadiumRecycle = function () {
      StadiumRecycle.open(vm.stadium)
        .then(updateStructureStadium);

    }
    // vm.stadiumRecycle();

    vm.stadiumReform = function (type, slot) {
      StadiumItens.open(type, slot)
        .then(updateStructureStadium);
    };
    // vm.stadiumReform('Capacity', 1);

    function updateStructureStadium () {
      return StructureService.stadiumManage()
        .then( function (stadiumManage) {
          stadiumManage.Stadium.CapacitySlots = stadiumManage.Stadium.CampacitySlots;
          vm.stadium = stadiumManage.Stadium;
        });
    }

  });
