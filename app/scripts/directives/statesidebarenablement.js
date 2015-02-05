angular.module('webApp').directive('stateSidebarEnablement',
  function ($state) {
    'use strict';

    return {
      restrict: 'A',
      link:function (scope, element/*, attrs*/) {

        var apply = function(state){
          if(state.data && state.data.disableSidebar){
            element.addClass('sidebar-disabled');
          } else {
            element.removeClass('sidebar-disabled');
          }
        };

        apply($state.current);

        var removeListener = scope.$on('$stateChangeSuccess', function(event, toState/*, toParams, fromState, fromParams*/) {
          apply(toState);
        });

        element.on('$destroy', function() {
          removeListener();
        });
      }
    };
  });
