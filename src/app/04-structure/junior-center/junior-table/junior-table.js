'use strict';
angular.module('app')
  .component('juniorTable', {
    templateUrl: 'junior-table.html',
    bindings: {
      players: '=',
      currentPlayer: '='
    }
  });
