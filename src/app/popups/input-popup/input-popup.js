'use strict';
angular.module('app')
  .factory('InputPopup', function (ngDialog) {

    this.open = function (title, config) {
      return ngDialog.openConfirm({
        template: 'input-popup.html',
        appendClassName: 'ngdialog-input-popup',
        data: {
          title: title,
          config: config
        }
      });
    };

    return this;

  });
