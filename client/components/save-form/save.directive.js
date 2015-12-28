angular.module('ScoutIOApp')
  .directive('saveForm', [function(){
    return {
      restrict: 'E',
      templateUrl: '/save.html',
      controlller: 'SaveFormController',
      // scope: {
      //   // needs access to ... photo currently in the dialog
      // },
      link: function($scope, element, attrs){
        // when saved is successfull close dialog and show header across photoDialog
      }
    };
  }]);