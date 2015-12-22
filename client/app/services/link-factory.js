angular.module('ScoutIOApp')
  .factory('Link', function ($http) {
   
    var isSavedLink = function(photo){
      // a photo that is saved in the db when returned by a search will have a boolean property "saved"
      return photo.saved;
    }
  });