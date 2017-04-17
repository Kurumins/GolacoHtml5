describe('menu component', function () {
  beforeEach(module('app', function ($provide) {
    $provide.factory('fountainMenu', function () {
      return {
        templateUrl: 'app/components/menu/menu.html'
      };
    });
  }));
  it('should render \'Allo, \'Allo!', angular.mock.inject(function ($rootScope, $compile) {
    var element = $compile('<fountain-menu></fountain-menu>')($rootScope);
    $rootScope.$digest();
    var menu = element.find('h1');
    expect(menu.html().trim()).toEqual('\'Allo, \'Allo!');
  }));
});
