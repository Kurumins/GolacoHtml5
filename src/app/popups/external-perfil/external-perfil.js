'use strict';
angular.module('app')
  .controller('ExternalPerfilController', function (socialId, teamProfile, ExternalPerfil, FriendlyMatch, CompetitionTournament, CompetitionTournamentLight, CompetitionLeague, CompetitionCup, CompetitionCupLight) {
    var vm = this;

    vm.socialId = socialId;
    vm.teamProfile = teamProfile;

    vm.sendMessage = function () {
      ExternalPerfil.openSendMessage(socialId);
    };

    vm.challenge = function () {
      var league = [];
      league[teamProfile.League] = true;
      // league['D'] = true;

      FriendlyMatch.open({
        Couch: teamProfile.Coach,
        SocialId: 0,//socialId,
        Country: 0,
        League: league,
        TeamName: teamProfile.Name,
      });
    };

    vm.CompetitionTournament = CompetitionTournament.open;
    vm.CompetitionTournamentLight = CompetitionTournamentLight.open;
    vm.CompetitionLeague = CompetitionLeague.open;
    vm.CompetitionCup = CompetitionCup.open;
    vm.CompetitionCupLight = CompetitionCupLight.open;

  })

  .factory('ExternalPerfil', function (ngDialog, ExternalPerfilService) {
    var vm = this;

    vm.open = function (socialId) {

      return ngDialog.openConfirm({
        template: 'external-perfil.html',
        appendClassName: 'ngdialog-external-perfil',
        controller: 'ExternalPerfilController as $ctrl',
        // scope: $scope,
        resolve: {
          socialId: function () {
            return socialId
          },
          teamProfile: function () {
            return ExternalPerfilService.getTeamProfile(socialId);
          }
        },
      });
    };

    vm.openSendMessage = function (socialId) {

      return ngDialog.openConfirm({
        template: 'external-perfil-send-message.html',
        appendClassName: 'ngdialog-external-perfil-send-message',
        // controller: 'ExternalPerfilController as $ctrl',
        // controller: function () {

        // },
        // scope: $scope,
        // resolve: {
          // teamProfile: function () {
          //   return ExternalPerfilService.getTeamProfile(socialId);
          // }
        // },
      })
        .then(function (message) {
          ExternalPerfilService.sendMessage(socialId, message);
        });
    };

    return vm;

  });
