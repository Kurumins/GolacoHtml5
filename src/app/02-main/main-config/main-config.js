'use strict';
angular.module('app')
  .controller('MainConfigController', function (settings, MainService, ConfirmPopup, AlertPopup) {

    var vm = this;

    vm.settings = settings;

    vm.changeCountry = function (idCountry) {
      ConfirmPopup.open({
        title: 'Atenção',
        content: 'Essa operação custa @1 créditos e não pode ser desfeita. Deseja mesmo alterar o nome de seu time?'
      })
        .then(function () {
          MainService.teamChangeCountry(idCountry)
            .then(function () {
              // body...
            })
        })
    };

    vm.changeTeamName = function (newName, newAcronym) {
      ConfirmPopup.open({
        title: 'Atenção',
        content: 'Essa operação custa @1 créditos e não pode ser desfeita. Deseja mesmo alterar o país de seu time? '
      })
        .then(function () {
          MainService.changeTeamName(newName, newAcronym)
            .then(function () {
              // body...
            })
            .catch(function (error) {
              AlertPopup.open('Atenção', error.Message);
            })
        })
    };


  });
