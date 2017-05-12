'use strict';
angular.module('app')
  .factory('ConfirmPopup', function (MatchResultService, ngDialog) {

    this.open = function (data) {
      return ngDialog.openConfirm({
        template: 'confirm-popup.html',
        appendClassName: 'ngdialog-confirm-popup',
        data: data
        // controller: 'MatchResultController as $ctrl',
        // scope: $scope,
        // resolve: {
        //   matchData: function () {
        //     return MatchResultService.matchData(matchId);
        //   }
        // },
      });
    };

    return this;

  });
