angular.module('ScoutIOApp')
   .factory('Comment', function ($http) {
    
    // GET ALL USER COMMENTS
    // GET A COMMENT BY ID
    // CREATE/SAVE A COMMENT
    // EDIT A COMMENT
    // DELETE A COMMENT

    // GET ALL OF A USERS COMMENTS
    var getAllComments = function(){};

    // GET A COMMENT BY ID
    var getCommentById = function(){};

    // SAVE A COMMENT
    var saveComment = function(){};

    // EDIT A COMMENT
    var editComment = function(){};

    // DELETE A COMMENT
    var deleteComment = function(){};

    return {
      getAllComments: getAllComments,
      getCommentById: getCommentById,
      saveComment: saveComment,
      editComment: editComment,
      deleteComment: deleteComment
    };

   }); 