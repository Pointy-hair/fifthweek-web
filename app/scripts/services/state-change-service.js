/// <reference path='../angular.module('webApp')js' />

angular.module('webApp').factory('stateChangeService',
  function(stateChangeAuthorizationService, stateChangeRedirectionService, stateChangeRequireSubscriptionService) {
    'use strict';

    var stateChangeServices = [
      stateChangeAuthorizationService,
      stateChangeRedirectionService,
      stateChangeRequireSubscriptionService
    ];

    var service = {};

    service.isPermitted = function(toState){
      return _.every(stateChangeServices, function(stateAccessService) {
        return stateAccessService.isPermitted(toState);
      });
    };

    service.redirectAwayIfRequired = function(event, toState, toParams){
      _.forEach(stateChangeServices, function(stateAccessService) {
        stateAccessService.redirectAwayIfRequired(event, toState, toParams);
      });
    };

    return service;
  }
);
