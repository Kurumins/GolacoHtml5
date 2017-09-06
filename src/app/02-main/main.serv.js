'use strict';
angular.module('app')
  .service('MainService', function (PostToJs, $window, AppService, $filter) {

    var vm = this;

    vm.teamSettings = function () {
      return PostToJs('Team/Settings');
    };

    vm.teamTrophyRoom = function () {
      return PostToJs('Team/TrophyRoom', {snId: $window.idSocialNetwork});
    };

    vm.teamStats = function () {
      return PostToJs('Team/Statistics');
    };

    vm.teamChangeCountry = function (idCountry) {
      return PostToJs('Team/ChangeCountry', {
        IdCountry: idCountry
      });
    };

    vm.changeTeamName = function (newName, newAcronym) {
      return PostToJs('Team/ChangingTeamName', {
        NewName: newName,
        NewAcronym: newAcronym
      });
    };

    vm.changeOptionMail = function (mailOptions) {
      return PostToJs('Team/ChangingOptionMail', {
        MailOptions: mailOptions
      });
    };

    vm.updateHistory = function (history) {
      return PostToJs('Team/UpdateHistory', {
        History: history
      });
    };

    vm.historyShare = function (history) {
      var shareMsg = $filter('translate')('TeamPreview.pressReleaseShareMsg;t' + AppService.user.TeamName);
      var picture = 'https://www.golacogame.com.br/content/share/ico_compartilhar.jpg';
      var caption = history;

      return PostToJs('share', {
        name: shareMsg,
        picture: picture,
        caption: caption,
        link: 'https://www.golacogame.com.br/?ref_code=sharePressRelease'
      }, null, null, 'share_callback');
    };

    vm.deleteWarning = function (warningId) {
      return PostToJs('Team/DeleteWarning', {
        WarningId: warningId
      });
    };

  });
