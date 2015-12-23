angular.module('ScoutIOApp')
   .factory('Asset', function ($http) {
      var assets = [];

      // GET ALL OF A USERS ASSETS
      var getAllAssets = function(user){
         return $http({
           method: 'GET',
           url: '/api/assets/' + user.id + '/user' 
         })
           .then(function(response){
             console.log(response);
             return response
           })
           .catch(function(error){
             console.log(error, "in catch: asset-factory")
           });
      };

      // GET A ASSET BY ID
      var getAssetById = function(asset){
         return $http({
           method: 'GET',
           url: '/api/assets/' + asset.id
         })
           .then(function(response){
             console.log(response);
             return response
           })
           .catch(function(error){
             console.log(error, "in catch: asset-factory")
           });
      };

      //GET ALL COMMENTS FOR A ASSET
      var getAssetComments = function(asset){
         return $http({
           method: 'GET',
           url: '/api/assets/' + asset.id + '/comments'
         })
           .then(function(response){
             console.log(response);
             return response
           })
           .catch(function(error){
             console.log(error, "in catch: asset-factory")
           });
      };

      // SAVE A ASSET
      var saveAsset = function(asset){
         return $http({
           method: 'POST',
           url: '/api/assets',
           data: asset
         })
         .then(function(response){
           console.log('asset was saved');
           var message = 'Location Has Been Successfully Saved';
           return message;
         })
           .catch(function(error){
             console.log(error, "in catch: asset-factory")
           });
      };

      // EDIT A ASSET 
      var editAsset = function(asset){
         return $http({
           method: 'PUT',
           url: '/api/assets/' + asset.id,
           data: asset
         })
           .then(function(response){
            console.log('asset was updated');
            var message = 'Location Has Been Successfully Updated';
            return message;
           })
           .catch(function(error){
             console.log(error, "in catch: asset-factory")
           });
      };

      // DELETE A ASSET
      var deleteAsset = function(asset){
         return $http({
           method: 'DELETE',
           url: '/api/assets/' + asset.id
         })
           .then(function(response){
            console.log('asset was deleted');
            var message = 'Location Has Been Successfully Deleted';
           })
           .catch(function(error){
             console.log(error, "in catch: asset-factory")
           });
      };

      return {
         getCurrentAssets: function(){return assets;},
         getAllAssets: getAllAssets,
         getAssetById: getAssetById,
         saveAsset: saveAsset,
         editAsset: editAsset,
         deleteAsset: deleteAsset
      };
  
   });



   // get all users assets
     assetUser() {
       this.Http.get('/api/assets/1/user')
         .then((user) => {
           console.log(user.data);
         })
         .catch(() => {
           console.log("in catch")
         });
     }

   // get an assetts comments
     assetComments() {
       this.Http.get('/api/assets/1/comments')
         .then((comments) => {
           console.log(comments.data);
         })
         .catch(() => {
           console.log("in catch")
         });
     }