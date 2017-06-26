'use strict';
angular.module('app')
  .factory('MessagePopup', function (ngDialog) {

    this.open = function (message) {
      return ngDialog.openConfirm({
        template: 'message-popup.html',
        appendClassName: 'ngdialog-message-popup',
        data: message
      });
    };

    return this;

  });
