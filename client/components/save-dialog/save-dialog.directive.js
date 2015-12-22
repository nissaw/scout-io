angular.module('ScoutIOApp')
  .directive('saveDialog', [function(){
    return {
      restrict: 'EA',
      templateUrl: '/save-dialog.html',
      controlller: 'SaveDialogController',
      scope: {
        // needs access to ... photo currently in the dialog
      },
      link: function($scope, element, attrs){
        // when saved is successfull close dialog and show header across photoDialog
      }
    };
  }]);