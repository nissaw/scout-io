angular.module('ScoutIOApp')
  .directive('commentBox', [function(){
    return {
      restrict: 'E',
      templateUrl: '/comments.html',
      controlller: 'CommentsController',
      controllerAs: 'commentCtrl'
      // scope: {
      //   photo: '=' 
      // },
      // link: function(scope, element, attrs){

      // }
    };
  }]);