'use strict';
angular.module('app')
  .controller('AuctionSearchController', function () {

    var vm = this;

    vm.positions = [
      '',
      /*'Common.TeamPlayerPosition_*/ 'Goleiro',
      /*'Common.TeamPlayerPosition_*/ 'Zagueiro',
      /*'Common.TeamPlayerPosition_*/ 'Lateral',
      /*'Common.TeamPlayerPosition_*/ 'MeioCampo',
      /*'Common.TeamPlayerPosition_*/ 'Atacante',
    ];


  })
  .factory('AuctionSearch', function (ngDialog) {

    this.open = function ($scope) {
      return ngDialog.openConfirm({
        template: 'auction-search.html',
        appendClassName: 'ngdialog-auction-search',
        controller: 'AuctionSearchController as $ctrl',
        scope: $scope
        // resolve: {
        // }
      });
    };

    return this;

  });
