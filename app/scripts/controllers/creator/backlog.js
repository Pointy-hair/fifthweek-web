angular.module('webApp').controller('backlogCtrl',
  function($scope) {
    'use strict';

    $scope.posts = [
      {
        //     postId: 'a',
        //     channelId: 'Base64Guid',
        //     collectionId: 'Base64Guid', /* optional */
        //     comment: '', /* optional */
        //     fileId: 'Base64Guid', /* optional */
        //     imageId: 'Base64Guid', /* optional */
        //     scheduledByQueue: false,
        //     liveDate: '2015-12-25T14:45:05Z'
        liveIn:'1 day',
        dayOfWeek:'Wed',
        date:'21st Jan',
        bodyText:'Hang in there folks, nearly ready!',
        queued:false
      },
      {
        liveIn:'3 days',
        dayOfWeek:'Fri',
        date:'23rd Jan',
        bodyText:'Looking good :-)',
        queued:true
      },
      {
        liveIn:'5 days',
        dayOfWeek:'Sun',
        date:'25th Jan',
        bodyText:'Almost there',
        queued:false
      }
    ];

  }
);
