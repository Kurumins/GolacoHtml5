'use strict';
angular.module('app')
  .factory('BugReport', function (ngDialog, PostToJs) {

    this.open = function () {
      return ngDialog.openConfirm({
        template: 'bug-report.html',
        appendClassName: 'ngdialog-bug-report',
      })
        .then(function () {
          // PostToJs('support');
        });
    };

    return this;

  });
