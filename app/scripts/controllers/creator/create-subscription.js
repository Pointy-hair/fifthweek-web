angular.module('webApp').controller('createSubscriptionCtrl',
  function($scope, $state, utilities, logService, analytics, calculatedStates, subscriptionService) {
    'use strict';

    if(subscriptionService.hasSubscription === true){
      $state.go(calculatedStates.getDefaultState());
    }

    $scope.isSubmitting = false;
    $scope.submissionSucceeded = false;
    $scope.message = '';

    $scope.newSubscriptionData = {
       subscriptionName: '',
       tagline: '',
       basePrice: 1.00
    };

    var buildDTO = function() {
      var newSubscriptionData = _.clone($scope.newSubscriptionData);
      newSubscriptionData.basePrice = Math.round(newSubscriptionData.basePrice * 100);
      return newSubscriptionData;
    };

    $scope.continue = function() {
      $scope.isSubmitting = true;

      return subscriptionService.createFirstSubscription(buildDTO()).then(function() {
        $scope.submissionSucceeded = true;
        analytics.eventTrack('Subscription created', 'Registration');
        $state.go(calculatedStates.getDefaultState());
      }).catch(function(error) {
        $scope.message = utilities.getFriendlyErrorMessage(error);
        $scope.isSubmitting = false;
        return logService.error(error);
      });
    }
  }
);