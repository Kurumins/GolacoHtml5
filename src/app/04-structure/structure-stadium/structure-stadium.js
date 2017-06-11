'use strict';
angular.module('app')
  .controller('StructureStadiumController', function (stadiumManage, InputPopup, StructureService, StadiumReform) {

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

    vm.stadiumChange = function () {
      StadiumReform.open(vm.stadium);
    }
    vm.stadiumChange();

    vm.stadiumReform = console.log;

    // function updateStructureStadium () {
    //   return StructureService.juniorPreview()
    //     .then(function (juniorPreview) {
    //       vm.juniorPreview = juniorPreview;
    //     });
    // }

  });
