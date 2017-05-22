'use strict';
angular.module('app')
  .component('playerFormation', {
    templateUrl: 'player-formation.html',
    bindings: {
      player: '=',
      popoverPlacement: '@',
    }
  });
