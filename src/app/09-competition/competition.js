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

              competitionPreview.data.data.registrations = [];

              for (var i = 0; i < competitionPreview.data.data.RegistrationsByLeague.length; i++) {
                var registrations = competitionPreview.data.data.RegistrationsByLeague[i];
                competitionPreview.data.data.registrations[registrations.Id] = registrations.Teams;

              }

              return competitionPreview.data.data;

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

function competitionController ($scope, competitions) {

  var vm = this;

  // vm.competitionPreview = competitionPreview.data.data;
  // vm.competitionData = competitionData;
  vm.competitions = competitions;

};
