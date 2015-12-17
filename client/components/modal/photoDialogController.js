angular.module('ScoutIOApp')
  .controller('PhotoDialogCtrl', ['$mdDialog', '$scope', '$state', function ($mdDialog, $scope, $state) {
    $scope.showDialog = function (e, photo) {
      $scope.photo = photo;

      $mdDialog.show({
        targetEvent: e,
        locals: {photo: $scope.photo},
        controller: DialogController,
        controllerAs: 'dialog',
        bindToController: true,
        templateUrl: 'components/modal/photoDialog.html',
        parent: angular.element(document.body),
        clickOutsideToClose: true
      }).then(function () {
        var map = new google.maps.Map(document.getElementById('smallmap'), {

          center: {lat: dialog.photo.latitude, lng: dialog.photo.longitude},
          zoom: 8
        });
        console.log("map", map);
      })
    };

    function DialogController($scope, $mdDialog) {
      $scope.hide = function () {
        $mdDialog.hide();
      };
      $scope.cancel = function () {
        $mdDialog.cancel();
      };
      $scope.answer = function (answer) {
        $mdDialog.hide(answer);
      };
    }

  }]);
