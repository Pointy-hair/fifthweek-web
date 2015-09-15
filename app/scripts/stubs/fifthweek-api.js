angular.module('webApp').factory('availabilityStub',
  function($http, $q, fifthweekConstants, utilities) {
    'use strict';

    var apiBaseUri = fifthweekConstants.apiBaseUri;
    var service = {};

    // result = {
    //   database: false,
    //   api: false,
    //   payments: false
    // }
    service.get = function() {
      return $http.get(utilities.fixUri(apiBaseUri + 'availability')).catch(function(response) {
        return $q.reject(utilities.getHttpError(response));
      });
    };

    service.head = function() {
      return $http.get(utilities.fixUri(apiBaseUri + 'availability')).catch(function(response) {
        return $q.reject(utilities.getHttpError(response));
      });
    };

    return service;
  });

angular.module('webApp').factory('channelStub',
  function($http, $q, fifthweekConstants, utilities) {
    'use strict';

    var apiBaseUri = fifthweekConstants.apiBaseUri;
    var service = {};

    // newChannelData = {
    //   blogId: 'Base64Guid',
    //   name: '',
    //   price: 0,
    //   isVisibleToNonSubscribers: false
    // }
    // result = 'Base64Guid'
    service.postChannel = function(newChannelData) {
      return $http.post(utilities.fixUri(apiBaseUri + 'channels'), newChannelData).catch(function(response) {
        return $q.reject(utilities.getHttpError(response));
      });
    };

    // channelId = 'Base64Guid'
    // channelData = {
    //   name: '',
    //   price: 0,
    //   isVisibleToNonSubscribers: false
    // }
    service.putChannel = function(channelId, channelData) {
      return $http.put(utilities.fixUri(apiBaseUri + 'channels/' + encodeURIComponent(channelId)), channelData).catch(function(response) {
        return $q.reject(utilities.getHttpError(response));
      });
    };

    // channelId = 'Base64Guid'
    service.deleteChannel = function(channelId) {
      return $http.delete(utilities.fixUri(apiBaseUri + 'channels/' + encodeURIComponent(channelId))).catch(function(response) {
        return $q.reject(utilities.getHttpError(response));
      });
    };

    return service;
  });

angular.module('webApp').factory('queueStub',
  function($http, $q, fifthweekConstants, utilities) {
    'use strict';

    var apiBaseUri = fifthweekConstants.apiBaseUri;
    var service = {};

    // newQueueData = {
    //   blogId: 'Base64Guid',
    //   name: ''
    // }
    // result = {
    //   queueId: 'Base64Guid',
    //   defaultWeeklyReleaseTime: 0
    // }
    service.postQueue = function(newQueueData) {
      return $http.post(utilities.fixUri(apiBaseUri + 'queues'), newQueueData).catch(function(response) {
        return $q.reject(utilities.getHttpError(response));
      });
    };

    // queueId = 'Base64Guid'
    // queueData = {
    //   name: '',
    //   weeklyReleaseSchedule: [
    //     0
    //   ]
    // }
    service.putQueue = function(queueId, queueData) {
      return $http.put(utilities.fixUri(apiBaseUri + 'queues/' + encodeURIComponent(queueId)), queueData).catch(function(response) {
        return $q.reject(utilities.getHttpError(response));
      });
    };

    // queueId = 'Base64Guid'
    service.deleteQueue = function(queueId) {
      return $http.delete(utilities.fixUri(apiBaseUri + 'queues/' + encodeURIComponent(queueId))).catch(function(response) {
        return $q.reject(utilities.getHttpError(response));
      });
    };

    // queueId = 'Base64Guid'
    // result = '2015-12-25T14:45:05Z'
    service.getLiveDateOfNewQueuedPost = function(queueId) {
      return $http.get(utilities.fixUri(apiBaseUri + 'queues/' + encodeURIComponent(queueId) + '/newQueuedPostLiveDate')).catch(function(response) {
        return $q.reject(utilities.getHttpError(response));
      });
    };

    return service;
  });

angular.module('webApp').factory('endToEndTestInboxStub',
  function($http, $q, fifthweekConstants, utilities) {
    'use strict';

    var apiBaseUri = fifthweekConstants.apiBaseUri;
    var service = {};

    // mailboxName = ''
    service.getLatestMessageAndClearMailbox = function(mailboxName) {
      return $http.get(utilities.fixUri(apiBaseUri + 'testMailboxes/' + encodeURIComponent(mailboxName))).catch(function(response) {
        return $q.reject(utilities.getHttpError(response));
      });
    };

    return service;
  });

