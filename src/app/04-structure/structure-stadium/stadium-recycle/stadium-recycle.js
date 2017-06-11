'use strict';
angular.module('app')
  .controller('StadiumRecycleController', function ($rootScope, $scope, current, stadiumList, StructureService, ConfirmPopup, AlertPopup) {

    var vm = this;

    vm.stadiumList = stadiumList.Stadiums;
    vm.current = current;
    // vm.current.AtractivitySlots = 1;
    vm.scope = $scope;

    vm.setSelectedStadium = function (stadium) {
      stadium.CapacitySlots = stadium.CampacitySlots;
      vm.selectedStadium = stadium;
    };
    vm.setSelectedStadium(stadiumList.Stadiums[0]);

    vm.stadiumRecycle = function () {
      ConfirmPopup.open('Atenção', 'StadiumRecycleDetail.msgRecycleConfirmTitle')
        .then(function () {
          return StructureService.stadiumRecycle(vm.selectedStadium.Id);
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
  .factory('StadiumRecycle', function (StructureService, ngDialog) {

    this.open = function (current) {
      return ngDialog.openConfirm({
        template: 'stadium-recycle.html',
        appendClassName: 'ngdialog-stadium-recycle',
        controller: 'StadiumRecycleController as $ctrl',
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
