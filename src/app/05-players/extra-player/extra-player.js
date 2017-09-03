'use strict';
angular.module('app')
  .controller('ExtraPlayerController', function ($rootScope, teamSpotPrices, AppService, TeamPlayerService, ConfirmPopup, AlertPopup) {

    var vm = this;

    vm.D_INDEX = 4;
    vm.C_INDEX = 9;
    vm.B_INDEX = 14;
    vm.A_INDEX = 24;

    vm.getSerie = function (index) {
      return index < vm.D_INDEX ? 'D' :
        index < vm.C_INDEX ? 'C' :
        index < vm.B_INDEX ? 'B' :
        'A';
    };

    vm.teamSpotPrices = teamSpotPrices.Prices;

    for (var i = 0; i < vm.teamSpotPrices.length; i++) {
      var price = vm.teamSpotPrices[i];

      price.acquired =  i + 16 < AppService.user.MaxProPlayers;
      price.available =  i + 16 === AppService.user.MaxProPlayers && i < vm[AppService.user.Serie + '_INDEX'];
    }

    vm.buyProSpot = function (spot) {
      ConfirmPopup.open('Error.errorTitle', 'PlayerView.confirmSlotPurchase')
        .then(function () {
          TeamPlayerService.buyProSpot(spot)
            .then(function () {
              AlertPopup.open('Error.errorTitle', 'PlayerView.lblSlotPurchaseOk');
              $rootScope.$emit('balanceUpdate');
            })
            .catch(function (error) {
              AlertPopup.open('Error.errorTitle', error.Message);
            });
        });
    };

  });
