
angular.module('ScoutIOApp')
  .factory('Folder', function ($http, Project) {
  
    var folders = [];
    var folderPaths = [];
    var projects = [];

var buildPaths = function(array){
  var paths = [];
  _.each(array, function(folder){
    // get parent of folder recursively concat onto current path
  })
  return paths;
};

//GET ALL USER FOLDERS
// gets all projects then all folders from each project
  var getUserFolders = function(){
    Project.getUserProjects()
      .then(function(response){
        projects = response.projects;
        _.each(projects, function(project){
          Project.getProjectFolders(project.id)
            .then(function(response){
              folders.push(response)
            })
            .catch(function(error){
              console.log(error, "in getProjectFolders")
            })
        });
      })
      .catch(function(error){
        console.log(error, "in getUserProjects")
      })
  };

// GET FOLDER BY ID
  var getFolderById = function(folder){
      return $http({
        method: 'GET',
        url: '/api/folders/' + folder.id
      })
        .then(function(response){
          console.log(response);
          return response; 
        })
        .catch(function(error){
          console.log(error, "in catch: folder-factory")
        });
    };

//GET ALL FOLDER LINKS
    var getFolderLinks = function(folder) {
      return $http({
        method: 'GET',
        url: '/api/folders/' + folder.id + '/links'
      })
        .then(function(response){
          console.log(response);
          return response;      
        })
        .catch(function(error){
          console.log(error, "in catch: folder-factory")
        });
    };
//GET ALL FOLDER ASSETS
    var getFolderAssets = function(folder) {
      return $http({
        method: 'GET',
        url: '/api/folders/' + folder.id + '/assets'
      })
        .then(function(response){
          console.log(response);
          return response;      
        })
        .catch(function(error){
          console.log(error, "in catch: folder-factory")
        });
    };


//CREATE A FOLDER
  var createFolder = function(folder){
    return $http({
      method: 'POST',
      url: '/api/folders',
      data: folder
    })
      .then(function(response){
        console.log('folder was created');
        var message = 'Your Folder Has Been Successfully Saved';
        return message;  
      })
      .catch(function(error){
        console.log(error, "in catch: folder-factory")
      });
  };

//EDIT A FOLDER 
  var editFolder = function(folder){
    return $http({
      method: 'PUT',
      url: '/api/folders/' + folder.id,
      data: folder
    })
      .then(function(response){
        console.log('folder was updated');
        var message = 'Your Folder Has Been Successfully Updated';
        return message;
      })
      .catch(function(error){
        console.log(error, "in catch: folder-factory")
      });
  };

//DELETE A FOLDER 
  var deleteFolder = function(folder){
    return $http({
      method: 'DELETE',
      url: '/api/folders/' + folder.id
    })
      .then(function(response){
        console.log('folder was deleted');
        var message = 'Your Folder Has Been Successfully Deleted';
        return message;
      })
      .catch(function(error){
        console.log(error, "in catch: folder-factory")
      });
  };



    return {
      buildPaths: buildPaths,
      getFolders: function(){return folders;},
      getFolderPaths: function(){return folderPaths;},
      getProjects: function(){return projects;},
      getUserFolders: getUserFolders,
      getFolderById: getFolderById,
      getFolderLinks: getFolderLinks,
      getFolderAssets: getFolderAssets,
      createFolder: createFolder,
      editFolder: editFolder,
      deleteFolder: deleteFolder
    };

  });