'use strict';

angular.module('ScoutIOApp')
.directive('photo', function () {
	return {
		templateUrl: 'components/photos/photo.html',
		restrict: 'E'
	}
});

