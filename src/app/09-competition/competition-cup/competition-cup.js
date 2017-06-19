'use strict';
angular.module('app')
  .controller('CompetitionCupController', function ($timeout, cup, cupSummary, cupPlayOff, cupSemifinal, cupFinals) {

    var vm = this;

    vm.cup = cup;

    vm.commonSummary = cupSummary;
    vm.competitionSeries = ' ABCD'.charAt(vm.commonSummary.CompetitionSeries);

    // vm.cupRanking = cupRanking;
    // vm.cupRankingCurrentGroup = cupRanking.Ranking[0];

    // vm.cupMatchTable = cupMatchTable;

    // vm.cupCalendar = cupCalendar;
    // vm.setCalendar = function (calendar) {
    //   vm.cupCalendarCurrentGroup = null;
    //   $timeout(function () {
    //     vm.cupCalendarCurrentGroup = calendar;
    //   }, 1);
    // };
    // vm.setCalendar(vm.cupCalendar.Calendar[0]);

    vm.cupPlayOff = cupPlayOff;
    vm.cupSemifinal = cupSemifinal;
    // vm.cupSemifinal.Matches = [
    //   {
    //     "HomeTeam": {
    //       "Acronym": "RDB",
    //       "Badge": "https://o2games-golaco.s3.amazonaws.com/badges/24x24/002279539.png",
    //       "Flag": 14,
    //       "Goals": 3,
    //       "Id": 2279539,
    //       "IdSocialNetwork": "105211686728897",
    //       "Name": "Ruim De Bola",
    //       "Picture": "https://graph.facebook.com/v2.2/105211686728897/picture?type=normal",
    //       "UserFlag": 4,
    //       "UserName": "Sisacky Ruana"
    //     },
    //     "Id": 72101915,
    //     "MatchDate": 1497106800000,
    //     "Status": true,
    //     "VisitorTeam": {
    //       "Acronym": "VIT",
    //       "Badge": "https://o2games-golaco.s3.amazonaws.com/badges/24x24/002241823.png",
    //       "Flag": 4,
    //       "Goals": 0,
    //       "Id": 2241823,
    //       "IdSocialNetwork": "618949048263883",
    //       "Name": "Vitoria",
    //       "Picture": "https://graph.facebook.com/v2.2/618949048263883/picture?type=normal",
    //       "UserFlag": 4,
    //       "UserName": "Igor Soares"
    //     }
    //   },
    //   {
    //     "HomeTeam": {
    //       "Acronym": "VIT",
    //       "Badge": "https://o2games-golaco.s3.amazonaws.com/badges/24x24/002241823.png",
    //       "Flag": 4,
    //       "Goals": 0,
    //       "Id": 2241823,
    //       "IdSocialNetwork": "618949048263883",
    //       "Name": "Vitoria",
    //       "Picture": "https://graph.facebook.com/v2.2/618949048263883/picture?type=normal",
    //       "UserFlag": 4,
    //       "UserName": "Igor Soares"
    //     },
    //     "Id": 72101916,
    //     "MatchDate": 1497193200000,
    //     "Status": true,
    //     "VisitorTeam": {
    //       "Acronym": "RDB",
    //       "Badge": "https://o2games-golaco.s3.amazonaws.com/badges/24x24/002279539.png",
    //       "Flag": 14,
    //       "Goals": 3,
    //       "Id": 2279539,
    //       "IdSocialNetwork": "105211686728897",
    //       "Name": "Ruim De Bola",
    //       "Picture": "https://graph.facebook.com/v2.2/105211686728897/picture?type=normal",
    //       "UserFlag": 4,
    //       "UserName": "Sisacky Ruana"
    //     }
    //   },
    //   {
    //     "HomeTeam": {
    //       "Acronym": "E.F.",
    //       "Badge": "https://o2games-golaco.s3.amazonaws.com/badges/24x24/002279890.png",
    //       "Flag": 6,
    //       "Goals": 0,
    //       "Id": 2279890,
    //       "IdSocialNetwork": "103341206934626",
    //       "Name": "Estrela De Fogo",
    //       "Picture": "https://graph.facebook.com/v2.2/103341206934626/picture?type=normal",
    //       "UserFlag": 4,
    //       "UserName": "Abraao Braz"
    //     },
    //     "Id": 72101917,
    //     "MatchDate": 1497106800000,
    //     "Status": true,
    //     "VisitorTeam": {
    //       "Acronym": "VDG",
    //       "Badge": "https://o2games-golaco.s3.amazonaws.com/badges/24x24/002279918.png",
    //       "Flag": 4,
    //       "Goals": 3,
    //       "Id": 2279918,
    //       "IdSocialNetwork": "114592965795704",
    //       "Name": "Vasco da gama",
    //       "Picture": "https://graph.facebook.com/v2.2/114592965795704/picture?type=normal",
    //       "UserFlag": 4,
    //       "UserName": "Luan Henryq"
    //     }
    //   },
    //   {
    //     "HomeTeam": {
    //       "Acronym": "VDG",
    //       "Badge": "https://o2games-golaco.s3.amazonaws.com/badges/24x24/002279918.png",
    //       "Flag": 4,
    //       "Goals": 3,
    //       "Id": 2279918,
    //       "IdSocialNetwork": "114592965795704",
    //       "Name": "Vasco da gama",
    //       "Picture": "https://graph.facebook.com/v2.2/114592965795704/picture?type=normal",
    //       "UserFlag": 4,
    //       "UserName": "Luan Henryq"
    //     },
    //     "Id": 72101918,
    //     "MatchDate": 1497193200000,
    //     "Status": true,
    //     "VisitorTeam": {
    //       "Acronym": "E.F.",
    //       "Badge": "https://o2games-golaco.s3.amazonaws.com/badges/24x24/002279890.png",
    //       "Flag": 6,
    //       "Goals": 1,
    //       "Id": 2279890,
    //       "IdSocialNetwork": "103341206934626",
    //       "Name": "Estrela De Fogo",
    //       "Picture": "https://graph.facebook.com/v2.2/103341206934626/picture?type=normal",
    //       "UserFlag": 4,
    //       "UserName": "Abraao Braz"
    //     }
    //   }
    // ];
    vm.cupFinals = cupSemifinal;
    // vm.cupFinals.Matches = [
    //   {
    //     "HomeTeam": {
    //       "Acronym": "RDB",
    //       "Badge": "https://o2games-golaco.s3.amazonaws.com/badges/24x24/002279539.png",
    //       "Flag": 14,
    //       "Goals": 3,
    //       "Id": 2279539,
    //       "IdSocialNetwork": "105211686728897",
    //       "Name": "Ruim De Bola",
    //       "Picture": "https://graph.facebook.com/v2.2/105211686728897/picture?type=normal",
    //       "UserFlag": 4,
    //       "UserName": "Sisacky Ruana"
    //     },
    //     "Id": 72101915,
    //     "MatchDate": 1497106800000,
    //     "Status": true,
    //     "VisitorTeam": {
    //       "Acronym": "VIT",
    //       "Badge": "https://o2games-golaco.s3.amazonaws.com/badges/24x24/002241823.png",
    //       "Flag": 4,
    //       "Goals": 0,
    //       "Id": 2241823,
    //       "IdSocialNetwork": "618949048263883",
    //       "Name": "Vitoria",
    //       "Picture": "https://graph.facebook.com/v2.2/618949048263883/picture?type=normal",
    //       "UserFlag": 4,
    //       "UserName": "Igor Soares"
    //     }
    //   },
    //   {
    //     "HomeTeam": {
    //       "Acronym": "VIT",
    //       "Badge": "https://o2games-golaco.s3.amazonaws.com/badges/24x24/002241823.png",
    //       "Flag": 4,
    //       "Goals": 0,
    //       "Id": 2241823,
    //       "IdSocialNetwork": "618949048263883",
    //       "Name": "Vitoria",
    //       "Picture": "https://graph.facebook.com/v2.2/618949048263883/picture?type=normal",
    //       "UserFlag": 4,
    //       "UserName": "Igor Soares"
    //     },
    //     "Id": 72101916,
    //     "MatchDate": 1497193200000,
    //     "Status": true,
    //     "VisitorTeam": {
    //       "Acronym": "RDB",
    //       "Badge": "https://o2games-golaco.s3.amazonaws.com/badges/24x24/002279539.png",
    //       "Flag": 14,
    //       "Goals": 3,
    //       "Id": 2279539,
    //       "IdSocialNetwork": "105211686728897",
    //       "Name": "Ruim De Bola",
    //       "Picture": "https://graph.facebook.com/v2.2/105211686728897/picture?type=normal",
    //       "UserFlag": 4,
    //       "UserName": "Sisacky Ruana"
    //     }
    //   },
    //   {
    //     "HomeTeam": {
    //       "Acronym": "E.F.",
    //       "Badge": "https://o2games-golaco.s3.amazonaws.com/badges/24x24/002279890.png",
    //       "Flag": 6,
    //       "Goals": 0,
    //       "Id": 2279890,
    //       "IdSocialNetwork": "103341206934626",
    //       "Name": "Estrela De Fogo",
    //       "Picture": "https://graph.facebook.com/v2.2/103341206934626/picture?type=normal",
    //       "UserFlag": 4,
    //       "UserName": "Abraao Braz"
    //     },
    //     "Id": 72101917,
    //     "MatchDate": 1497106800000,
    //     "Status": true,
    //     "VisitorTeam": {
    //       "Acronym": "VDG",
    //       "Badge": "https://o2games-golaco.s3.amazonaws.com/badges/24x24/002279918.png",
    //       "Flag": 4,
    //       "Goals": 3,
    //       "Id": 2279918,
    //       "IdSocialNetwork": "114592965795704",
    //       "Name": "Vasco da gama",
    //       "Picture": "https://graph.facebook.com/v2.2/114592965795704/picture?type=normal",
    //       "UserFlag": 4,
    //       "UserName": "Luan Henryq"
    //     }
    //   },
    //   {
    //     "HomeTeam": {
    //       "Acronym": "VDG",
    //       "Badge": "https://o2games-golaco.s3.amazonaws.com/badges/24x24/002279918.png",
    //       "Flag": 4,
    //       "Goals": 3,
    //       "Id": 2279918,
    //       "IdSocialNetwork": "114592965795704",
    //       "Name": "Vasco da gama",
    //       "Picture": "https://graph.facebook.com/v2.2/114592965795704/picture?type=normal",
    //       "UserFlag": 4,
    //       "UserName": "Luan Henryq"
    //     },
    //     "Id": 72101918,
    //     "MatchDate": 1497193200000,
    //     "Status": true,
    //     "VisitorTeam": {
    //       "Acronym": "E.F.",
    //       "Badge": "https://o2games-golaco.s3.amazonaws.com/badges/24x24/002279890.png",
    //       "Flag": 6,
    //       "Goals": 1,
    //       "Id": 2279890,
    //       "IdSocialNetwork": "103341206934626",
    //       "Name": "Estrela De Fogo",
    //       "Picture": "https://graph.facebook.com/v2.2/103341206934626/picture?type=normal",
    //       "UserFlag": 4,
    //       "UserName": "Abraao Braz"
    //     }
    //   }
    // ];

  })
  .factory('CompetitionCup', function (CompetitionService, ngDialog) {

    this.open = function (cup) {
      ngDialog.open({
        template: 'competition-cup.html',
        appendClassName: 'ngdialog-competition-cup',
        controller: 'CompetitionCupController as $ctrl',
        // scope: $scope,
        resolve: {
          cup: function () {
            return cup;
          },
          cupSummary: function () {
            return CompetitionService.getCupSummary(cup.preview.IdCompetition);
          },
          // cupRanking: function () {
          //   return CompetitionService.getCupRanking();
          // },
          // cupMatchTable: function () {
          //   return CompetitionService.getCupMatchTable();
          // },
          // cupCalendar: function () {
          //   return CompetitionService.getCupCalendar();
          // },
          cupPlayOff: function () {
            return CompetitionService.getCupPlayOff(cup.preview.IdCompetition);
          },
          cupSemifinal: function () {
            return CompetitionService.getCupSemifinal(cup.preview.IdCompetition);
          },
          cupFinals: function () {
            return CompetitionService.getCupFinals(cup.preview.IdCompetition);
          },
        },
      });
    };

    return this;

  });
