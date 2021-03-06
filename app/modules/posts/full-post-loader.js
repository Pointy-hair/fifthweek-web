angular.module('webApp')
  .factory('fullPostLoader',
  function($q, postStub, postUtilities) {
    'use strict';

    var service = {};

    service.loadPost = function(postId, accountSettingsRepository, blogRepository, subscriptionRepository, requestFreePost){
      var post;
      return postStub.getPost(postId, !!requestFreePost)
        .then(function(result) {
          post = result.data.post;
          post.files = result.data.files;
          return postUtilities.processPostForRendering(post, accountSettingsRepository, blogRepository, subscriptionRepository);
        })
        .then(function(){
          return post;
        });
    };

    return service;
  });
