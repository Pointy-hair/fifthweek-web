describe('edit channel controller', function () {
  'use strict';

  var currentChannelId = 'channelId';
  var currentChannel;

  var boundaryRoundingValue = '2.51'; // 2.51 * 100 = 250.99999999999997
  var price = boundaryRoundingValue;
  var priceInCents = 251;

  var $q;
  var $scope;
  var $state;
  var states;
  var $controller;
  var target;

  var blogRepositoryFactory;
  var blogRepository;
  var channelStub;
  var errorFacade;

  beforeEach(function() {
    channelStub = jasmine.createSpyObj('channelStub', ['putChannel', 'deleteChannel']);
    blogRepository = jasmine.createSpyObj('blogRepository', ['getChannel', 'updateChannel', 'deleteChannel']);
    blogRepositoryFactory = { forCurrentUser: function() { return blogRepository; }};
    $state = jasmine.createSpyObj('$state', ['go']);
    $state.params = { id: currentChannelId };
    currentChannel = {
      channelId: currentChannelId,
      name: 'channel B',
      price: 101,
      isDefault: true,
      isVisibleToNonSubscribers: false
    };

    module('webApp', 'errorFacadeMock');
    module(function($provide) {
      $provide.value('channelStub', channelStub);
      $provide.value('blogRepositoryFactory', blogRepositoryFactory);
      $provide.value('$state', $state);
    });

    inject(function ($injector) {
      $q = $injector.get('$q');
      $scope = $injector.get('$rootScope').$new();
      states = $injector.get('states');
      $controller = $injector.get('$controller');
      errorFacade = $injector.get('errorFacade');
    });

    channelStub.putChannel.and.returnValue($q.defer().promise);
    channelStub.deleteChannel.and.returnValue($q.defer().promise);
    blogRepository.updateChannel.and.returnValue($q.defer().promise);
    blogRepository.deleteChannel.and.returnValue($q.defer().promise);
  });

  var initializeTarget = function() {
    target = $controller('editChannelCtrl', { $scope: $scope });
  };

  describe('when initializing', function() {
    it('should expose the specified channel', function () {
      blogRepository.getChannel.and.returnValue($q.when(currentChannel));

      initializeTarget();
      $scope.$apply();

      expect(blogRepository.getChannel).toHaveBeenCalledWith(currentChannelId);
      expect($scope.model.channel).toEqual(
        {
          channelId: currentChannel.channelId,
          name: currentChannel.name,
          isDefault: currentChannel.isDefault,
          price: '1.01',
          hidden: true
        });
    });

    it('should expose the channel\'s original name', function () {
      blogRepository.getChannel.and.returnValue($q.when(currentChannel));

      initializeTarget();
      $scope.$apply();

      expect($scope.model.savedChannelName).toBe(currentChannel.name);
    });

    it('should display any error messages when getting the current channel', function () {
      blogRepository.getChannel.and.returnValue($q.reject('error'));

      initializeTarget();
      $scope.$apply();

      expect($scope.model.errorMessage).toBe(errorFacade.expectedMessage('error'));
    });
  });

  describe('once initialized', function() {
    beforeEach(function() {
      blogRepository.getChannel.and.returnValue($q.when(currentChannel));
      initializeTarget();
      $scope.$apply();
    });

    it('should expose the state to return to on completion', function() {
      expect($scope.previousState).toBe(states.creator.channels.name);
    });

    describe('when saving', function() {
      it('should save the updated channel via the API', function() {
        $scope.model.channel.name = 'name';
        $scope.model.channel.hidden = false;
        $scope.model.channel.price = price;

        $scope.save();
        $scope.$apply();

        expect(channelStub.putChannel).toHaveBeenCalledWith(currentChannelId, {
          name: 'name',
          price: priceInCents,
          isVisibleToNonSubscribers: true
        });
      });

      it('should save the updated channel to the client-side repository', function() {
        var channelDelta = {};
        blogRepository.updateChannel.and.callFake(function(channelId, update) {
          update(channelDelta);
          return $q.defer().promise;
        });

        $scope.model.channel.name = 'name';
        $scope.model.channel.hidden = false;
        $scope.model.channel.price = price;
        channelStub.putChannel.and.returnValue($q.when());

        $scope.save();
        $scope.$apply();

        expect(blogRepository.updateChannel).toHaveBeenCalledWith(currentChannelId, jasmine.any(Function));
        expect(channelDelta).toEqual({
          name: 'name',
          price: priceInCents,
          isVisibleToNonSubscribers: true
        });
      });

      it('should return to the previous state on save', function() {
        channelStub.putChannel.and.returnValue($q.when());
        blogRepository.updateChannel.and.returnValue($q.when());

        $scope.save();
        $scope.$apply();

        expect($state.go).toHaveBeenCalledWith($scope.previousState);
      });
    });

    describe('when deleting', function() {
      it('should delete the channel via the API', function() {
        $scope.delete();
        $scope.$apply();

        expect(channelStub.deleteChannel).toHaveBeenCalledWith(currentChannelId);
      });

      it('should delete the channel from the client-side repository', function() {
        channelStub.deleteChannel.and.returnValue($q.when());

        $scope.delete();
        $scope.$apply();

        expect(blogRepository.deleteChannel).toHaveBeenCalledWith(currentChannelId);
      });

      it('should return to the previous state on delete', function() {
        channelStub.deleteChannel.and.returnValue($q.when());
        blogRepository.deleteChannel.and.returnValue($q.when());

        $scope.delete();
        $scope.$apply();

        expect($state.go).toHaveBeenCalledWith($scope.previousState);
      });
    });
  });
});
