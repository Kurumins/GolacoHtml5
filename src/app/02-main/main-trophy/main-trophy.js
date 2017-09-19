'use strict';
angular.module('app')
  .controller('MainTrophyController', function (MainService, teamTrophyRoom) {

    var vm = this;

    // vm.slickConfig = {
    //   method: {},
    //   event: {
    //     afterChange: function (event, slick, currentSlide/*, nextSlide*/) {
    //       vm.currentSlide = currentSlide / 2 + 1;
    //     },
    //     // init: function (event, slick) {
    //     // }
    //   }
    // };

    // vm.currentSlide = 1;

    vm.beforeChange = function (event, slick, currentSlide, nextSlide) {
      teamTrophys[slick.originalSettings.teamTrophy].currentTrophie= teamTrophys[slick.originalSettings.teamTrophy].trophies[nextSlide];
      debugger;
    };

    var teamTrophys = [];

    teamTrophyRoom.Leagues.push({
        "Image": "https://www.golacogame.com.br/content/trophy/1-1.png",
        "Position": 1,
        "Date": 1497303782000,
        "IdLeague": 4,
        "IdCompetitionType": 1,
        "Name": ""
      });

    if (teamTrophyRoom.hasOwnProperty('Leagues')) {
      teamTrophys.push( { competitionLabel: 'lblLeague', competitionType: 1, trophies: teamTrophyRoom.Leagues, currentTrophie: teamTrophyRoom.Leagues[0] } );
    }
    if (teamTrophyRoom.hasOwnProperty('Tournament')) {
      teamTrophys.push( { competitionLabel: 'lblChampionship', competitionType: 2, trophies: teamTrophyRoom.Tournament, currentTrophie: teamTrophyRoom.Tournament[0] } );
    }
    if (teamTrophyRoom.hasOwnProperty('Cups')) {
      teamTrophys.push( { competitionLabel: 'lblCup', competitionType: 3, trophies: teamTrophyRoom.Cups, currentTrophie: teamTrophyRoom.Cups[0] } );
    }
    if (teamTrophyRoom.hasOwnProperty('FriendsLeague')) {
      teamTrophys.push( { competitionLabel: 'lblSuperLeague', competitionType: 6, trophies: teamTrophyRoom.FriendsLeague, currentTrophie: teamTrophyRoom.FriendsLeague[0] } );
    }
    if (teamTrophyRoom.hasOwnProperty('TournamentLight')) {
      teamTrophys.push( { competitionLabel: 'lblMiniChampionship', competitionType: 4, trophies: teamTrophyRoom.TournamentLight, currentTrophie: teamTrophyRoom.TournamentLight[0] } );
    }
    if (teamTrophyRoom.hasOwnProperty('CupLight')) {
      teamTrophys.push( { competitionLabel: 'lblMiniCup', competitionType: 5, trophies: teamTrophyRoom.CupLight, currentTrophie: teamTrophyRoom.CupLight[0] } );
    }
    // if (UserVO.getInstance().appId === 1) {
    if (teamTrophyRoom.hasOwnProperty('CopaNordeste')) {
      teamTrophys.push( { competitionLabel: 'lblNECup', competitionType: 7, trophies: teamTrophyRoom.CopaNordeste, currentTrophie: teamTrophyRoom.CopaNordeste[0] } );
    }
    // }

    vm.teamTrophys = teamTrophys;

  });
