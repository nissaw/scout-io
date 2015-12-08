'use strict';

angular.module('sqlTest2App')
  .directive('oauthButtons', function() {
    return {
      templateUrl: 'components/oauth-buttons/oauth-buttons.html',
      restrict: 'EA',
      controller: 'OauthButtonsCtrl',
      controllerAs: 'OauthButtons',
      scope: {
        classes: '@'
      }
    };
  });
