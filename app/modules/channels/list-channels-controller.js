angular.module('webApp').controller('listChannelsCtrl', function($scope, blogRepositoryFactory, errorFacade) {
  'use strict';

  var blogRepository = blogRepositoryFactory.forCurrentUser();
  $scope.model = {};

  blogRepository.getChannelsSorted()
    .then(function(channels) {
      $scope.model.channels = _.map(channels, function (channel) {
        return {
          id: channel.channelId,
          name: channel.name,
          price: channel.price,
          isVisibleToNonSubscribers: channel.isVisibleToNonSubscribers
        };
      });
    })
    .catch(function(error) {
      return errorFacade.handleError(error, function(message) {
        $scope.model.errorMessage = message;
      });
    });
});
