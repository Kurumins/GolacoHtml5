'use strict';
angular.module('app')
  .controller('StructureStadiumController', function (stadiumManage, InputPopup, StructureService, StadiumRecycle) {

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
        .then(function () {
          return StructureService.stadiumManage();
        })
        .then( function (stadiumManage) {
          stadiumManage.Stadium.CapacitySlots = stadiumManage.Stadium.CampacitySlots;
          vm.stadium = stadiumManage.Stadium;
        });
    }
    // vm.stadiumRecycle();

    vm.stadiumReform = console.log;

    // function updateStructureStadium () {
    //   return StructureService.juniorPreview()
    //     .then(function (juniorPreview) {
    //       vm.juniorPreview = juniorPreview;
    //     });
    // }

  });
