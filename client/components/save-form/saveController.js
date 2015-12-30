angular.module('ScoutIOApp')
  .controller('SaveFormController', function($scope, Link, Folder, Project, Comment){

    $scope.folders = [];
    $scope.projects = [];
    
    $scope.save = {
      folder: {},
      comment: {
        text: ""
      }
    };

//Populates the folders and projects arrays that are used for auto-complete/dropdown for save input
    $scope.getFolders = function(){ 
      $scope.folders = [];     
      Project.getUserProjects()
        .then(function(response){
          $scope.projects = response;
          _.each($scope.projects, function(project){
            Project.getProjectFolders(project)
              .then(function(response){
                $scope.folders.push(response[0]);
              })    
          })
        })
    };

//Saves a link(photo) to a specified folder. may or may not include a comment
    $scope.saveLink = function(photo){
        $scope.save.apiID = photo.id;
        $scope.save.name = photo.title;
        $scope.save.url = photo.url_s;
        $scope.save.apiName = 'flickr';
      
      Link.saveLink($scope.save)
        .then(function(data){
          $scope.save = {};
        })
    };

});