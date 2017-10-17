'use strict';
angular.module('app')
  .component('matchElement', {
    templateUrl: 'match-element.html',
    bindings: {
      match: '='
    },
    controller: function ($element, AppService, ExternalPerfil) {
      var vm = this;

      vm.openExternalPerfil = ExternalPerfil.open;

      vm.$onInit = function () { //debugger;

        if (vm.match.HomeTeam.Id === AppService.user.TeamId || vm.match.HomeTeam.IdSocialNetwork === AppService.userData.IdSocialNetwork) {
          $element.addClass('is-me');
          $element.children('.team-details.-home').addClass('is-me');
        } else if (vm.match.VisitorTeam.Id === AppService.user.TeamId || vm.match.VisitorTeam.IdSocialNetwork === AppService.userData.IdSocialNetwork) {
          $element.addClass('is-me');
          $element.children('.team-details.-visitor').addClass('is-me');
        }

      };

    }
  });