angular.module('webApp').factory('accountSettingsStub',
  function($http, $q, fifthweekConstants, utilities) {
    'use strict';

    var apiBaseUri = fifthweekConstants.apiBaseUri;
    var service = {};

    // userId = 'Base64Guid'
    // result = {
    //   username: '',
    //   email: '',
    //   profileImage: { /* optional */
    //     fileId: 'Base64Guid',
    //     containerName: ''
    //   },
    //   accountBalance: 0,
    //   paymentStatus: 'paymentstatus',
    //   hasPaymentInformation: false,
    //   creatorPercentage: 0.0,
    //   creatorPercentageWeeksRemaining: 0 /* optional */
    // }
    service.get = function(userId) {
      return $http.get(utilities.fixUri(apiBaseUri + 'accountSettings/' + encodeURIComponent(userId))).catch(function(response) {
        return $q.reject(utilities.getHttpError(response));
      });
    };

    // userId = 'Base64Guid'
    // updatedAccountSettingsData = {
    //   newUsername: '',
    //   newEmail: '',
    //   newPassword: '', /* optional */
    //   newProfileImageId: 'Base64Guid' /* optional */
    // }
    service.put = function(userId, updatedAccountSettingsData) {
      return $http.put(utilities.fixUri(apiBaseUri + 'accountSettings/' + encodeURIComponent(userId)), updatedAccountSettingsData).catch(function(response) {
        return $q.reject(utilities.getHttpError(response));
      });
    };

    // userId = 'Base64Guid'
    // creatorInformation = {
    // }
    service.putCreatorInformation = function(userId, creatorInformation) {
      return $http.put(utilities.fixUri(apiBaseUri + 'accountSettings/' + encodeURIComponent(userId) + '/creatorInformation'), creatorInformation).catch(function(response) {
        return $q.reject(utilities.getHttpError(response));
      });
    };

    return service;
  });

angular.module('webApp').factory('membershipStub',
  function($http, $q, fifthweekConstants, utilities) {
    'use strict';

    var apiBaseUri = fifthweekConstants.apiBaseUri;
    var service = {};

    // registrationData = {
    //   exampleWork: '', /* optional */
    //   email: '',
    //   username: '',
    //   password: '',
    //   registerAsCreator: false
    // }
    service.postRegistration = function(registrationData) {
      return $http.post(utilities.fixUri(apiBaseUri + 'membership/registrations'), registrationData).catch(function(response) {
        return $q.reject(utilities.getHttpError(response));
      });
    };

    // username = ''
    service.getUsernameAvailability = function(username) {
      return $http.get(utilities.fixUri(apiBaseUri + 'membership/availableUsernames/' + encodeURIComponent(username))).catch(function(response) {
        return $q.reject(utilities.getHttpError(response));
      });
    };

    // passwordResetRequestData = {
    //   email: '', /* optional */
    //   username: '' /* optional */
    // }
    service.postPasswordResetRequest = function(passwordResetRequestData) {
      return $http.post(utilities.fixUri(apiBaseUri + 'membership/passwordResetRequests'), passwordResetRequestData).catch(function(response) {
        return $q.reject(utilities.getHttpError(response));
      });
    };

    // passwordResetConfirmationData = {
    //   userId: 'Base64Guid',
    //   newPassword: '',
    //   token: ''
    // }
    service.postPasswordResetConfirmation = function(passwordResetConfirmationData) {
      return $http.post(utilities.fixUri(apiBaseUri + 'membership/passwordResetConfirmations'), passwordResetConfirmationData).catch(function(response) {
        return $q.reject(utilities.getHttpError(response));
      });
    };

    // userId = 'Base64Guid'
    // token = ''
    service.getPasswordResetTokenValidity = function(userId, token) {
      return $http.get(utilities.fixUri(apiBaseUri + 'membership/passwordResetTokens/' + encodeURIComponent(userId) + '?' + (token === undefined ? '' : 'token=' + encodeURIComponent(token) + '&'))).catch(function(response) {
        return $q.reject(utilities.getHttpError(response));
      });
    };

    // registerInterestData = {
    //   name: '',
    //   email: ''
    // }
    service.postRegisteredInterest = function(registerInterestData) {
      return $http.post(utilities.fixUri(apiBaseUri + 'membership/registeredInterest'), registerInterestData).catch(function(response) {
        return $q.reject(utilities.getHttpError(response));
      });
    };

    // identifiedUserData = {
    //   isUpdate: false,
    //   name: '',
    //   username: '',
    //   email: ''
    // }
    service.postIdentifiedUser = function(identifiedUserData) {
      return $http.post(utilities.fixUri(apiBaseUri + 'membership/identifiedUsers'), identifiedUserData).catch(function(response) {
        return $q.reject(utilities.getHttpError(response));
      });
    };

    return service;
  });

