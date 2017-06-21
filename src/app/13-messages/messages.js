'use strict';
angular.module('app')
  .config(messagesRoutesConfig);

function messagesController (messageList, MessagesService, ConfirmPopup) {
  var vm = this;

  vm.messageList = messageList.MessageList;

  vm.markAll = function (checked) {
    angular.forEach(vm.messageList, function (message) {
      message.checked = checked;
    });
  };

  vm.deleteCheckedMessages = function () {
    ConfirmPopup.open('MessageDetail.confirmDeleteTitle', 'MessageDetail.confirmDeleteMsg')
      .then(function () {
        return MessagesService.deleteMessages(getCheckedMessages().join(';'));
      })
      .then(function () {
        return MessagesService.list();
      })
      .then(function (messageList) {
         vm.messageList = messageList.MessageList;
      });
  };

  vm.setUnReadCheckedMessages = function () {
    MessagesService.setUnReadMessages(getCheckedMessages().join(';'))
      .then(function () {
        angular.forEach(vm.messageList, function (message) {
          if ( message.checked ) {
            message.IsRead = false;
          }
        });
      });
  };

  vm.setReadCheckedMessages = function () {
    MessagesService.setReadMessages(getCheckedMessages().join(';'))
      .then(function () {
        angular.forEach(vm.messageList, function (message) {
          if ( message.checked ) {
            message.IsRead = true;
          }
        });
      });
  };

  function getCheckedMessages() {
    return vm.messageList
      .reduce(function (memo, message) {
        if ( message.checked ) {
          memo.push(message.MessageId);
        }
        return memo;
      }, []);
  }

}

function messagesRoutesConfig ($stateProvider, moment) {

  $stateProvider
    .state('app.messages', {
      url: '/messages',
      resolve: {
        messageList: function (MessagesService) {
          return MessagesService.list();
        }
      },
      templateUrl: 'messages.html',
      controller: messagesController,
      controllerAs: '$ctrl'
    });
}
