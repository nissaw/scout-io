angular.module('ScoutIOApp')
  .directive('commentBox', [function(){
    return {
      restrict: 'E',
      templateUrl: '/comments.html',
      controlller: 'CommentsController',
      scope: {},
      link: function($scope, element, attrs){

      }
    };
  }]);