angular.module('webApp').factory('logStub',
  function($http, $q, fifthweekConstants, utilities) {
    'use strict';

    var apiBaseUri = fifthweekConstants.apiBaseUri;
    var service = {};

    // logMessage = {
    //   level: '',
    //   payload: { arbitrary: 'json' }
    // }
    service.post = function(logMessage) {
      return $http.post(utilities.fixUri(apiBaseUri + 'log'), logMessage).catch(function(response) {
        return $q.reject(utilities.getHttpError(response));
      });
    };

    return service;
  });

angular.module('webApp').factory('postStub',
  function($http, $q, fifthweekConstants, utilities) {
    'use strict';

    var apiBaseUri = fifthweekConstants.apiBaseUri;
    var service = {};

    // creatorId = 'Base64Guid'
    // result = [
    //   {
    //     postId: 'Base64Guid',
    //     channelId: 'Base64Guid',
    //     queueId: 'Base64Guid', /* optional */
    //     comment: '', /* optional */
    //     file: { /* optional */
    //       fileId: 'Base64Guid',
    //       containerName: ''
    //     },
    //     fileSource: { /* optional */
    //       fileName: '',
    //       fileExtension: '',
    //       contentType: '',
    //       size: 0,
    //       renderSize: { /* optional */
    //         width: 0,
    //         height: 0
    //       }
    //     },
    //     image: { /* optional */
    //       fileId: 'Base64Guid',
    //       containerName: ''
    //     },
    //     imageSource: { /* optional */
    //       fileName: '',
    //       fileExtension: '',
    //       contentType: '',
    //       size: 0,
    //       renderSize: { /* optional */
    //         width: 0,
    //         height: 0
    //       }
    //     },
    //     liveDate: '2015-12-25T14:45:05Z'
    //   }
    // ]
    service.getCreatorBacklog = function(creatorId) {
      return $http.get(utilities.fixUri(apiBaseUri + 'posts/creatorBacklog/' + encodeURIComponent(creatorId))).catch(function(response) {
        return $q.reject(utilities.getHttpError(response));
      });
    };

    // filterData = {
    //   creatorId: 'Base64Guid', /* optional */
    //   channelId: 'Base64Guid', /* optional */
    //   origin: '2015-12-25T14:45:05Z', /* optional */
    //   searchForwards: false,
    //   startIndex: 0,
    //   count: 0
    // }
    // result = {
    //   posts: [
    //     {
    //       creatorId: 'Base64Guid',
    //       postId: 'Base64Guid',
    //       blogId: 'Base64Guid',
    //       channelId: 'Base64Guid',
    //       comment: '', /* optional */
    //       file: { /* optional */
    //         fileId: 'Base64Guid',
    //         containerName: ''
    //       },
    //       fileSource: { /* optional */
    //         fileName: '',
    //         fileExtension: '',
    //         contentType: '',
    //         size: 0,
    //         renderSize: { /* optional */
    //           width: 0,
    //           height: 0
    //         }
    //       },
    //       image: { /* optional */
    //         fileId: 'Base64Guid',
    //         containerName: ''
    //       },
    //       imageSource: { /* optional */
    //         fileName: '',
    //         fileExtension: '',
    //         contentType: '',
    //         size: 0,
    //         renderSize: { /* optional */
    //           width: 0,
    //           height: 0
    //         }
    //       },
    //       liveDate: '2015-12-25T14:45:05Z',
    //       likesCount: 0,
    //       commentsCount: 0,
    //       hasLiked: false
    //     }
    //   ],
    //   accountBalance: 0
    // }
    service.getNewsfeed = function(filterData) {
      return $http.get(utilities.fixUri(apiBaseUri + 'posts/newsfeed?' + (filterData.creatorId === undefined ? '' : 'creatorId=' + encodeURIComponent(filterData.creatorId) + '&') + (filterData.channelId === undefined ? '' : 'channelId=' + encodeURIComponent(filterData.channelId) + '&') + (filterData.origin === undefined ? '' : 'origin=' + encodeURIComponent(filterData.origin) + '&') + (filterData.searchForwards === undefined ? '' : 'searchForwards=' + encodeURIComponent(filterData.searchForwards) + '&') + (filterData.startIndex === undefined ? '' : 'startIndex=' + encodeURIComponent(filterData.startIndex) + '&') + (filterData.count === undefined ? '' : 'count=' + encodeURIComponent(filterData.count) + '&'))).catch(function(response) {
        return $q.reject(utilities.getHttpError(response));
      });
    };

    // postData = {
    //   channelId: 'Base64Guid',
    //   fileId: 'Base64Guid', /* optional */
    //   imageId: 'Base64Guid', /* optional */
    //   comment: '', /* optional */
    //   scheduledPostTime: '2015-12-25T14:45:05Z', /* optional */
    //   queueId: 'Base64Guid' /* optional */
    // }
    service.postPost = function(postData) {
      return $http.post(utilities.fixUri(apiBaseUri + 'posts'), postData).catch(function(response) {
        return $q.reject(utilities.getHttpError(response));
      });
    };

    // postId = 'Base64Guid'
    // postData = {
    //   fileId: 'Base64Guid', /* optional */
    //   imageId: 'Base64Guid', /* optional */
    //   comment: '' /* optional */
    // }
    service.putPost = function(postId, postData) {
      return $http.put(utilities.fixUri(apiBaseUri + 'posts/' + encodeURIComponent(postId)), postData).catch(function(response) {
        return $q.reject(utilities.getHttpError(response));
      });
    };

    // postId = 'Base64Guid'
    service.deletePost = function(postId) {
      return $http.delete(utilities.fixUri(apiBaseUri + 'posts/' + encodeURIComponent(postId))).catch(function(response) {
        return $q.reject(utilities.getHttpError(response));
      });
    };

    // queueId = 'Base64Guid'
    // newQueueOrder = [
    //   'Base64Guid'
    // ]
    service.postNewQueueOrder = function(queueId, newQueueOrder) {
      return $http.post(utilities.fixUri(apiBaseUri + 'posts/queues/' + encodeURIComponent(queueId)), newQueueOrder).catch(function(response) {
        return $q.reject(utilities.getHttpError(response));
      });
    };

    // postId = 'Base64Guid'
    // queueId = 'Base64Guid'
    service.putQueue = function(postId, queueId) {
      return $http.put(utilities.fixUri(apiBaseUri + 'posts/' + encodeURIComponent(postId) + '/queue'), JSON.stringify(queueId)).catch(function(response) {
        return $q.reject(utilities.getHttpError(response));
      });
    };

    // postId = 'Base64Guid'
    service.postToLive = function(postId) {
      return $http.post(utilities.fixUri(apiBaseUri + 'posts/live'), JSON.stringify(postId)).catch(function(response) {
        return $q.reject(utilities.getHttpError(response));
      });
    };

    // postId = 'Base64Guid'
    // newLiveDate = '2015-12-25T14:45:05Z'
    service.putLiveDate = function(postId, newLiveDate) {
      return $http.put(utilities.fixUri(apiBaseUri + 'posts/' + encodeURIComponent(postId) + '/liveDate'), newLiveDate).catch(function(response) {
        return $q.reject(utilities.getHttpError(response));
      });
    };

    // postId = 'Base64Guid'
    // comment = {
    //   content: ''
    // }
    service.postComment = function(postId, comment) {
      return $http.post(utilities.fixUri(apiBaseUri + 'posts/' + encodeURIComponent(postId) + '/comments'), comment).catch(function(response) {
        return $q.reject(utilities.getHttpError(response));
      });
    };

    // postId = 'Base64Guid'
    // result = {
    //   comments: [
    //     {
    //       commentId: 'Base64Guid',
    //       postId: 'Base64Guid',
    //       userId: 'Base64Guid',
    //       username: '',
    //       content: '',
    //       creationDate: '2015-12-25T14:45:05Z'
    //     }
    //   ]
    // }
    service.getComments = function(postId) {
      return $http.get(utilities.fixUri(apiBaseUri + 'posts/' + encodeURIComponent(postId) + '/comments')).catch(function(response) {
        return $q.reject(utilities.getHttpError(response));
      });
    };

    // postId = 'Base64Guid'
    service.postLike = function(postId) {
      return $http.post(utilities.fixUri(apiBaseUri + 'posts/' + encodeURIComponent(postId) + '/likes')).catch(function(response) {
        return $q.reject(utilities.getHttpError(response));
      });
    };

    // postId = 'Base64Guid'
    service.deleteLike = function(postId) {
      return $http.delete(utilities.fixUri(apiBaseUri + 'posts/' + encodeURIComponent(postId) + '/likes')).catch(function(response) {
        return $q.reject(utilities.getHttpError(response));
      });
    };

    return service;
  });

