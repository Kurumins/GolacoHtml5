'use strict';
angular.module('app')
  .controller('MainConfigController', function ($rootScope, $scope, settings, MainService, ConfirmPopup, AlertPopup, AppService) {

    var vm = this;

    vm.settings = settings;

    vm.changeCountry = function (idCountry) {
      ConfirmPopup.open('Error.errorTitle', 'ConfigScr.teamCountryChangeConfirm;n' + settings.ChangeCountryPrice)
        .then(function () {
          MainService.teamChangeCountry(idCountry)
            .then(function () {
              AlertPopup.open('Error.errorTitle', 'ConfigScr.teamCountryChangeSuccess');
              $rootScope.$emit('balanceUpdate');
              AppService.teamPreview.IdCountry = idCountry;
            })
            .catch(function (error) {
              AlertPopup.open('Error.errorTitle', error.Message);
            });
        });
    };

    vm.changeTeamName = function (newName, newAcronym, closeThisDialog) {
      ConfirmPopup.open('Error.errorTitle', 'ConfigScr.teamNameChangeConfirm;n' + settings.Price)
        .then(function () {
          MainService.changeTeamName(newName, newAcronym)
            .then(function () {
              AlertPopup.open('Error.errorTitle', 'ConfigScr.teamNameChangeSuccess');
              $rootScope.$emit('balanceUpdate');
              AppService.user.TeamName = newName;
              AppService.user.Acronym = newAcronym;

              if (closeThisDialog) {
                $scope.closeThisDialog();
              }
            })
            .catch(function (error) {
              AlertPopup.open('Error.errorTitle', 'Error.'+error.Message);
            });
        });
    };

    vm.changeOptionMail = function (mailOptions) {
      ConfirmPopup.open('Error.errorTitle', 'ConfigScr.emailOptionsChangeConfirm')
        .then(function () {
          MainService.changeOptionMail(mailOptions.join(';'))
            .then(function () {
              AlertPopup.open('Error.errorTitle', 'ConfigScr.emailoptionsChangeSuccess');
            })
            .catch(function (error) {
              AlertPopup.open('Error.errorTitle', error.Message);
            });
        });
    };


  });
