angular.module('webApp').controller('fwPostListInformationCtrl',
  function($scope, $q, fwPostListConstants, subscriptionRepositoryFactory, aggregateUserStateConstants, subscriptionStub,
           fetchAggregateUserState, $state, states, errorFacade, landingPageConstants) {
    'use strict';

    var subscriptionRepository = subscriptionRepositoryFactory.forCurrentUser();

    var internal = this.internal = {};

    var model = $scope.model = {
      hasFreeAccess: false,
      updatedPrices: [],
      errorMessage: undefined
    };

    internal.loadSubscribedBlogInformation = function(creatorId, blogs){
      model.hasFreeAccess = false;
      model.updatedPrices = [];

      if(!blogs) {
        return;
      }

      if(creatorId){
        var blog = _.find(blogs, { creatorId: creatorId });
        blogs = [];
        if(blog){
          blogs.push(blog);
          model.hasFreeAccess = blog.freeAccess;
        }
      }

      _.forEach(blogs, function(blog){
        _.forEach(blog.channels, function(channel){
          var currentPrice = blog.freeAccess ? 0 : channel.price;
          if(channel.acceptedPrice !== currentPrice){
            model.updatedPrices.push({
              currentPrice: currentPrice,
              isIncrease: channel.acceptedPrice < currentPrice,
              blog: blog,
              channel: channel
            });
          }
        });
      });
    };

    internal.load = function(){
      if($scope.source === fwPostListConstants.sources.timeline || $scope.source === fwPostListConstants.sources.preview) {
        return internal.loadForCreator($scope.userId)
          .catch(function(error){
            return errorFacade.handleError(error, function(message) {
              model.errorMessage = message;
            });
          });
      }

      return $q.when();
    };

    internal.loadForCreator = function(creatorId){
      return subscriptionRepository.tryGetBlogs()
        .then(function(blogs){
          internal.loadSubscribedBlogInformation(creatorId, blogs);
          return $q.when();
        });
    };

    $scope.acceptPrice = function(updatedPrice){
      return subscriptionStub.putChannelSubscription(
        updatedPrice.channel.channelId,
        {
          acceptedPrice: updatedPrice.currentPrice
        })
        .then(function(){
          _.remove(model.updatedPrices, updatedPrice);

          if(updatedPrice.isIncrease){
            $scope.$emit(fwPostListConstants.reloadEvent);
          }
          else {
            var userId = subscriptionRepository.getUserId();
            return fetchAggregateUserState.updateFromServer(userId);
          }
        })
        .catch(function(error){
          return errorFacade.handleError(error, function(message) {
            model.errorMessage = message;
          });
        });
    };

    $scope.manageSubscription = function(updatedPrice){
      var returnState = $state.current.name === states.landingPage.name ? undefined : $state.current.name;
      $state.go(states.landingPage.name, { username: updatedPrice.blog.username, action: landingPageConstants.actions.manage, key: returnState });
    };

    this.initialize = function(){
      internal.load();

      $scope.$on(aggregateUserStateConstants.updatedEvent, internal.load);
    };
  });
