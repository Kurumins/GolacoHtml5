'use strict';
angular.module('app')
  .controller('StadiumReformController', function ($rootScope, $scope, current, stadiumList, StructureService, ConfirmPopup, AlertPopup) {

    var vm = this;

    vm.stadiumList = stadiumList.Stadiums;
    vm.current = current;
    vm.current.AtractivitySlots = 1;

    vm.setSelectedStadium = function (stadium) {
      stadium.CapacitySlots = stadium.CampacitySlots;
      vm.selectedStadium = stadium;
    };
    vm.setSelectedStadium(stadiumList.Stadiums[0]);

    // vm.myTrainCenter = stadiumReform.MyTrainCenter;
    // vm.scope = $scope;

    // vm.current = vm.trainCenters[0];

    // vm.updateJuniorTrainCenter = function () {
    //   ConfirmPopup.open('Atenção', 'lblConfirmReform')
    //     .then(function () {
    //       return StructureService.updateJuniorTrainCenter(vm.current.Id);
    //     })
    //     .then(function () {
    //       $rootScope.$emit('balanceUpdate');
    //       vm.scope.closeThisDialog();
    //     })
    //     .catch(function (error) {
    //       AlertPopup.open('Atenção', error.Message);
    //     });
    // };

  })
  .factory('StadiumReform', function (StructureService, ngDialog) {

    this.open = function (current) {
      return ngDialog.openConfirm({
        template: 'stadium-reform.html',
        appendClassName: 'ngdialog-stadium-reform',
        controller: 'StadiumReformController as $ctrl',
        // scope: $scope,
        resolve: {
          current: function () {
            return current;
          },
          stadiumList: function () {
            return StructureService.stadiumList();
          }
        },
      });
    };

    return this;

  });
