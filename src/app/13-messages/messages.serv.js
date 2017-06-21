'use strict';
angular.module('app')
  .service('MessagesService', function (PostToJs) {

    var vm = this;

    vm.list = function () {
      return PostToJs('MessageTeam/MessageList');
    };

    vm.setReadMessages = function (messageIds) {
      return PostToJs('MessageTeam/ReadMessages', {
        MessageIds: messageIds
      });
    };

    vm.setUnReadMessages = function (messageIds) {
      return PostToJs('MessageTeam/UnReadMessages', {
        MessageIds: messageIds
      });
    };

    vm.deleteMessages = function (messageIds) {
      return PostToJs('MessageTeam/DeleteMessages', {
        MessageIds: messageIds
      });
    };

  });
