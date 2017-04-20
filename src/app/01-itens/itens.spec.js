'use strict';
describe('itens component', function () {
  beforeEach(module('itens', function ($provide) {
    $provide.factory('fountainHeaderDirective', function () {
      return {};
    });
  }));
  beforeEach(module('itens', function ($provide) {
    $provide.factory('fountainTitleDirective', function () {
      return {};
    });
  }));
  beforeEach(module('itens', function ($provide) {
    $provide.factory('fountainTechsDirective', function () {
      return {};
    });
  }));
  beforeEach(module('itens', function ($provide) {
    $provide.factory('fountainFooterDirective', function () {
      return {};
    });
  }));
  it('should render the header, title, techs and footer', angular.mock.inject(function ($rootScope, $compile) {
    var element = $compile('<itens>Loading...</itens>')($rootScope);
    $rootScope.$digest();
    expect(element.find('fountain-header').length).toEqual(1);
    expect(element.find('fountain-title').length).toEqual(1);
    expect(element.find('fountain-techs').length).toEqual(1);
    expect(element.find('fountain-footer').length).toEqual(1);
  }));
});
