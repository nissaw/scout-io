'use strict';

angular.module('sqlTest2App')
  .config(function($stateProvider) {
    $stateProvider
      .state('results', {
        url: '/results',
        templateUrl: 'app/results/results.html',
        controller: 'ResultsController',
        controllerAs: 'results'
      });
  });