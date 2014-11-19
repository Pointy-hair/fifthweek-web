angular.module('webApp').controller(
  'RefreshCtrl', ['$scope', '$location', 'authService',
    function($scope, $location, authService) {
      'use strict';

      $scope.authentication = authService.authentication;
      $scope.tokenRefreshed = false;
      $scope.tokenResponse = null;

      $scope.refreshToken = function() {

        authService.refreshToken().then(
          function(response) {
            $scope.tokenRefreshed = true;
            $scope.tokenResponse = response;
          },
          function() {
            $location.path('/signin');
          });
      };

    }
  ]);