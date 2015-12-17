angular.module('ScoutIOApp')
.controller('PhotoDialogCtrl', ['$mdDialog', '$scope', '$state', function ($mdDialog, $scope, $state) {
	$scope.showDialog = function (e, photo) {
		$scope.photo = photo;
    $mdDialog.show({
    	targetEvent: e,
    	locals: { photo: $scope.photo },
    	controller: DialogController,
    	controllerAs: 'dialog',
    	bindToController: true,
      templateUrl: 'components/modal/photoDialog.html',
    	parent: angular.element(document.body),
    	clickOutsideToClose: true
    });

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
