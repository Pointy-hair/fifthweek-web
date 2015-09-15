angular.module('webApp')
  .constant('landingPageConstants', {
    views: {
      manage: 'manage',
      blog: 'blog'
    },
    actions: {
      manage: 'manage',
      all: 'all',
      channel: 'channel'
    }
  })
  .controller('landingPageCtrl',
  function($scope, $q, $sce, landingPageConstants, authenticationServiceConstants, fetchAggregateUserState, blogStub, subscribeService, accountSettingsRepositoryFactory, blogRepositoryFactory, subscriptionRepositoryFactory, aggregateUserStateConstants, initializer, $stateParams, $state, states, errorFacade) {
    'use strict';

    var accountSettingsRepository = accountSettingsRepositoryFactory.forCurrentUser();
    var blogRepository = blogRepositoryFactory.forCurrentUser();
    var subscriptionRepository = subscriptionRepositoryFactory.forCurrentUser();

    $scope.model = {
      // These need to appear in a JS file, as the Grunt task for swapping file names that appear within JS will only
      // inspect *.js files.
      defaultHeaderImageUrl: '/static/images/header-default.jpg',
      defaultProfileImageUrl: '/static/images/avatar-default.jpg',
      tracking: {
        unsubscribedTitle: 'Unsubscribed',
        updatedTitle: 'Subscription Updated',
        subscribedTitle: 'Subscribed',
        category: 'Timeline'
      },
      isSubscribed: false,
      isLoaded: false,
      isOwner: false,
      hasFreeAccess: false,
      subscribedChannels: {},
      totalPrice: undefined,
      subscribedChannelCount: undefined,
      username: undefined,
      currentView: undefined,
      returnState: undefined,
      channelId: undefined
    };

    var internal = this.internal = {};

    internal.currentUserUpdated = function(event, user){
      var isOwner = user.userId === $scope.model.userId;
      if(isOwner !== $scope.model.isOwner) {
        $state.reload();
      }
      else{
        accountSettingsRepository = accountSettingsRepositoryFactory.forCurrentUser();
        blogRepository = blogRepositoryFactory.forCurrentUser();
        subscriptionRepository = subscriptionRepositoryFactory.forCurrentUser();
      }
    };

    internal.populateSubscriptionFromUserState = function(blogId){
      return subscribeService.getSubscriptionStatus(subscriptionRepository, blogId)
        .then(function(subscriptionStatus){
          $scope.model.hasFreeAccess = subscriptionStatus.hasFreeAccess;
          $scope.model.isSubscribed = subscriptionStatus.isSubscribed;
          $scope.model.subscribedChannels = subscriptionStatus.subscribedChannels;
          $scope.model.hiddenChannels = subscriptionStatus.hiddenChannels;
        });
    };

    internal.loadFromApi = function(username){
      $scope.model.isOwner = false;
      return blogStub.getLandingPage(username)
        .then(function(response){
          _.merge($scope.model, response.data);
          return internal.populateSubscriptionFromUserState($scope.model.blog.blogId);
        });
    };

    internal.loadFromLocal = function(accountSettings){
      $scope.model.userId = blogRepository.getUserId();
      $scope.model.isOwner = true;
      $scope.model.hasFreeAccess = false;
      $scope.model.isSubscribed = $scope.model.currentView === landingPageConstants.views.blog;
      $scope.model.profileImage = accountSettings.profileImage;

      return blogRepository.getBlog()
        .then(function(blog) {
          $scope.model.blog = blog;
        });
    };

    internal.recalculateChannels = function(){
      var returnedChannels = _.chain($scope.model.blog.channels)
        .map(function(channel) {
          var subscriptionInformation = $scope.model.subscribedChannels[channel.channelId];
          return {
            isVisibleToNonSubscribers: channel.isVisibleToNonSubscribers,
            channelId: channel.channelId,
            name: channel.name,
            price: channel.price,
            subscriptionInformation: subscriptionInformation,
            checked: !!subscriptionInformation
          };
        });

      var hiddenChannels = _.chain($scope.model.hiddenChannels)
        .map(function(channel){
          var subscriptionInformation = $scope.model.subscribedChannels[channel.channelId];
          return {
            isVisibleToNonSubscribers: false,
            channelId: channel.channelId,
            name: channel.name,
            price: channel.price,
            subscriptionInformation: subscriptionInformation,
            checked: true
          };
        });

      var allChannels = returnedChannels.concat(hiddenChannels.value());

      $scope.model.channels = allChannels
        .filter(function(channel){
          // Return channels that are not visible to non-subscribers if user is a subscriber.
          return channel.isVisibleToNonSubscribers || channel.checked;
        })
        .sortByOrder(['name'], [true])
        .value();
    };

    internal.reloadFromUserState = function(){
      if(!$scope.model.isLoaded || $scope.model.isOwner){
        return $q.when();
      }

      return internal.populateSubscriptionFromUserState($scope.model.blog.blogId)
        .then(function(){
          internal.recalculateChannels();
        });
    };

    internal.postProcessResults = function(){
      if ($scope.model.blog.video) {
        $scope.model.videoUrl = $sce.trustAsResourceUrl($scope.model.blog.video.replace('http://', '//').replace('https://', '//'));
      }

      internal.recalculateChannels();
    };

    internal.populateLandingPageData = function(){
      return accountSettingsRepository.getAccountSettings()
        .then(function(accountSettings) {
          var username = $scope.model.username;
          return accountSettings && accountSettings.username === username ?
            internal.loadFromLocal(accountSettings) :
            internal.loadFromApi(username);
        })
        .then(function(){
          internal.postProcessResults();
          $scope.$watch('model.channels', internal.updateTotalPrice, true);
        });
    };

    internal.updateCurrentViewIfRequired = function(){
      if(!$scope.model.currentView){
        $scope.model.currentView = $scope.model.isSubscribed ?
          landingPageConstants.views.blog :
          landingPageConstants.views.manage;
      }

      if(!$scope.model.isSubscribed && $scope.model.currentView === landingPageConstants.views.blog){
        $state.go($state.current.name, { username: $scope.model.username, action: null, key: null });
      }
    };

    internal.loadParameters = function(){
      if(!$stateParams.username){
        return false;
      }

      $scope.model.username = $stateParams.username.toLowerCase();

      var action = $stateParams.action;
      var key = $stateParams.key;
      if(action){
        switch(action) {
          case landingPageConstants.actions.manage:
            $scope.model.currentView = landingPageConstants.views.manage;
            $scope.model.returnState = key;
            break;

          case landingPageConstants.actions.all:
            $scope.model.currentView = landingPageConstants.views.blog;
            break;

          case landingPageConstants.actions.channel:
            $scope.model.currentView = landingPageConstants.views.blog;
            if(!key){
              return false;
            }
            $scope.model.channelId = key;
            break;

          default:
            return false;
        }
      }

      return true;
    };

    internal.initialize = function(){
      return fetchAggregateUserState.waitForExistingUpdate()
        .then(function(){
          return internal.loadLandingPage();
        })
        .catch(function(error){
          return errorFacade.handleError(error, function(message) {
            $scope.model.errorMessage = message;
          });
        })
        .finally(function(){
          $scope.model.isLoaded = true;
        });

    };

    internal.loadLandingPage = function(){
      if(!internal.loadParameters()){
        $state.go(states.notFound.name);
        return $q.when();
      }

      $scope.views = landingPageConstants.views;
      $scope.$on(aggregateUserStateConstants.updatedEvent, internal.reloadFromUserState);
      $scope.$on(authenticationServiceConstants.currentUserChangedEvent, internal.currentUserUpdated);

      return internal.populateLandingPageData()
        .then(function(){
          internal.updateCurrentViewIfRequired();
        })
        .catch(function(error){
          if(error instanceof ApiError && error.response && error.response.status === 404) {
            $state.go(states.notFound.name);
            return $q.when();
          }

          return $q.reject(error);
        });
    };

    internal.updateTotalPrice = function(){
      var result = _($scope.model.channels)
        .filter({checked: true})
        .reduce(
        function(sum, channel) {
          sum.totalPrice = sum.totalPrice + parseFloat(channel.price);
          sum.count++;
          return sum;
        },
        {totalPrice: 0, count: 0});

      $scope.model.totalPrice = result.totalPrice;
      $scope.model.subscribedChannelCount = result.count;
    };

    internal.redirectIfRequired = function(){
      if($scope.model.returnState){
        $state.go($scope.model.returnState);
        return true;
      }
      else if($stateParams.action === landingPageConstants.actions.manage){
        $state.go($state.current.name, { username: $scope.model.username, action: null, key: null });
        return true;
      }

      return false;
    };

    internal.redirectToUnfilteredViewIfRequired = function(){
      if($stateParams.action === landingPageConstants.actions.channel){
        $state.go($state.current.name, { username: $scope.model.username, action: landingPageConstants.actions.all, key: null });
        return true;
      }

      return false;
    };

    initializer.initialize(internal.initialize);

    $scope.manageSubscription = function(){
      $scope.model.currentView = landingPageConstants.views.manage;
    };

    $scope.cancelManageSubscription = function(){
      if(!internal.redirectIfRequired()){
        $scope.model.currentView = landingPageConstants.views.blog;
      }
    };

    $scope.subscribe = function() {
      var hasFreeAccess = $scope.model.hasFreeAccess;

      var subscriptions = _($scope.model.channels)
        .filter({checked: true})
        .map(function(v){
          return {
            channelId: v.channelId,
            acceptedPrice: hasFreeAccess ? 0 : v.price
          };
        })
        .value();

      return subscribeService.subscribe($scope.model.blog.blogId, subscriptions)
        .then(function(result){
          if(result){
            if(!internal.redirectIfRequired() && !internal.redirectToUnfilteredViewIfRequired()){
              // Loading the blog will update user state, and then we
              // reload from user state when the user clicks 'manage'.
              $scope.model.isSubscribed = true;
              $scope.model.channelId = undefined;
              $scope.model.currentView = landingPageConstants.views.blog;
            }
          }
        });
    };

    $scope.unsubscribe = function() {
      if($scope.model.isOwner){
        $state.reload();
        return;
      }

      return subscribeService.unsubscribe($scope.model.blog.blogId)
        .then(function(){
          internal.redirectIfRequired();
        });
    };
  }
);
