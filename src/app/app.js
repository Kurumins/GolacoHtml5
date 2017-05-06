'use strict';
angular.module('app')
  .controller('AppController', function ($rootScope, $scope, $window, ngDialog, user, teamPreview, teamMatchesAlert) {

    var vm = this;

    vm.user = user.data.data;
    vm.teamPreview = teamPreview.data.data;

    $rootScope.$windowUser = $window.user;

    if ( teamMatchesAlert.data.data.Matches.length ) {

      vm.teamMatchesAlert = teamMatchesAlert.data.data.Matches;

      ngDialog.open({
        template: 'matches-alert.html',
        appendClassName: 'ngdialog-matches-alert',
        scope: $scope
      });

    }

    if ( $window.user.firstLogin ) {
      ngDialog.open({
        template: 'daily-bonus.html',
        appendClassName: 'ngdialog-daily-bonus',
        controller: 'DailyBonusController as $ctrl',
        scope: $scope
      });
    }

  });
