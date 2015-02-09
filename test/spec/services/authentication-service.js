describe('authentication service', function() {
  'use strict';

  var userId = 'fbb6ccee-822b-423f-b8cf-e08677f82c1f';
  var validSignInData = {
    username: 'username',
    password: 'PASSWORD'
  };
  var validResponse = {
    access_token: 'ACCESSTOKEN',
    refresh_token: 'REFRESHTOKEN',
    username: 'username',
    user_id: userId,
    roles: 'admin,creator'
  };

  var $httpBackend;
  var $rootScope;
  var $state;
  var localStorageService;
  var analytics;
  var aggregateUserStateService;
  var fifthweekConstants;
  var target;

  beforeEach(function() {
    module('webApp', 'stateMock');
    module(function($provide) {
      localStorageService = {};
      analytics = jasmine.createSpyObj('analytics', ['setUsername']);
      aggregateUserStateService = jasmine.createSpyObj('aggregateUserStateService', ['refreshUserState']);

      $provide.value('localStorageService', localStorageService);
      $provide.value('$analytics', analytics);
      $provide.value('aggregateUserStateService', aggregateUserStateService);
    });

    inject(function($injector) {
      $httpBackend = $injector.get('$httpBackend');
      $rootScope = $injector.get('$rootScope');
      $state = $injector.get('$state');
      fifthweekConstants = $injector.get('fifthweekConstants');
      target = $injector.get('authenticationService');
    });
  });

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  var setupSignOutExpectations = function(){
    localStorageService.remove = function(){};
    spyOn(localStorageService, 'remove');
  };

  var executeSignOutExpectations = function(){
    expect(localStorageService.remove).toHaveBeenCalledWith('currentUser');
    expect(target.currentUser.authenticated).toBeFalsy();
    expect(target.currentUser.username).toBeFalsy();
  };

  describe('when initializing', function(){

    it('should become authenticated if user data exists in local storage', function(){
      localStorageService.get = function(){
        return { authenticated: true, username: 'username' };
      };

      target.initialize();

      expect(target.currentUser.authenticated).toBe(true);
      expect(target.currentUser.username).toBe('username');
    });

    it('should become unauthenticated if user data absent from local storage', function(){
      localStorageService.remove = function(){};
      localStorageService.get = function(){
        return null;
      };

      target.initialize();

      expect(target.currentUser.authenticated).toBe(false);
      expect(target.currentUser.username).toBeFalsy();
    });
  });

  describe('when registering a user', function(){

    it('should ensure the user is logged out and call the register API', function() {

      setupSignOutExpectations();

      var registrationData = {username: 'user'};

      $httpBackend.expectPOST(fifthweekConstants.apiBaseUri + 'membership/registrations', registrationData).respond(200, {});

      var result;
      target.registerUser(registrationData).then(function(response) { result = response; });

      executeSignOutExpectations();

      $httpBackend.flush();
      $rootScope.$apply();
    });

    it('should track the user details against the analytics providers', function() {

      setupSignOutExpectations();

      var registrationData = {username: 'user'};

      $httpBackend.expectPOST(fifthweekConstants.apiBaseUri + 'membership/registrations', registrationData).respond(200, {});

      var result;
      target.registerUser(registrationData).then(function(response) { result = response; });

      executeSignOutExpectations();

      $httpBackend.flush();
      $rootScope.$apply();
    });

    it('should return an ApiError on an unexpected response', function() {

      setupSignOutExpectations();

      var registrationData = {username: 'user'};

      $httpBackend.expectPOST(fifthweekConstants.apiBaseUri + 'membership/registrations', registrationData).respond(500, { message: 'Bad' });

      var result;
      target.registerUser(registrationData).catch(function(response) { result = response; });

      executeSignOutExpectations();

      $httpBackend.flush();
      $rootScope.$apply();

      expect(result instanceof ApiError).toBeTruthy();
      expect(result.message).toBe('Bad');
    });

  });

  describe('when signing a user in', function(){

    it('should sign out before signing in', function(){
      setupSignOutExpectations();

      $httpBackend.expectPOST(fifthweekConstants.apiBaseUri + 'token').respond(200, validResponse);

      localStorageService.set = function(){};

      var result;
      target.signIn(validSignInData).then(function(response){
        result = response;
      });

      executeSignOutExpectations();

      $httpBackend.flush();
      $rootScope.$apply();

      expect(target.currentUser.authenticated).toBe(true);

      expect(result).toBeUndefined();
    });

    it('should set authentication data on successful sign in', function(){
      setupSignOutExpectations();

      $httpBackend.expectPOST(fifthweekConstants.apiBaseUri + 'token').respond(200, validResponse);

      localStorageService.set = function(){};

      var result;
      target.signIn(validSignInData).then(function(response){
        result = response;
      });

      $httpBackend.flush();
      $rootScope.$apply();

      expect(target.currentUser.authenticated).toBe(true);
      expect(target.currentUser.accessToken).toBe('ACCESSTOKEN');
      expect(target.currentUser.refreshToken).toBe('REFRESHTOKEN');
      expect(target.currentUser.username).toBe('username');
      expect(target.currentUser.userId).toBe(userId);
      expect(target.currentUser.roles).toEqual(['admin', 'creator']);

      expect(result).toBeUndefined();
    });

    it('should save the current user on successful sign in', function(){
      setupSignOutExpectations();

      $httpBackend.expectPOST(fifthweekConstants.apiBaseUri + 'token').respond(200, validResponse);

      localStorageService.set = function(){};
      spyOn(localStorageService, 'set');

      var result;
      target.signIn(validSignInData).then(function(response){
        result = response;
      });

      executeSignOutExpectations();

      $httpBackend.flush();
      $rootScope.$apply();

      expect(localStorageService.set).toHaveBeenCalled();
      expect(localStorageService.set.calls.mostRecent().args[1]).toBe(target.currentUser);

      expect(result).toBeUndefined();
    });

    it('should require an access token to be returned', function(){
      setupSignOutExpectations();

      $httpBackend.expectPOST(fifthweekConstants.apiBaseUri + 'token').respond(
        200,
        {
          refresh_token: 'REFRESHTOKEN',
          username: 'username',
          user_id: '123'
        });

      localStorageService.set = function(){};

      var result;
      target.signIn(validSignInData).catch(function(response){
        result = response;
      });

      $httpBackend.flush();
      $rootScope.$apply();

      expect(result instanceof FifthweekError).toBeTruthy();
      expect(result.message).toBe('The access token was not returned');
    });

    it('should require an refresh token to be returned', function(){
      setupSignOutExpectations();

      $httpBackend.expectPOST(fifthweekConstants.apiBaseUri + 'token').respond(
        200,
        {
          access_token: 'ACCESSTOKEN',
          username: 'username',
          user_id: '123'
        });

      localStorageService.set = function(){};

      var result;
      target.signIn(validSignInData).catch(function(response){
        result = response;
      });

      $httpBackend.flush();
      $rootScope.$apply();

      expect(result instanceof FifthweekError).toBeTruthy();
      expect(result.message).toBe('The refresh token was not returned');
    });

    it('should require a user ID to be returned', function(){
      setupSignOutExpectations();

      $httpBackend.expectPOST(fifthweekConstants.apiBaseUri + 'token').respond(
        200,
        {
          access_token: 'ACCESSTOKEN',
          refresh_token: 'REFRESHTOKEN',
          username: 'username'
        });

      localStorageService.set = function(){};

      var result;
      target.signIn(validSignInData).catch(function(response){
        result = response;
      });

      $httpBackend.flush();
      $rootScope.$apply();

      expect(result instanceof FifthweekError).toBeTruthy();
      expect(result.message).toBe('The user ID was not returned');
    });

    it('should require a username to be returned', function(){
      setupSignOutExpectations();

      $httpBackend.expectPOST(fifthweekConstants.apiBaseUri + 'token').respond(
        200,
        {
          access_token: 'ACCESSTOKEN',
          refresh_token: 'REFRESHTOKEN',
          user_id: '123'
        });

      localStorageService.set = function(){};

      var result;
      target.signIn(validSignInData).catch(function(response){
        result = response;
      });

      $httpBackend.flush();
      $rootScope.$apply();

      expect(result instanceof FifthweekError).toBeTruthy();
      expect(result.message).toBe('The username was not returned');
    });

    it('should normalise username using same rules as API', function() {
      // Ensure these are consistent with fifthweek-api 'UserInputNormalizationTests'.

      var signInData = {
        username: '  \t\nUSERNAME\t\n  ',
        password: 'PASSWORD'
      };

      setupSignOutExpectations();

      $httpBackend.expectPOST(fifthweekConstants.apiBaseUri + 'token').respond(
        200,
        {
          access_token: 'ACCESSTOKEN',
          refresh_token: 'REFRESHTOKEN',
          username: 'username',
          user_id: '123'
        });

      localStorageService.set = function(){};
      spyOn(localStorageService, 'set');

      target.signIn(signInData);

      $httpBackend.flush();
      $rootScope.$apply();

      expect(target.currentUser.username).toBe('username');
    });

    it('should ensure we are logged out on unsuccessful sign in', function(){
      $httpBackend.expectPOST(fifthweekConstants.apiBaseUri + 'token').respond(500, { error_description: 'Bad' });

      setupSignOutExpectations();

      var result;
      target.signIn(validSignInData).catch(function(response){
        result = response;
      });

      $httpBackend.flush();
      $rootScope.$apply();

      executeSignOutExpectations();

      expect(target.currentUser.authenticated).toBe(false);

      expect(result instanceof ApiError).toBeTruthy();
      expect(result.message).toBe('Bad');
    });

    it('should track the username against the analytics providers', function () {
      $httpBackend.expectPOST(fifthweekConstants.apiBaseUri + 'token').respond(200, validResponse);
      localStorageService.remove = function(){};
      localStorageService.set = function(){};

      target.signIn(validSignInData);
      $httpBackend.flush();
      $rootScope.$apply();

      expect(analytics.setUsername).toHaveBeenCalledWith(userId);
    });

    it('should refresh aggregate user state', function() {
      $httpBackend.expectPOST(fifthweekConstants.apiBaseUri + 'token').respond(200, validResponse);
      localStorageService.remove = function(){};
      localStorageService.set = function(){};

      target.signIn(validSignInData);
      $httpBackend.flush();
      $rootScope.$apply();

      expect(aggregateUserStateService.refreshUserState).toHaveBeenCalledWith(userId);
    });
  });

  describe('signing a user out', function(){

    it('should clear the local storage and set the user to unauthenticated', function(){
      setupSignOutExpectations();

      target.signOut();

      executeSignOutExpectations();
    });
  });

  describe('when refreshing', function(){

    it('should request a new refresh token and persist it if successful', function(){
      target.currentUser = { authenticated: true };

      localStorageService.set = jasmine.createSpy();

      $httpBackend.expectPOST(fifthweekConstants.apiBaseUri + 'token').respond(200, validResponse);

      var result;
      target.refreshToken().then(function(response){
        result = response;
      });

      $httpBackend.flush();
      $rootScope.$apply();

      expect(localStorageService.set).toHaveBeenCalled();
      expect(result).toBeUndefined();
    });

    it('should request a new refresh token and sign out if unsuccessful', function(){
      target.currentUser = { authenticated: true };

      localStorageService.set = jasmine.createSpy();

      $httpBackend.expectPOST(fifthweekConstants.apiBaseUri + 'token').respond(500, { error_description: 'Bad' });

      setupSignOutExpectations();

      var result;
      target.refreshToken().catch(function(response){
        result = response;
      });

      $httpBackend.flush();
      $rootScope.$apply();

      executeSignOutExpectations();

      expect(localStorageService.set).not.toHaveBeenCalled();

      expect(result instanceof ApiError).toBeTruthy();
      expect(result.message).toBe('Bad');
    });

    it('should error if the user is logged out', function(){

      target.currentUser = { authenticated: false };

      var result;
      target.refreshToken().catch(function(response){
        result = response;
      });

      $rootScope.$apply();

      expect(result instanceof FifthweekError).toBeTruthy();
      expect(result.message).toBe('Cannot refresh the authentication token because the user is not authenticated.');
    });
  });
});