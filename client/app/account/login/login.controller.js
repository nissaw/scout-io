'use strict';




angular.module('ScoutIOApp.login', ['ngMaterial'])
  // .config(function($mdThemingProvider) { $mdThemingProvider.theme('docs-dark') .dark(); })
  .directive('login', [function() {
    return {
      restrict: 'EA',
      template: '<a ng-hide="isLoggedIn" href="#" ng-click="openLogin()"></a>',
      controller: 'LoginDirectiveCtrl'
    };
  }])
  .directive('logout', [function() {
    return {
      restrict: 'EA',
      template: '<a ng-show="isLoggedIn" href="#" ng-click="logout()">Logout</a>',
      controller: 'LoginDirectiveCtrl'
    };
  }])
  .controller('LoginDirectiveCtrl', ['$scope', '$rootScope', '$mdDialog', '$mdMedia','Auth', function($scope, $rootScope, $mdDialog, $mdMedia, Auth) {

    $scope.isLoggedIn = (Auth.isLoggedIn()) ? true : false;

    $rootScope.$on('userAction', function(){
      $scope.isLoggedIn = (Auth.isLoggedIn()) ? true : false;
    });

    $scope.openLogin = function(ev) {
      $mdDialog.show({
        parent: angular.element(document.body),
        templateUrl: 'app/account/login/login.html',
        controller: 'LoginInstanceCtrl',
        targetEvent: ev,
        clickOutsideToClose:true,
      });
    };

    $scope.logout = function() {
      Auth.logout();
      $rootScope.$broadcast('userAction');
    };



  }])
  .controller('LoginInstanceCtrl', ['$scope', '$rootScope', '$window', 'Auth', function($scope, $rootScope, $window, Auth) {

    $scope.user = {};
    $scope.showLogin = true;

    $scope.toggleLogin = function() {
      $scope.showLogin = !($scope.showLogin);
    };


    $scope.login = function() {
      Auth.login($scope.user);
        // .then(function(resp) {
        //   if (resp.data.token) {
        //     $window.localStorage.setItem('spartanShield', resp.data.token);
        //     $rootScope.$broadcast('userAction');
        //     $scope.close();
        //   } else {
        //     if (resp.data.err) {
        //       $scope.message = resp.data.err;
        //     }
        //   }
        // });
    };

    $scope.signup = function() {
      Auth.createUser($scope.user);
        // .then(function(resp) {
        //   if (resp.data) {
        //     $scope.close();
        //   } else {
        //     if (resp.data.err) {
        //       $scope.message = resp.data.err;
        //     }
        //   }
        // });
    };
  }]);
