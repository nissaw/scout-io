angular.module('ScoutIOApp')
  .controller('SaveFormController', function($scope, Link){

    $scope.saveLink = function(link){
      Link.saveLink(link)
      .then(function(data){
        console.log(data, 'data was saved')
      })
    };

   
  });