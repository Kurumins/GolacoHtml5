'use strict';
angular.module('app')
  .component('juniorTable', {
    templateUrl: 'junior-table.html',
    bindings: {
      players: '=',
      currentPlayer: '=',
      small: '=?'
    },
    controller: function() {
      var ctrl = this;

      ctrl.$postLink = function() {
        ctrl.small = ctrl.small || false;
      };
    }
  });