angular.module('webApp').factory('blogAccessStub',
  function($http, $q, fifthweekConstants, utilities) {
    'use strict';

    var apiBaseUri = fifthweekConstants.apiBaseUri;
    var service = {};

    // blogId = 'Base64Guid'
    // data = {
    //   emails: [
    //     ''
    //   ]
    // }
    // result = {
    //   invalidEmailAddresses: [
    //     ''
    //   ]
    // }
    service.putFreeAccessList = function(blogId, data) {
      return $http.put(utilities.fixUri(apiBaseUri + 'blogAccess/freeAccessList/' + encodeURIComponent(blogId)), data).catch(function(response) {
        return $q.reject(utilities.getHttpError(response));
      });
    };

    // blogId = 'Base64Guid'
    // result = {
    //   freeAccessUsers: [
    //     {
    //       email: '',
    //       userId: 'Base64Guid', /* optional */
    //       username: '', /* optional */
    //       channelIds: [
    //         'Base64Guid'
    //       ]
    //     }
    //   ]
    // }
    service.getFreeAccessList = function(blogId) {
      return $http.get(utilities.fixUri(apiBaseUri + 'blogAccess/freeAccessList/' + encodeURIComponent(blogId))).catch(function(response) {
        return $q.reject(utilities.getHttpError(response));
      });
    };

    return service;
  });

