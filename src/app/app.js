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
        // controller: 'MainConfigController as $ctrl',
        scope: $scope
        // resolve: {
        //   settings: function () {
        //     return MainService.teamSettings()
        //       .then(function (result) {
        //         return result.data.data;
        //       });
        //   }
        // },
      });

    }

  });
