
angular.module('ScoutIOApp')
  .factory('photoDialogService', function () {
    var origin = '';

    return {
      saveOrigin:function (data) {
        origin = data;
        console.log(data);
      },
      getOrigin:function () {
        return origin;
      }
    };
  });

angular.module('ScoutIOApp')
  .controller('PhotoDialogCtrl', ['$mdDialog', '$scope', '$rootScope', '$state', function ($mdDialog, $rootScope, $scope, $state, NgMap) {
    $scope.showDialog = function (e, photo) {
      $scope.photo = photo;
      $scope.photo.datetaken = new Date($scope.photo.datetaken).toLocaleString();
      $scope.photoDialogFlexWidth = "80";
      $scope.origin = '';
      //$rootScope.origin = "";
      //var origin = photoDialogService.getOrigin();

      //function getOrigin()
      //{
      //  origin = photoDialogService.getOrigin;
      //}

      if ($scope.photo.height_m > $scope.photo.width_m) {
        $scope.photoDialogFlexWidth = "60";
      }

      $scope.placeChanged = function () {
        var place = this.getPlace();
        $scope.origin = place.geometry.location.lat() + "," + place.geometry.location.lng();
        //photoDialogService.setOrigin(place.geometry.location.lat() + "," + place.geometry.location.lng());
      };

      $mdDialog.show({
        targetEvent: e,
        locals: {
          photo: $scope.photo,
          photoDialogFlexWidth: $scope.photoDialogFlexWidth,
          placeChanged: $scope.placeChanged,
          origin: $scope.origin
        },
        controller: DialogController,
        controllerAs: 'dialog',
        bindToController: true,
        templateUrl: 'components/modal/photoDialog.html',
        parent: angular.element(document.body),
        clickOutsideToClose: true
      });
    };

    function DialogController($scope, $rootScope, $mdDialog, NgMap) {
      $scope.hide = function () {
        $mdDialog.hide();
      };

      $scope.cancel = function () {
        $mdDialog.cancel();
      };

      $scope.answer = function (answer) {
        $mdDialog.hide(answer);
      };

      NgMap.getMap({id: 'photomap'}).then(function (map) {
        $scope.map = map;

        //some hackery to make the map appear in this dialog and then recenter it as
        // resizing pushed the center downa nd to the right for some reason
        var center = $scope.map.getCenter();
        google.maps.event.trigger($scope.map, 'resize');
        $scope.map.setCenter(center);
      });

      //var setMarker = function() {
      //  NgMap.getMap({id: 'photomap'}).then(function (map) {
      //    $scope.map = map;
      //
      //    var myLatlng = new google.maps.LatLng(photo.latitude, photo.longitude);
      //    var marker = new google.maps.Marker({position: myLatlng, animation: "DROP"});
      //    marker.setMap($scope.map);
      //  });
      //};
      //
      //setTimeout(setMarker, 500);
    }
  }]);
