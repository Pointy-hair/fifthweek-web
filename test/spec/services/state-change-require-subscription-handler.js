describe('state change require subscription handler', function(){
  'use strict';

  var nextState = 'nextState';

  var event;
  var toState;
  var toParams;

  var calculatedStates;
  var subscriptionService;
  var $state;
  var target;

  beforeEach(function(){
    event = jasmine.createSpyObj('event', ['preventDefault']);
    toState = {name: 'a.state'};
    toParams = {};

    calculatedStates = jasmine.createSpyObj('calculatedStates', [ 'getDefaultState' ]);
    subscriptionService = {};

    module('webApp', 'stateMock');
    module(function($provide) {
      $provide.value('calculatedStates', calculatedStates);
      $provide.value('subscriptionService', subscriptionService);
    });

    inject(function($injector) {
      $state = $injector.get('$state');
      target = $injector.get('stateChangeRequireSubscriptionHandler');
    });
  });

  afterEach(function(){
    $state.verifyNoOutstandingTransitions();
  });

  it('should not do anything if the "requireSubscription" field is not present', function(){
    target.handleStateChangeStart(event, toState,  toParams);

    expect(event.preventDefault).not.toHaveBeenCalled();
  });

  it('should redirect to the default state if the flag is true and service returns false', function(){
    toState.requireSubscription = true;
    subscriptionService.hasSubscription = false;
    calculatedStates.getDefaultState.and.returnValue(nextState);

    $state.expectTransitionTo(nextState);

    target.handleStateChangeStart(event, toState,  toParams);

    expect(event.preventDefault).toHaveBeenCalled();
  });

  it('should redirect to the default state if the flag is false and service returns true', function(){
    toState.requireSubscription = false;
    subscriptionService.hasSubscription = true;
    calculatedStates.getDefaultState.and.returnValue(nextState);

    $state.expectTransitionTo(nextState);

    target.handleStateChangeStart(event, toState,  toParams);

    expect(event.preventDefault).toHaveBeenCalled();
  });
});
