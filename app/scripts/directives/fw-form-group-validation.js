angular.module('webApp').directive('fwFormGroupValidation', function ($compile) {
  'use strict';

  return {
    restrict: 'A',
    terminal: true, // http://stackoverflow.com/a/19228302/592768
    priority: 1000,
    link: function(scope, element) {
      var inputName = element.find('input').attr('name');
      var ngClass = '{' +
        '\'has-error\' : form.' + inputName + '.$invalid && ((form.' + inputName + '.$touched && form.' + inputName + '.$dirty) || form.$submitted),' +
        '\'has-success\' : form.' + inputName + '.$valid && form.' + inputName + '.$touched}';
      element.removeAttr('fw-form-group-validation'); // Remove self to avoid infinite compilation loop.
      element.attr('ng-class', ngClass);
      $compile(element)(scope);
    }
  };
});