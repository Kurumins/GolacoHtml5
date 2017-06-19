'use strict';
angular.module('app')
  .config(escalacaoRoutesConfig);

function escalacaoRoutesConfig ($stateProvider) {

  $stateProvider
    .state('app.escalacao', {
      url: '/escalacao',
      resolve: {
        teamPlayerList: function (TeamPlayerService) {
          return TeamPlayerService.teamPlayerManage();
        },
        teamTactic: function (EscalacaoService) {
          return EscalacaoService.loadTactic();
        },
        teamPlayers: function (teamTactic, teamPlayerList) { //debugger;

          for (var i = 0; i < teamPlayerList.TeamPlayers.length; i++) {
            var player = teamPlayerList.TeamPlayers[i];
            player.index = i;

            for (var t = 0; t < teamTactic.TeamPlayers.length; t++) {
              var tactic = teamTactic.TeamPlayers[t];

              if (player.Id === tactic.IdTeamPlayer) {

                player.IdTactic = tactic.IdTactic;

                break;

              }
            }

          }

          return teamPlayerList.TeamPlayers;
        },
      },
      templateUrl: 'escalacao.html',
      controller: escalacaoController,
      controllerAs: '$ctrl'
    });
}

function escalacaoController (teamPlayers, teamTactic, EscalacaoService, AlertPopup) {

  var vm = this;

  vm.campo = [
    [[27, 5], [28, 5], [29, 5]],
    [[22, 3], [23, 5], [24, 5], [25, 5], [26, 3]],
    [[17, 3], [18, 4], [19, 4], [20, 4], [21, 3]],
    [[12, 3], [13, 4], [14, 4], [15, 4], [16, 3]],
    [[7, 3], [8, 2], [9, 2], [10, 2], [11, 3]],
    [[2, 3], [3, 2], [4, 2], [5, 2], [6, 3]],
    [[1, 1]],
  ];

  vm.i = 1;

  vm.teamPlayers = teamPlayers;

  vm.cbMarkingType = teamTactic.TeamTactic.MarkingType;
  vm.cbPassingType = teamTactic.TeamTactic.PassType;
  vm.cbFieldPosture = teamTactic.TeamTactic.MatchStyle;
  vm.cbOffsideLine = teamTactic.TeamTactic.Offside ? 1 : 0;
  vm.cbPressure = teamTactic.TeamTactic.MarkingPressure ? 1 : 0;
  vm.cbWingPlay = teamTactic.TeamTactic.UsingWings ? 1 : 0;

  vm.slots = [];

  for (var i = 0; i < vm.teamPlayers.length; i++) {
    vm.slots[vm.teamPlayers[i].IdTactic] = vm.teamPlayers[i];
  }

  vm.dropped = function (dragEl, dropEl) { // function referenced by the drop target
    //this is application logic, for the demo we just want to color the grid squares
    //the directive provides a native dom object, wrap with jqlite
    // debugger;

    var drop = angular.element('#' + dropEl);
    var drag = angular.element('#' + dragEl);

    var player = vm.teamPlayers[drag.attr('data-player')];
    var slot = parseInt(drop.attr('data-slot'));

    // debugger;

    if ( slot === 0 || !vm.slots[slot] ) {
      vm.slots[player.IdTactic] = null;
      player.IdTactic = slot;
      vm.slots[slot] = player;
    }

  };

  vm.saveFormation = function () {

    if ( !testSave() ) {
      //
      return;
    }

    var saveStr = '';

    saveStr = vm.cbPassingType + ',' + vm.cbMarkingType + ',' + vm.cbFieldPosture + ',' +
          vm.cbOffsideLine + ',' + vm.cbPressure + ',' + 0 + ',' + vm.cbWingPlay + ';';

    var d = [];

    for (var i = 0; i < vm.teamPlayers.length; i++) {
      if (vm.teamPlayers[i].IdTactic > 0) {

        var s = vm.teamPlayers[i].IdTactic + ',' + vm.teamPlayers[i].Id;
        s += (vm.teamPlayers[i].IdTactic >= 30) ? ',0' : ',1';

        d.push(s);
      }
    }
    saveStr += d.join('-');

    EscalacaoService.updateTactic(saveStr);

    // if(!controller.hasEventListener(UserEvent.SET_TEAM_FORMATION))
    //   controller.addEventListener(UserEvent.SET_TEAM_FORMATION, onSaveComplete);
    // controller.setFormationData(saveStr);
  };

  function testSave () {
    var players = 0;
    var keepers = 0;
    var defenders = 0;
    var wingers = 0;
    var midfielders = 0;
    var strikers = 0;
    var sInj = false;

    for (var i = 1; i < 30 ; i++) {
      if (vm.slots[i] && vm.slots[i].IdTactic) {
        players++;
        switch (vm.slots[i].IdPosition) {
          case 1:
            keepers++;
            break;

          case 2:
            defenders++;
            break;

          case 3:
            wingers++;
            break;

          case 4:
            midfielders++;
            break;

          case 5:
            strikers++;
            break;
        }
      }
    }

    for (i = 0; i < vm.teamPlayers.length; i++)
    {
      if (vm.teamPlayers[i].IdTactic !== 0) {
        if (vm.teamPlayers[i].HasSeriousInjury) {
          sInj = true;
        }
      }
    }

    if ( players === 11) {
      if (keepers === 1) {
        if (defenders + wingers >= 3) {
          if (midfielders >= 2) {
            if (strikers >= 1) {
              if (!sInj) {
                return true;
              } else {
                AlertPopup.open('_error', '_injuredPlayer');
              }
            } else { //not enough strikers
              AlertPopup.open('_error', '_notEnoughStrikers');
            }
          } else { //not enough midfielders
            AlertPopup.open('_error', '_notEnoughMidfielders');
          }
        } else { //not enough defenders
          AlertPopup.open('_error', '_notEnoughDefenders');
        }
      } else { //no goalkeeper
        AlertPopup.open('_error', '_noKeeper');
      }
    } else { //not enough players / too many players
      AlertPopup.open('_error', '_notEnoughPlayers');
    }

    return false;

  }

}
