'use strict';
angular.module('app')
  .service('ExternalPerfilService', function (PostToJs) {

    var vm = this;

    // https://www.golacogame.com.br/Team/Profile
    vm.getTeamProfile = function (socialId) {
      return PostToJs('Team/Profile', {
        SocialId: socialId
      });
    };

    // https://www.golacogame.com.br/MessageTeam/Send
    vm.sendMessage = function (socialId, message) {
      return PostToJs('MessageTeam/Send', {
        MsgTitle: message.title,
        MsgBody: message.body,
        IdSocialNetwork: socialId
      });
    };

  });
