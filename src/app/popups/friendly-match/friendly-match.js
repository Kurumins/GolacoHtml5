'use strict';
angular.module('app')
  .controller('FriendlyMatchController', function (FriendlyMatchService) {

    var vm = this;

    FriendlyMatchService.findFriendlyMatches()
      .then(function (friendlyMatches) {
        vm.friendlyMatches = friendlyMatches.data.data.Teams;
        vm.me = friendlyMatches.data.data.CurrentTeam;
        vm.currentMatch = vm.friendlyMatches[0];
      })

  });
