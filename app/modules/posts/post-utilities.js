angular.module('webApp').factory('postUtilities',
  function($q, $state, states, accessSignatures) {
    'use strict';

    var service = {};

    var humanFileSize = function(size) {
      var i = Math.floor( Math.log(size) / Math.log(1024) );
      return ( size / Math.pow(1024, i) ).toFixed(2) * 1 + ' ' + ['bytes', 'KB', 'MB', 'GB', 'TB'][i];
    };

    var getImageUri = function(image, thumbnail, accessMap){
      var blob = image.fileId;
      if (thumbnail) {
        blob = blob + '/' + thumbnail;
      }

      var accessInformation = accessMap[image.containerName];
      return accessInformation.uri + '/' + blob + accessInformation.signature;
    };

    var updatePostUris = function(post, accessMap){
      if(post.imageAccessInformation){
        post.imageAccessInformation.resolvedUri = post.imageAccessInformation.uri + post.imageAccessInformation.signature;
      }
      else if(post.image){
        post.image.resolvedUri = getImageUri(post.image, 'feed', accessMap);
      }

      if(post.creator.profileImage){
        post.creator.profileImage.resolvedUri = getImageUri(post.creator.profileImage, 'footer', accessMap);
      }
    };

    var processPost = function(post, previousPost, accessMap){
      post.moment = moment(post.liveDate);
      post.liveIn = post.moment.fromNow();

      delete post.renderSizeRatio;
      delete post.renderSizeMaximumWidth;
      if(post.imageSource){
        post.imageSource.readableSize = humanFileSize(post.imageSource.size);

        if(post.imageSource.renderSize){
          post.renderSizeRatio = ((post.imageSource.renderSize.height / post.imageSource.renderSize.width)*100) + '%';
          var postMaximumWidth = 945;
          var postMaximumHeight = 720;
          var calculatedHeight = (postMaximumWidth / post.imageSource.renderSize.width) * post.imageSource.renderSize.height;

          if(calculatedHeight > postMaximumHeight){
            post.renderSizeMaximumWidth = postMaximumWidth * (postMaximumHeight / calculatedHeight);
          }
        }
      }

      if(post.fileSource){
        post.fileSource.readableSize = humanFileSize(post.fileSource.size);
      }

      // Only backlog posts contain a queueId field.
      post.isScheduled = _.has(post, 'queueId');
      if(post.isScheduled && post.queueId){
        post.reorder = function(){
          $state.go(states.creator.posts.scheduled.queues.reorder.name, {id: post.queueId});
        };
      }

      updatePostUris(post, accessMap);
    };

    var processPosts = function(posts, accessMap){
      var previousPost;
      _.forEach(posts, function(post){
        processPost(post, previousPost, accessMap);
        previousPost = post;
      });
    };

    service.internal = {};

    service.populateCurrentCreatorInformation = function(posts, accountSettingsRepository, blogRepository) {
      if(!posts || posts.length === 0){
        return $q.when();
      }

      var blog;
      var accountSettings;
      return blogRepository.getBlogMap()
        .then(function (result) {
          blog = result;
          return accountSettingsRepository.getAccountSettings();
        })
        .then(function(result){
          accountSettings = result;

          _.forEach(posts, function (post) {
            post.isOwner = true;

            post.channel = blog.channels[post.channelId];

            if (post.queueId) {
              post.queue = blog.queues[post.queueId];
            }

            post.blog = {
              name: blog.name
            };

            post.creator = {
              username: accountSettings.username,
              profileImage: accountSettings.profileImage
            };
          });
        });
    };

    service.internal.populateUnknownCreatorInformation = function(posts){
      _.forEach(posts, function (post) {

        if(!post.channel){
          post.channel = {
            channelId: post.channelId,
            name: 'Unknown Channel'
          };
        }

        if (!post.queue && post.queueId) {
          post.queue = {
            queueId: post.queueId,
            name: 'Unknown Queue'
          };
        }

        if(!post.blog){
          post.blog = {
            name: 'Unknown Blog'
          };
        }

        if(!post.creator){
          post.creator = {
            username: 'Unknown Creator',
            profileImage: undefined
          };
        }
      });
    };

    service.populateCreatorInformation = function(posts, subscriptionRepository) {
      if(!posts || posts.length === 0){
        return $q.when();
      }

      var subscriptionMap;
      return subscriptionRepository.getBlogMap()
        .then(function (result) {
          subscriptionMap = result;

          service.internal.populateUnknownCreatorInformation(posts);

          _.forEach(posts, function (post) {
            post.isOwner = false;

            var blog = subscriptionMap[post.blogId];

            if(blog){
              var channel = blog.channels[post.channelId];
              if(channel){
                post.channel = channel;

                if (post.queueId) {
                  var queue = blog.queues[post.queueId];
                  if(queue) {
                    post.queue = queue;
                  }
                }
              }

              post.blog = {
                name: blog.name
              };

              post.creator = {
                username: blog.username,
                profileImage: blog.profileImage
              };
            }
          });
        });
    };

    service.processPostsForRendering = function(posts){
      if(!posts || posts.length === 0){
        return $q.when();
      }

      return accessSignatures.getContainerAccessMap()
        .then(function(accessMap){
          processPosts(posts, accessMap);
        });
    };

    service.processPostForRendering = function(post){
      return accessSignatures.getContainerAccessMap()
        .then(function(accessMap){
          processPost(post, undefined, accessMap);
        });
    };

    service.removePost = function(posts, postId){
      if(!posts || posts.length === 0){
        return $q.when();
      }

      for(var i=0; i < posts.length; ++i) {
        if (posts[i].postId === postId) {
          posts.splice(i, 1);

          return $q.when();
        }
      }
    };

    var backlogComparison = function(firstPost, secondPost){
      return firstPost.moment.isBefore(secondPost.moment);
    };
    var timelineComparison = function(firstPost, secondPost){
      return firstPost.moment.isAfter(secondPost.moment) || firstPost.moment.isSame(secondPost.moment);
    };

    service.replacePostAndReorderIfRequired = function(isBacklog, posts, oldPostMoment, newPost){
      var shouldRemove = false;
      if(isBacklog){
        shouldRemove = !newPost.isScheduled;
      }
      else{
        shouldRemove = newPost.isScheduled;
      }

      if(shouldRemove){
        service.removePost(posts, newPost.postId);
        return;
      }

      if(posts.length === 1 || oldPostMoment.isSame(newPost.moment)){
        var index = _.findIndex(posts, { postId: newPost.postId });
        if(index !== -1){
          posts[index] = newPost;
        }
        return;
      }

      var shouldInsert = timelineComparison;
      if(isBacklog) {
        shouldInsert = backlogComparison;
      }

      service.removePost(posts, newPost.postId);
      for(var i=0; i < posts.length; ++i){
        if(shouldInsert(newPost, posts[i])){
          posts.splice(i, 0, newPost);
          return;
        }
      }

      posts.push(newPost);
    };

    return service;
});
