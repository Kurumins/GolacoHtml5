'use strict';
angular.module('app')
  .controller('PlayerManagerController', function (teamPlayerManage, currentPlayer) {

    var vm = this;

    var players = teamPlayerManage.TeamPlayers.filter(function (player) {
      return player.TeamPlayerType === 1;
    });

    // vm.teamPlayerManage = teamPlayerManage;

    for (var i = 0; i < players.length; i++) {
      var player = players[i];
      if (player.Id == currentPlayer) {
        vm.currentPlayer = player;
        break;
      }
    }

    vm.nextPlayer = function () {
      vm.currentPlayer = players[ (players.indexOf(vm.currentPlayer)+1) % players.length ];
    };

    vm.prevPlayer = function () {
      vm.currentPlayer = players[ (players.indexOf(vm.currentPlayer)-1 + players.length) % players.length ];
    };

  });
