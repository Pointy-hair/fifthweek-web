'use strict';

angular
  .module('webApp', [
    'mgcrea.ngStrap',
    'ngAnimate',
    'ngResource',
    'ngRoute',
    'ui.router',
    'ngSanitize',
    'LocalStorageModule',
    'ng-focus',
    'toaster',
    'angular-loading-bar',
    'snap',
    'angulartics',
    'angulartics.google.analytics',
    'angulartics.google.analytics.userid',
    'angulartics.kissmetrics'
  ])
  .constant('fifthweekConstants', {
    apiBaseUri: window.configuredApiBaseUri,
    developerName: window.developerName,
    developerNameHeader: 'Developer-Name',
    clientId: 'fifthweek.web.1',
    unexpectedErrorText: 'An error has occured.',
    connectionErrorText: 'Unable to communicate with the server. Make sure you are connected to the internet and try again.',
    tokenPath: 'token',
    logPath: 'log',
    homePage: '/',
    signInPage: '/signin',
    signOutPage: '/signout',
    registerPage: '/register',
    accountPage: '/account',
    dashboardPage: '/dashboard',
    feedbackPage: '/dashboard/feedback',
    notAuthorizedPage: '/notauthorized',
  })
  /*
  .config(['$routeProvider', 'fifthweekConstants', 'snapRemoteProvider',
    function ($routeProvider, fifthweekConstants, snapRemoteProvider) {
    $routeProvider
      .when(fifthweekConstants.homePage, {
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl'
      })
      .when(fifthweekConstants.signInPage, {
        templateUrl: 'views/signin.html',
        controller: 'SignInCtrl'
      })
      .when(fifthweekConstants.registerPage, {
        templateUrl: 'views/register.html',
        controller: 'RegisterCtrl'
      })
      .when(fifthweekConstants.accountPage, {
        templateUrl: 'views/account.html',
        controller: 'AccountCtrl',
        access: {
          loginRequired: true
        }
      })
      .when(fifthweekConstants.dashboardPage, {
        templateUrl: 'views/dashboard/demonstration.html',
        access: {
          loginRequired: true
        }
      })
      .when(fifthweekConstants.feedbackPage, {
        templateUrl: 'views/dashboard/feedback.html',
        access: {
          loginRequired: true
        }
      })
      .when(fifthweekConstants.signOutPage, {
        templateUrl: 'views/signout.html',
        controller: 'SignOutCtrl'
      })
      .when(fifthweekConstants.notAuthorizedPage, {
        redirectTo: fifthweekConstants.homePage  // TODO: Create a "Not Authorized" page.
      })
      .otherwise({
        redirectTo: fifthweekConstants.homePage
      });

    snapRemoteProvider. globalOptions = {
      disable: 'left',
      touchToDrag: false
    };

  }]);
*/

.config(function($stateProvider, $urlRouterProvider) {
  //
  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise('/state1');
  //
  // Now set up the states
  $stateProvider
    .state('state1', {
      url: '/state1',
      templateUrl: 'views/state1.html'
    })
    .state('state1.list', {
      url: '/list1',
      templateUrl: 'views/state1.list.html',
      controller: function($scope) {
        $scope.items = ['A', 'List', 'Of', 'Items'];
      }
    })
    .state('state2', {
      url: '/state2',
      templateUrl: 'views/state2.html'
    })
    .state('state2.list', {
      url: '/list2',
      templateUrl: 'views/state2.list.html',
      controller: function($scope) {
        $scope.things = ['A', 'Set', 'Of', 'Things'];
      }
    });
});
