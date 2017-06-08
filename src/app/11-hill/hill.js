'use strict';
angular.module('app')
  .config(hillRoutesConfig);

function hillController (preview, HillService, $timeout, ConfirmPopup ) {
  var vm = this;

  vm.preview = preview;

  vm.refresh = function () {
    HillService.preview()
      .then(function (preview) {
        delete vm.preview;
        $timeout( function () {
          vm.preview = preview;
        })
      });
  };

  vm.challenge = function (idHill, useItems) {

    var message;

    if ( vm.preview.FreeChallenger ) {
      message = 'KingOfTheHill.lblConfirmChallenge';
    } else {
      message = 'KingOfTheHill.lblChallengeWithCredits;n3';
    }

    ConfirmPopup.open('Error.errorTitle', message)
      .then(function () {
        // HillService.challenge(idHill, useItems);
        console.log(idHill, useItems);
      })
  };

}

function hillRoutesConfig ($stateProvider) {

  $stateProvider
    .state('app.hill', {
      url: '/hill',
      sticky: true,
      resolve: {
        preview: function (HillService) {
          return HillService.preview();
        },
      },
      templateUrl: 'hill.html',
      controller: hillController,
      controllerAs: '$ctrl'
    });
}
