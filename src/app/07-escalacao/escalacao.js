'use strict';
angular.module('app')
  .config(mainRoutesConfig);

function mainRoutesConfig ($stateProvider) {

  $stateProvider
    .state('app.escalacao', {
      url: '/escalacao',
      resolve: {
        teamPlayerList: function (TeamPlayerService) {
          return TeamPlayerService.teamPlayerManage();
        },
        loadTactic: function (EscalacaoService) {
          return EscalacaoService.loadTactic();
        },
        teamTactic: function (loadTactic, teamPlayerList) {

          for (var i = 0; i < teamPlayerList.TeamPlayers.length; i++) {
            var player = teamPlayerList.TeamPlayers[i];
            player.index = i;

            for (var i = 0; i < loadTactic.TeamPlayers.length; i++) {
              var tactic = loadTactic.TeamPlayers[i];

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

function escalacaoController ($scope, teamTactic) {

  var vm = this;

  vm.campo = [
    [[27,5], [28,5], [29,5]],
    [[22,3], [23,5], [24,5], [25,5], [26,3]],
    [[17,3], [18,4], [19,4], [20,4], [21,3]],
    [[12,3], [13,4], [14,4], [15,4], [16,3]],
    [[7,3], [8,2], [9,2], [10,2], [11,3]],
    [[2,3], [3,2], [4,2], [5,2], [6,3]],
    [[1,1]],
  ];

  vm.i = 1;

  vm.teamTactic = teamTactic;

  vm.slots = [];

  for (var i = 0; i < vm.teamTactic.length; i++) {
    vm.slots[vm.teamTactic[i].IdTactic] = vm.teamTactic[i];
  }

  // vm.missionList = missionList.data.data;

  // vm.config = function () {
  //   ngDialog.open({
  //     template: 'main-config.html',
  //     appendClassName: 'ngdialog-main-config',
  //     controller: 'MainConfigController as $ctrl',
  //     scope: $scope,
  //     resolve: {
  //       settings: function () {
  //         return MainService.teamSettings()
  //           .then(function (result) {
  //             return result.data.data;
  //           });
  //       }
  //     },
  //   });
  // };

  $scope.dropped = function(dragEl, dropEl) { // function referenced by the drop target
    //this is application logic, for the demo we just want to color the grid squares
    //the directive provides a native dom object, wrap with jqlite
    // debugger;

    var drop = angular.element('#' + dropEl);
    var drag = angular.element('#' + dragEl);

    // debugger;

    var player = vm.teamTactic[drag.attr('data-player')];
    var slot = drop.attr('data-slot');

    vm.slots[player.IdTactic] = null;
    player.IdTactic = slot;
    vm.slots[player.IdTactic] = player;

  };

};
