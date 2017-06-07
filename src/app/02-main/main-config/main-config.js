'use strict';
angular.module('app')
  .controller('MainConfigController', function (settings, MainService, ConfirmPopup, AlertPopup) {

    var vm = this;

    vm.settings = settings;

    vm.changeCountry = function (idCountry) {
      ConfirmPopup.open('Atenção', 'Essa operação custa @1 créditos e não pode ser desfeita. Deseja mesmo alterar o nome de seu time?')
        .then(function () {
          MainService.teamChangeCountry(idCountry)
            .then(function () {
              AlertPopup.open('Atenção', 'País do time alterado com sucesso!');
            })
            .catch(function (error) {
              AlertPopup.open('Atenção', error.Message);
            });
        });
    };

    vm.changeTeamName = function (newName, newAcronym) {
      ConfirmPopup.open('Atenção', 'Essa operação custa @1 créditos e não pode ser desfeita. Deseja mesmo alterar o país de seu time?')
        .then(function () {
          MainService.changeTeamName(newName, newAcronym)
            .then(function () {
              AlertPopup.open('Atenção', 'Nome do time alterado com sucesso!');
            })
            .catch(function (error) {
              AlertPopup.open('Atenção', error.Message);
            });
        });
    };

    vm.changeOptionMail = function (mailOptions) {
      ConfirmPopup.open('Atenção', 'Confirmar alteração')
        .then(function () {
          MainService.changeOptionMail(mailOptions.join(';'))
            .then(function () {
              AlertPopup.open('Atenção', 'Opções de email alteradas com sucesso!');
            })
            .catch(function (error) {
              AlertPopup.open('Atenção', error.Message);
            });
        });
    };


  });
