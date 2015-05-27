angular.module('webApp').controller('fwPostListHeaderCtrl',
  function($scope, $q, fwPostListConstants, subscriptionRepositoryFactory, blogRepositoryFactory, aggregateUserStateConstants, errorFacade) {
    'use strict';

    var subscriptionRepository = subscriptionRepositoryFactory.forCurrentUser();
    var blogRepository = blogRepositoryFactory.forCurrentUser();

    var internal = this.internal = {};

    var model = $scope.model = {
      channelName: undefined,
      collectionName: undefined,
      errorMessage: undefined
    };

    internal.loadFromBlogs = function(creatorId, channelId, collectionId, blogs){
      if(!creatorId){
        return;
      }

      if(!channelId && !collectionId){
        return;
      }

      var blog = _.find(blogs, { creatorId: creatorId });

      var channel;
      var collection;
      if(channelId && blog.channels){
        channel = _.find(blog.channels, { channelId: channelId });

        if(collectionId && channel && channel.collections){
          collection = _.find(channel.collections, { collectionId: collectionId });
        }
      }
      else if(blog.channels){
        _.forEach(blog.channels, function(ch){
          if(ch.collections){
            collection = _.find(ch.collections, { collectionId: collectionId });
            if(collection){
              channel = ch;
              return false;
            }
          }
        });
      }

      if(channel){
        model.channelName = channel.name;
        if(collection){
          model.collectionName = collection.name;
        }
      }
    };

    internal.getSubscribedBlogs = function(){
      return subscriptionRepository.tryGetBlogs()
        .then(function(blogs){
          if(blogs){
            return blogs;
          }
          return [];
        });
    };

    internal.getCreatorBlog = function(){
      return blogRepository.tryGetBlog()
        .then(function(blog){
          if(blog){
            blog.creatorId = $scope.userId;
            return [blog];
          }
          return [];
        });
    };

    internal.load = function(){
      model.errorMessage = undefined;
      model.channelName = undefined;
      model.collectionName = undefined;

      var getBlogsPromise;
      if($scope.userId === subscriptionRepository.getUserId()) {
        getBlogsPromise = internal.getCreatorBlog();
      }
      else {
        getBlogsPromise = internal.getSubscribedBlogs();
      }

      return getBlogsPromise
        .then(function(blogs){
          internal.loadFromBlogs($scope.userId, $scope.channelId, $scope.collectionId, blogs);
          return $q.when();
        })
        .catch(function(error){
          return errorFacade.handleError(error, function(message) {
            model.errorMessage = message;
          });
        });
    };

    this.initialize = function(){
      $scope.$on(aggregateUserStateConstants.updatedEvent, internal.load);
    };
  });
