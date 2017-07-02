'use strict';
angular.module('app')
  .component('auctionPlayer', {
    templateUrl: 'auction-player.html',
    bindings: {
      player: '=',
      me: '=',
      type: '@'
    },
    controller: function (moment, $interval, $element, AppService/*, PlayerAuction*/) {
      var vm = this;

      // vm.playerAuction = function () {
      //   PlayerAuction.open(vm.player);
      // };

      vm.user = AppService.user;
      vm.userData = AppService.userData;

      vm.positions = [
        '',
        'Common.TeamPlayerPosition_Goleiro',
        'Common.TeamPlayerPosition_Zagueiro',
        'Common.TeamPlayerPosition_Lateral',
        'Common.TeamPlayerPosition_MeioCampo',
        'Common.TeamPlayerPosition_Atacante',
      ];

      vm.$onInit = function () {

        if ( vm.type === 'bid' ) {

          $interval(function () {}, 1000);

          $element.addClass('is-bid');
          vm.isBid = true;

          vm.isCovered = vm.userData.idSocialNetwork !== vm.player.FinancialHist[0].IdSocialNetwork;
          if ( vm.isCovered ) {
            $element.addClass('is-covered');
          }
        }

      };

      // vm.$postLink = function () {
      //   debugger;
      // }

      vm.getMoment = function (date) {
        // return moment(moment(date).diff()).utc().format('H:mm:ss');
        var diff = moment(date).diff();
        return diff < 0 ? '0:00:00' : moment(diff).utc().format('H:mm:ss');
      };

    }
  });
