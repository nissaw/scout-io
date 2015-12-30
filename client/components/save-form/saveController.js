angular.module('ScoutIOApp')
  .controller('SaveFormController', function($scope, Link, Folder, Project){

//calling these 2 factory functions populates these arrays that are used for auto-complete/dropdown save input
    $scope.folders = [];
    $scope.projects = [];
    
    $scope.save = {
      folder: {},
      comment: {
        text: ""
      }
    };

    $scope.getFolders = function(){ 
      $scope.folders = [];     
      Project.getUserProjects()
        .then(function(response){
          $scope.projects = response;
          console.log('available projects: ', $scope.projects); 
          _.each($scope.projects, function(project){
            Project.getProjectFolders(project)
            // console.log(project)
              .then(function(response){
                console.log(response);
                $scope.folders.push(response[0]);
                console.log('available folders: ', $scope.folders); 
              })    
          })
        })
    };

    $scope.saveLink = function(photo){
      console.log('available folders: ', $scope.folders)
      console.log('saveLink clicked controller', photo);
      
        $scope.save.apiID = photo.id;
        $scope.save.name = photo.title;
        $scope.save.url = photo.url_s;
        $scope.save.apiName = 'flickr';
      
      Link.saveLink($scope.save)
        .then(function(data){
          $scope.save = {};
          console.log(data, 'data from backend')
        })
    };

   
  });