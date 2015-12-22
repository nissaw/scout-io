angular.module('ScoutIOApp')
  .controller('SaveDialogController', function(Auth, Save){
//this is controller for the saveDialog 

function DialogController($scope, $mdDialog) {
  $scope.hide = function() {
    $mdDialog.hide();
  };
  $scope.cancel = function() {
    $mdDialog.cancel();
  };
  $scope.answer = function(answer) {
    $mdDialog.hide(answer);
  };
}