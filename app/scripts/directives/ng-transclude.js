// https://github.com/angular/angular.js/issues/5489#issuecomment-53450770
angular.module('webApp')
  .config(function($provide){
  'use strict';

  $provide.decorator('ngTranscludeDirective', ['$delegate', function($delegate) {
    // Remove the original directive
    $delegate.shift();
    return $delegate;
  }]);
})
  .directive( 'ngTransclude', function() {
  'use strict';

    return {
      restrict: 'EAC',
      link: function( $scope, $element, $attrs, controller, $transclude ) {
        if (!$transclude) {
          throw new FifthweekError(
            'Illegal use of ngTransclude directive in the template! ' +
            'No parent directive that requires a transclusion found. ');
        }

        var iScopeType = $attrs.ngTransclude || 'sibling';

        switch ( iScopeType ) {
          case 'sibling':
            $transclude( function( clone ) {
              $element.empty();
              $element.append( clone );
            });
            break;
          case 'parent':
            $transclude( $scope, function( clone ) {
              $element.empty();
              $element.append( clone );
            });
            break;
          case 'child':
            var iChildScope = $scope.$new();
            $transclude( iChildScope, function( clone ) {
              $element.empty();
              $element.append( clone );
              $element.on( '$destroy', function() {
                iChildScope.$destroy();
              });
            });
            break;
        }
      }
    };
  }
);
