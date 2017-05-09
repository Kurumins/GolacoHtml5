'use strict';
angular.module('app')
  .component('playerAttributes', {
    templateUrl: 'player-attributes.html',
    bindings: {
      player: '='
    },
    controller: function () {
      var vm = this;

      vm.getEffectModifier = function (skill) {
        vm.player.effects = []
          .concat(vm.player.CleatsItem && vm.player.CleatsItem.Effects || [])
          .concat(vm.player.ShirtItem && vm.player.ShirtItem.Effects || [])
          .concat(vm.player.ShirtItem && vm.player.ShirtItem.Effects || []);

        var total = 0;

        for (var i = 0; i < vm.player.effects.length; i++) {
          // debugger;
          if ( vm.player.effects[i].IdTeamPlayerSkill === skill ) {
            total += (vm.player.effects[i].Effect);
          }
        }

        return total;

      };
    }
  });
