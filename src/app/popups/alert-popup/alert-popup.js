'use strict';
angular.module('app')
  .factory('AlertPopup', function (ngDialog) {

    this.open = function (title, content) {
      return ngDialog.openConfirm({
        template: 'alert-popup.html',
        appendClassName: 'ngdialog-alert-popup',
        data: {
          title: title,
          content: content,
        }
      });
    };

    return this;

  });
