'use strict';
angular.module('app')
  .config(mainRoutesConfig);

function mainRoutesConfig ($stateProvider) {

  $stateProvider
    .state('app.competition', {
      url: '/competition',
      resolve: {
        competitionPreview: function (CompetitionService) {
          return CompetitionService.competitionPreview()
            .then(function (competitionPreview) {

              competitionPreview.registrations = [];

              for (var i = 0; i < competitionPreview.RegistrationsByLeague.length; i++) {
                var registrations = competitionPreview.RegistrationsByLeague[i];
                competitionPreview.registrations[registrations.Id] = registrations.Teams;

              }

              return competitionPreview;

            })
        },

        competitionData: function (CompetitionService) {
          return CompetitionService.competitionData()
            .then(function (competitionData) {

              var result = [];

              for (var i = 0; i < competitionData.data.data.competition.length; i++) {
                var competition = competitionData.data.data.competition[i];
                result[competition.type] = competition;
              }

              return result;

            })
        },

        competitions: function (competitionPreview, competitionData) {

          var competitions= [
            {
              id: 1,
              name: 'CompetitionLeague',
              // data: vm.competitionPreview['CompetitionLeague']
            },
            {
              id: 2,
              name: 'CompetitionTournament',
              // data: vm.competitionPreview['CompetitionTournament']
            },
            {
              id: 3,
              name: 'CompetitionCup',
              // data: vm.competitionPreview['CompetitionCup']
            },
            {
              id: 4,
              name: 'CompetitionTournamentLight',
              // data: vm.competitionPreview['CompetitionTournamentLight']
            },
            {
              id: 5,
              name: 'CompetitionCupLight',
              // data: vm.competitionPreview['CompetitionCupLight']
            },
            // {
            //   id: 1,
            //   name: 'CompetitionCopaNordeste',
              // data: vm.competitionPreview['CompetitionCopa']
            // },
            // {
            //   id: 1,
            //   name: 'CompetitionTournamentBeta',
              // data: vm.competitionPreview['CompetitionTour']
            // },
          ];

          for (var i = 0; i < competitions.length; i++) {
            var competition = competitions[i];

            competition.preview = competitionPreview[competition.name];
            competition.data = competitionData[competition.id];
            competition.registrations = competitionPreview.registrations[competition.id];;

          }

          return competitions;

        },

      },
      templateUrl: 'competition.html',
      controller: competitionController,
      controllerAs: '$ctrl'
    });
}

function competitionController ($scope, competitions, ngDialog) {

  var vm = this;

  vm.competitions = competitions;

  vm.competitionDetails = function (competition) {
    ngDialog.open({
      template: 'competition-details.html',
      appendClassName: 'ngdialog-competition-details',
      controller: 'CompetitionDetailsController as $ctrl',
      scope: $scope,
      resolve: {
        competition: function () {
          return competition;
        }
      },
    });
  };

  vm.friendlyMatch = function () {
    ngDialog.open({
      template: 'friendly-match.html',
      appendClassName: 'ngdialog-friendly-match',
      controller: 'FriendlyMatchController as $ctrl',
      scope: $scope
    });
  };

  // vm.friendlyMatch();

};
