'use strict';

angular.module('ScoutIOApp')
  .directive('photoDialog', ['NgMap', function (NgMap) {
    return {
      restrict: 'EA',
      controller: 'PhotoDialogCtrl',
      scope: {
        photo: '='
      },
      link: function (scope, element) {
        scope.showDialog(e, scope.photo);
      }
    }
  }]);
