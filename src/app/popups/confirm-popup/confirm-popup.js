'use strict';
angular.module('app')
  .factory('ConfirmPopup', function (MatchResultService, ngDialog) {

    this.open = function (title, content) {
      return ngDialog.openConfirm({
        template: 'confirm-popup.html',
        appendClassName: 'ngdialog-confirm-popup',
        data: {
          title: title,
          content: content,
        }
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
