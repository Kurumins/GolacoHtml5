'use strict';
angular.module('app')
  .config(hillRoutesConfig);

function hillController (preview, HillService, ConfirmPopup, HillDetails, $timeout, MatchResult) {
  var vm = this;

  vm.preview = preview;

  vm.refresh = function () {
    HillService.preview()
      .then(function (preview) {
        delete vm.preview;
        $timeout( function () {
          vm.preview = preview;
        });
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
        window.notify = function (data) {
          if ( data.Msg == 'HillGame') {
            MatchResult.open(data.Param3);
            delete window.notify;
          }
        }
        HillService.challenge(idHill, useItems);
        // console.log(idHill, useItems);
      });
  };

  vm.hillDetails = function (idHill) {
    HillDetails.open(idHill);
  };
  // vm.hillDetails(preview.Hills[0]);

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
