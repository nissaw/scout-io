angular.module('ScoutIOApp')
  .controller('CommentsController', function(Comment, Link){
    var commentCtrl = this;
    // get all comments for a link( by apiID) return the comment object and display 
      // text , author (get user name by userID) , updated_at, folder name, project name
      // if author is currently logged in - display an option to edit/delete

    // add a new comment
      // text and pick a folder

    commentCtrl.comments = [];
//if link exists in db 
    Link.getLinkComments(photo){

    }

    
    commentCtrl.comment = {};
    commentCtrl.getCurrentUser = Auth.getCurrentUser
    commentCtrl.author = Auth.getCurrentUser().username;

    commentCtrl.isSavedPhoto = function(photo){
      Link.getLinkById(photo) // gping to check by apiID
      // this function when built will return a boolean
      return Save.isSavedPhoto(photoId);
    };


    commentCtrl.edit = function(){};
    commentCtrl.delete = function(){};
    commentCtrl.save = function(){};
});