angular.module('webApp').factory('subscriptionStub',
  function($http, $q, fifthweekConstants, utilities) {
    'use strict';

    var apiBaseUri = fifthweekConstants.apiBaseUri;
    var service = {};

    // blogId = 'Base64Guid'
    // subscriptionData = {
    //   subscriptions: [
    //     {
    //       channelId: 'Base64Guid',
    //       acceptedPrice: 0
    //     }
    //   ]
    // }
    service.putBlogSubscriptions = function(blogId, subscriptionData) {
      return $http.put(utilities.fixUri(apiBaseUri + 'subscriptions/blogs/' + encodeURIComponent(blogId)), subscriptionData).catch(function(response) {
        return $q.reject(utilities.getHttpError(response));
      });
    };

    // channelId = 'Base64Guid'
    service.deleteChannelSubscription = function(channelId) {
      return $http.delete(utilities.fixUri(apiBaseUri + 'subscriptions/channels/' + encodeURIComponent(channelId))).catch(function(response) {
        return $q.reject(utilities.getHttpError(response));
      });
    };

    // channelId = 'Base64Guid'
    // subscriptionData = {
    //   acceptedPrice: 0
    // }
    service.putChannelSubscription = function(channelId, subscriptionData) {
      return $http.put(utilities.fixUri(apiBaseUri + 'subscriptions/channels/' + encodeURIComponent(channelId)), subscriptionData).catch(function(response) {
        return $q.reject(utilities.getHttpError(response));
      });
    };

    return service;
  });

angular.module('webApp').factory('blogStub',
  function($http, $q, fifthweekConstants, utilities) {
    'use strict';

    var apiBaseUri = fifthweekConstants.apiBaseUri;
    var service = {};

    // blogData = {
    //   name: '',
    //   basePrice: 0
    // }
    // result = {
    //   blogId: 'Base64Guid',
    //   channelId: 'Base64Guid'
    // }
    service.postBlog = function(blogData) {
      return $http.post(utilities.fixUri(apiBaseUri + 'blogs'), blogData).catch(function(response) {
        return $q.reject(utilities.getHttpError(response));
      });
    };

    // blogId = 'Base64Guid'
    // blogData = {
    //   name: '',
    //   introduction: '',
    //   headerImageFileId: 'Base64Guid', /* optional */
    //   video: '', /* optional */
    //   description: '' /* optional */
    // }
    service.putBlog = function(blogId, blogData) {
      return $http.put(utilities.fixUri(apiBaseUri + 'blogs/' + encodeURIComponent(blogId)), blogData).catch(function(response) {
        return $q.reject(utilities.getHttpError(response));
      });
    };

    // username = ''
    // result = {
    //   userId: 'Base64Guid',
    //   profileImage: { /* optional */
    //     fileId: 'Base64Guid',
    //     containerName: ''
    //   },
    //   blog: {
    //     blogId: 'Base64Guid',
    //     name: '',
    //     introduction: '',
    //     creationDate: '2015-12-25T14:45:05Z',
    //     headerImage: { /* optional */
    //       fileId: 'Base64Guid',
    //       containerName: ''
    //     },
    //     video: '', /* optional */
    //     description: '', /* optional */
    //     channels: [
    //       {
    //         channelId: 'Base64Guid',
    //         name: '',
    //         price: 0,
    //         isVisibleToNonSubscribers: false
    //       }
    //     ],
    //     queues: [
    //       {
    //         queueId: 'Base64Guid',
    //         name: '',
    //         weeklyReleaseSchedule: [
    //           0
    //         ]
    //       }
    //     ]
    //   }
    // }
    service.getLandingPage = function(username) {
      return $http.get(utilities.fixUri(apiBaseUri + 'blogs/landingPages/' + encodeURIComponent(username))).catch(function(response) {
        return $q.reject(utilities.getHttpError(response));
      });
    };

    // blogId = 'Base64Guid'
    // result = {
    //   unreleasedRevenue: 0,
    //   releasedRevenue: 0,
    //   releasableRevenue: 0,
    //   subscribers: [
    //     {
    //       username: '',
    //       userId: 'Base64Guid',
    //       profileImage: { /* optional */
    //         fileId: 'Base64Guid',
    //         containerName: ''
    //       },
    //       freeAccessEmail: '', /* optional */
    //       paymentStatus: 'paymentstatus',
    //       hasPaymentInformation: false,
    //       channels: [
    //         {
    //           channelId: 'Base64Guid',
    //           subscriptionStartDate: '2015-12-25T14:45:05Z',
    //           acceptedPrice: 0
    //         }
    //       ]
    //     }
    //   ]
    // }
    service.getSubscriberInformation = function(blogId) {
      return $http.get(utilities.fixUri(apiBaseUri + 'blogs/subscribers/' + encodeURIComponent(blogId))).catch(function(response) {
        return $q.reject(utilities.getHttpError(response));
      });
    };

    // result = {
    //   creators: [
    //     {
    //       userId: 'Base64Guid',
    //       unreleasedRevenue: 0,
    //       releasedRevenue: 0,
    //       releasableRevenue: 0,
    //       username: '', /* optional */
    //       email: '', /* optional */
    //       emailConfirmed: false
    //     }
    //   ]
    // }
    service.getCreatorRevenues = function() {
      return $http.get(utilities.fixUri(apiBaseUri + 'blogs/creatorRevenues')).catch(function(response) {
        return $q.reject(utilities.getHttpError(response));
      });
    };

    return service;
  });

