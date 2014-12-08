'use strict';

describe('help controller', function () {

  // load the controller's module
  beforeEach(module('webApp'));

  var HelpCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    HelpCtrl = $controller('HelpCtrl', {
    });
  }));
});
