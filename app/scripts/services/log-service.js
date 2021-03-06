/// <reference path='../angular.module('webApp')js' />

angular.module('webApp')
  .factory('logService',
  function($injector, $log, $window, fifthweekConstants) {
    'use strict';

    var service = {};

    var loggingUrl = fifthweekConstants.apiBaseUri + fifthweekConstants.logPath;

    service.shouldLog = function(payload)
    {
      return payload !== undefined && (payload instanceof Error || !jQuery.isEmptyObject(payload));
    };

    var logToServer = function(level, message) {
      if(!service.shouldLog(message)){
        return;
      }

      var data = {
        level: level,
        payload: {
          url: $window.location.href,
          message: message
        }
      };

      // We have to do this here to avoid an Angular circular dependency.
      var $http = $injector.get('$http');
      return $http.post(loggingUrl, data).catch(function(response) {
        $log.warn('Server-side logging failed');
        $log.warn(response);
      });
    };

    service.debug = function(message){
      $log.debug(message);
      return logToServer('debug', message);
    };

    service.info = function(message){
      $log.info(message);
      return logToServer('info', message);
    };

    service.warn = function(message){
      $log.warn(message);
      return logToServer('warn', message);
    };

    service.error = function(error){
      if(error instanceof ApiError || error instanceof InputValidationError)
      {
        // We don't log API errors to the server (as they have already been logged),
        // also, input validation errors are recoverable and intended for the user.
        $log.info(error.message);
      }
      else
      {
        // An unknown error.  Try to log it and return a generic message.
        $log.error(error);
        return logToServer('error', error);
      }
    };

    service.logUnhandledError = function(exception, cause) {
      if(service.shouldLog(exception) || service.shouldLog(cause))
      {
        if(exception instanceof ApiError) // || error instanceof InputValidationError - should be handled.
        {
          // We don't log API errors to the server (as they have already been logged).
          $log.info(exception.message);
        }
        else {
          var message = {
            cause: cause,
            exception: exception
          };

          return logToServer('error', message);
        }
      }
    };

    return service;
  }
);

