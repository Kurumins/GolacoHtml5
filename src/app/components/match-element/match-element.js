'use strict';
angular.module('app')
  .component('matchElement', {
    templateUrl: 'match-element.html',
    bindings: {
      match: '='
    },
    controller: function ($element, AppService) {
      var vm = this;

      vm.$onInit = function () { //debugger;

        if (vm.match.HomeTeam.Id == AppService.user.TeamId || vm.match.VisitorTeam.Id == AppService.user.TeamId) {
          $element.addClass('is-me');
        }

      };

    }
  });