angular.module('webApp').factory('fileUploadStub',
  function($http, $q, fifthweekConstants, utilities) {
    'use strict';

    var apiBaseUri = fifthweekConstants.apiBaseUri;
    var service = {};

    // data = {
    //   channelId: 'Base64Guid', /* optional */
    //   filePath: '',
    //   purpose: ''
    // }
    // result = {
    //   fileId: 'Base64Guid',
    //   accessInformation: {
    //     containerName: '',
    //     blobName: '',
    //     uri: '',
    //     signature: '',
    //     expiry: '2015-12-25T14:45:05Z'
    //   }
    // }
    service.postUploadRequest = function(data) {
      return $http.post(utilities.fixUri(apiBaseUri + 'files/uploadRequests'), data).catch(function(response) {
        return $q.reject(utilities.getHttpError(response));
      });
    };

    // data = {
    //   channelId: 'Base64Guid', /* optional */
    //   fileId: 'Base64Guid'
    // }
    service.postUploadCompleteNotification = function(data) {
      return $http.post(utilities.fixUri(apiBaseUri + 'files/uploadCompleteNotifications'), data).catch(function(response) {
        return $q.reject(utilities.getHttpError(response));
      });
    };

    return service;
  });

angular.module('webApp').factory('userStateStub',
  function($http, $q, fifthweekConstants, utilities) {
    'use strict';

    var apiBaseUri = fifthweekConstants.apiBaseUri;
    var service = {};

    // userId = 'Base64Guid'
    // impersonate = false /* optional */
    // result = {
    //   accessSignatures: {
    //     timeToLiveSeconds: 0,
    //     publicSignature: {
    //       containerName: '',
    //       uri: '',
    //       signature: '',
    //       expiry: '2015-12-25T14:45:05Z'
    //     },
    //     privateSignatures: [
    //       {
    //         channelId: 'Base64Guid',
    //         information: {
    //           containerName: '',
    //           uri: '',
    //           signature: '',
    //           expiry: '2015-12-25T14:45:05Z'
    //         }
    //       }
    //     ]
    //   },
    //   accountSettings: { /* optional */
    //     username: '',
    //     email: '',
    //     profileImage: { /* optional */
    //       fileId: 'Base64Guid',
    //       containerName: ''
    //     },
    //     accountBalance: 0,
    //     paymentStatus: 'paymentstatus',
    //     hasPaymentInformation: false,
    //     creatorPercentage: 0.0,
    //     creatorPercentageWeeksRemaining: 0 /* optional */
    //   },
    //   blog: { /* optional */
    //     blogId: 'Base64Guid',
    //     name: '',
    //     introduction: '',
    //     creationDate: '2015-12-25T14:45:05Z',
    //     headerImage: { /* optional */
    //       fileId: 'Base64Guid',
    //       containerName: ''
    //     },
    //     video: '', /* optional */
    //     description: '', /* optional */
    //     channels: [
    //       {
    //         channelId: 'Base64Guid',
    //         name: '',
    //         price: 0,
    //         isVisibleToNonSubscribers: false
    //       }
    //     ],
    //     queues: [
    //       {
    //         queueId: 'Base64Guid',
    //         name: '',
    //         weeklyReleaseSchedule: [
    //           0
    //         ]
    //       }
    //     ]
    //   },
    //   subscriptions: { /* optional */
    //     blogs: [
    //       {
    //         blogId: 'Base64Guid',
    //         name: '',
    //         creatorId: 'Base64Guid',
    //         username: '',
    //         profileImage: { /* optional */
    //           fileId: 'Base64Guid',
    //           containerName: ''
    //         },
    //         freeAccess: false,
    //         channels: [
    //           {
    //             channelId: 'Base64Guid',
    //             name: '',
    //             acceptedPrice: 0,
    //             price: 0,
    //             isDefault: false,
    //             priceLastSetDate: '2015-12-25T14:45:05Z',
    //             subscriptionStartDate: '2015-12-25T14:45:05Z',
    //             isVisibleToNonSubscribers: false
    //           }
    //         ]
    //       }
    //     ]
    //   }
    // }
    service.getUserState = function(userId, impersonate) {
      return $http.get(utilities.fixUri(apiBaseUri + 'userState/' + encodeURIComponent(userId) + '?' + (impersonate === undefined ? '' : 'impersonate=' + encodeURIComponent(impersonate) + '&'))).catch(function(response) {
        return $q.reject(utilities.getHttpError(response));
      });
    };

    // result = {
    //   accessSignatures: {
    //     timeToLiveSeconds: 0,
    //     publicSignature: {
    //       containerName: '',
    //       uri: '',
    //       signature: '',
    //       expiry: '2015-12-25T14:45:05Z'
    //     },
    //     privateSignatures: [
    //       {
    //         channelId: 'Base64Guid',
    //         information: {
    //           containerName: '',
    //           uri: '',
    //           signature: '',
    //           expiry: '2015-12-25T14:45:05Z'
    //         }
    //       }
    //     ]
    //   },
    //   accountSettings: { /* optional */
    //     username: '',
    //     email: '',
    //     profileImage: { /* optional */
    //       fileId: 'Base64Guid',
    //       containerName: ''
    //     },
    //     accountBalance: 0,
    //     paymentStatus: 'paymentstatus',
    //     hasPaymentInformation: false,
    //     creatorPercentage: 0.0,
    //     creatorPercentageWeeksRemaining: 0 /* optional */
    //   },
    //   blog: { /* optional */
    //     blogId: 'Base64Guid',
    //     name: '',
    //     introduction: '',
    //     creationDate: '2015-12-25T14:45:05Z',
    //     headerImage: { /* optional */
    //       fileId: 'Base64Guid',
    //       containerName: ''
    //     },
    //     video: '', /* optional */
    //     description: '', /* optional */
    //     channels: [
    //       {
    //         channelId: 'Base64Guid',
    //         name: '',
    //         price: 0,
    //         isVisibleToNonSubscribers: false
    //       }
    //     ],
    //     queues: [
    //       {
    //         queueId: 'Base64Guid',
    //         name: '',
    //         weeklyReleaseSchedule: [
    //           0
    //         ]
    //       }
    //     ]
    //   },
    //   subscriptions: { /* optional */
    //     blogs: [
    //       {
    //         blogId: 'Base64Guid',
    //         name: '',
    //         creatorId: 'Base64Guid',
    //         username: '',
    //         profileImage: { /* optional */
    //           fileId: 'Base64Guid',
    //           containerName: ''
    //         },
    //         freeAccess: false,
    //         channels: [
    //           {
    //             channelId: 'Base64Guid',
    //             name: '',
    //             acceptedPrice: 0,
    //             price: 0,
    //             isDefault: false,
    //             priceLastSetDate: '2015-12-25T14:45:05Z',
    //             subscriptionStartDate: '2015-12-25T14:45:05Z',
    //             isVisibleToNonSubscribers: false
    //           }
    //         ]
    //       }
    //     ]
    //   }
    // }
    service.getVisitorState = function() {
      return $http.get(utilities.fixUri(apiBaseUri + 'userState')).catch(function(response) {
        return $q.reject(utilities.getHttpError(response));
      });
    };

    return service;
  });

