'use strict';
angular.module('app')
  .controller('StadiumItensController', function ($rootScope, $scope, type, slot, itemList, StructureService, ConfirmPopup, AlertPopup) {

    var vm = this;
    vm.scope = $scope;

    vm.type = type;
    vm.itemList = itemList.Items;

    vm.stadiumSetStadiumItem = function (item) {
      ConfirmPopup.open('StadiumImprovements.confirmRecycleTitle', 'StadiumImprovements.confirmRecycleMsg')
        .then(function () {
          return StructureService.stadiumSetStadiumItem(type, slot, item.Id);
        })
        .catch(function (error) {
          AlertPopup.open('Atenção', error.Message);
        })
        .then(function () {
          AlertPopup.open('Atenção', 'StadiumImprovements.resultRecycleMsg');
          $rootScope.$emit('balanceUpdate');
          vm.scope.confirm();
        });
    };

  })
  .factory('StadiumItens', function (StructureService, ngDialog) {

    this.open = function (type, slot) {
      return ngDialog.openConfirm({
        template: 'stadium-itens.html',
        appendClassName: 'ngdialog-stadium-itens',
        controller: 'StadiumItensController as $ctrl',
        // scope: $scope,
        resolve: {
          type: function () {
            return type;
          },
          slot: function () {
            return slot;
          },
          itemList: function () {
            return StructureService.stadiumGetItemList(type);
          }
        },
      });
    };

    return this;

  });
