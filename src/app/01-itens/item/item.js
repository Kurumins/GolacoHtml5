'use strict';
angular
  .module('app')
  .component('item', {
    templateUrl: 'item.html',
    bindings: {
      item: '=value'
    }
  });