angular.module('webApp').factory('paymentsStub',
  function($http, $q, fifthweekConstants, utilities) {
    'use strict';

    var apiBaseUri = fifthweekConstants.apiBaseUri;
    var service = {};

    // userId = 'Base64Guid'
    // data = {
    //   stripeToken: '', /* optional */
    //   countryCode: '', /* optional */
    //   creditCardPrefix: '', /* optional */
    //   ipAddress: '' /* optional */
    // }
    service.putPaymentOrigin = function(userId, data) {
      return $http.put(utilities.fixUri(apiBaseUri + 'payment/origins/' + encodeURIComponent(userId)), data).catch(function(response) {
        return $q.reject(utilities.getHttpError(response));
      });
    };

    // userId = 'Base64Guid'
    // data = {
    //   amount: 0,
    //   expectedTotalAmount: 0
    // }
    service.postCreditRequest = function(userId, data) {
      return $http.post(utilities.fixUri(apiBaseUri + 'payment/creditRequests/' + encodeURIComponent(userId)), data).catch(function(response) {
        return $q.reject(utilities.getHttpError(response));
      });
    };

    // userId = 'Base64Guid'
    // countryCode = '' /* optional */
    // creditCardPrefix = '' /* optional */
    // ipAddress = '' /* optional */
    // result = {
    //   subscriptionsAmount: 0,
    //   calculation: {
    //     amount: 0,
    //     totalAmount: 0,
    //     taxAmount: 0,
    //     taxRate: 0.0, /* optional */
    //     taxName: '', /* optional */
    //     taxEntityName: '', /* optional */
    //     countryName: '', /* optional */
    //     possibleCountries: [ /* optional */
    //       {
    //         name: '',
    //         countryCode: ''
    //       }
    //     ]
    //   }
    // }
    service.getCreditRequestSummary = function(userId, countryCode, creditCardPrefix, ipAddress) {
      return $http.get(utilities.fixUri(apiBaseUri + 'payment/creditRequestSummaries/' + encodeURIComponent(userId) + '?' + (countryCode === undefined ? '' : 'countryCode=' + encodeURIComponent(countryCode) + '&') + (creditCardPrefix === undefined ? '' : 'creditCardPrefix=' + encodeURIComponent(creditCardPrefix) + '&') + (ipAddress === undefined ? '' : 'ipAddress=' + encodeURIComponent(ipAddress) + '&'))).catch(function(response) {
        return $q.reject(utilities.getHttpError(response));
      });
    };

    // userId = 'Base64Guid'
    service.deletePaymentInformation = function(userId) {
      return $http.delete(utilities.fixUri(apiBaseUri + 'payment/paymentInformation/' + encodeURIComponent(userId))).catch(function(response) {
        return $q.reject(utilities.getHttpError(response));
      });
    };

    // transactionReference = ''
    // data = {
    //   comment: ''
    // }
    service.postTransactionRefund = function(transactionReference, data) {
      return $http.post(utilities.fixUri(apiBaseUri + 'payment/transactionRefunds/' + encodeURIComponent(transactionReference)), data).catch(function(response) {
        return $q.reject(utilities.getHttpError(response));
      });
    };

    // transactionReference = ''
    // data = {
    //   refundCreditAmount: 0,
    //   reason: 'refundcreditreason',
    //   comment: ''
    // }
    service.postCreditRefund = function(transactionReference, data) {
      return $http.post(utilities.fixUri(apiBaseUri + 'payment/creditRefunds/' + encodeURIComponent(transactionReference)), data).catch(function(response) {
        return $q.reject(utilities.getHttpError(response));
      });
    };

    // userId = 'Base64Guid' /* optional */
    // startTimeInclusive = '2015-12-25T14:45:05Z' /* optional */
    // endTimeExclusive = '2015-12-25T14:45:05Z' /* optional */
    // result = {
    //   records: [
    //     {
    //       recordId: 'Base64Guid',
    //       accountOwnerId: 'Base64Guid',
    //       accountOwnerUsername: '', /* optional */
    //       counterpartyId: 'Base64Guid', /* optional */
    //       counterpartyUsername: '', /* optional */
    //       timestamp: '2015-12-25T14:45:05Z',
    //       amount: 0.0,
    //       accountType: 'ledgeraccounttype',
    //       transactionType: 'ledgertransactiontype',
    //       transactionReference: 'Base64Guid',
    //       inputDataReference: 'Base64Guid', /* optional */
    //       comment: '', /* optional */
    //       stripeChargeId: 'Base64Guid', /* optional */
    //       taxamoTransactionKey: '' /* optional */
    //     }
    //   ]
    // }
    service.getTransactions = function(userId, startTimeInclusive, endTimeExclusive) {
      return $http.get(utilities.fixUri(apiBaseUri + 'payment/transactions?' + (userId === undefined ? '' : 'userId=' + encodeURIComponent(userId) + '&') + (startTimeInclusive === undefined ? '' : 'startTimeInclusive=' + encodeURIComponent(startTimeInclusive) + '&') + (endTimeExclusive === undefined ? '' : 'endTimeExclusive=' + encodeURIComponent(endTimeExclusive) + '&'))).catch(function(response) {
        return $q.reject(utilities.getHttpError(response));
      });
    };

    // leaseId = 'Base64Guid' /* optional */
    // result = {
    //   leaseLengthSeconds: 0,
    //   leaseId: 'Base64Guid'
    // }
    service.getPaymentProcessingLease = function(leaseId) {
      return $http.get(utilities.fixUri(apiBaseUri + 'payment/lease?' + (leaseId === undefined ? '' : 'leaseId=' + encodeURIComponent(leaseId) + '&'))).catch(function(response) {
        return $q.reject(utilities.getHttpError(response));
      });
    };

    return service;
  });

