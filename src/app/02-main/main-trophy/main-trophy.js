'use strict';
angular.module('app')
  .controller('MainTrophyController', function (MainService, teamTrophyRoom) {

    var vm = this;

    vm.slickConfig = {
      method: {},
      event: {
        afterChange: function (event, slick, currentSlide/*, nextSlide*/) {
          vm.currentSlide = currentSlide / 2 + 1;
        },
        // init: function (event, slick) {
        // }
      }
    };

    vm.currentSlide = 1;

    var teamTrophys = [];

    if (teamTrophyRoom.hasOwnProperty('Leagues')) {
      teamTrophys.push( { competitionType: 1, trophies: teamTrophyRoom.Leagues } );
    }
    if (teamTrophyRoom.hasOwnProperty('Tournament')) {
      teamTrophys.push( { competitionType: 2, trophies: teamTrophyRoom.Tournament } );
    }
    if (teamTrophyRoom.hasOwnProperty('Cups')) {
      teamTrophys.push( { competitionType: 3, trophies: teamTrophyRoom.Cups } );
    }
    if (teamTrophyRoom.hasOwnProperty('FriendsLeague')) {
      teamTrophys.push( { competitionType: 6, trophies: teamTrophyRoom.FriendsLeague } );
    }
    if (teamTrophyRoom.hasOwnProperty('TournamentLight')) {
      teamTrophys.push( { competitionType: 4, trophies: teamTrophyRoom.TournamentLight } );
    }
    if (teamTrophyRoom.hasOwnProperty('CupLight')) {
      teamTrophys.push( { competitionType: 5, trophies: teamTrophyRoom.CupLight } );
    }
    // if (UserVO.getInstance().appId === 1) {
    if (teamTrophyRoom.hasOwnProperty('CopaNordeste')) {
      teamTrophys.push( { competitionType: 7, trophies: teamTrophyRoom.CopaNordeste } );
    }
    // }

    vm.teamTrophys = teamTrophys;

  });
