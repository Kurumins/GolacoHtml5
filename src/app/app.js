'use strict';
angular.module('app')
  .controller('AppController', function ($rootScope, $scope, $window, ngDialog, user, userData, teamPreview, teamMatchesAlert, countryList, MatchAlert, $translate, tmhDynamicLocale) {

    var vm = this;

    // debugger;

    vm.userData = userData;
    $rootScope.user = vm.user = user;
    $rootScope.teamPreview = vm.teamPreview = teamPreview;
    vm.countryList = countryList.data;

    $rootScope.$window = $window;

    if ( teamMatchesAlert.Matches.length ) {

      MatchAlert.open(teamMatchesAlert.Matches);

      // vm.teamMatchesAlert = teamMatchesAlert.Matches;

      // ngDialog.open({
      //   template: 'matches-alert.html',
      //   appendClassName: 'ngdialog-matches-alert',
      //   scope: $scope
      // });

    }

    if ( $window.firstLogin ) {
      ngDialog.open({
        template: 'daily-bonus.html',
        appendClassName: 'ngdialog-daily-bonus',
        controller: 'DailyBonusController as $ctrl',
        scope: $scope
      });
    }

    // ngDialog.open({
    //   template: 'splash-ad.html',
    //   appendClassName: 'ngdialog-splash-ad',
    //   // controller: 'DailyBonusController as $ctrl',
    //   scope: $scope
    // });

    $scope.changeLanguage = function (key) {
      $translate.use(key);
      tmhDynamicLocale.set(key);
    };
    $scope.changeLanguage($window.navigator.language || $window.navigator.userLanguage);
    // $scope.changeLanguage('en-US');

    // var onMainUpdate = $rootScope.$on('mainUpdate', function () {
    //   mainUpdate();
    // });
    // $rootScope.$on('$destroy', onMainUpdate);

    // function mainUpdate () {
    //   BalanceService.headerUserData()
    //     .then(function (result) {
    //       vm.HeaderData = result.HeaderData;
    //     });
    // }

  });
