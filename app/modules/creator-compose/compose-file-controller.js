angular.module('webApp').controller('composeFileCtrl',
  function($q, $scope, postsStub, composeUploadDelegate) {
    'use strict';

    $scope.uploadFormFile = 'file';

    var onUploadComplete = function(data) {
      $scope.fileName = data.file.name;
    };

    composeUploadDelegate.initialize($scope, onUploadComplete, postsStub.postFile);
  }
);