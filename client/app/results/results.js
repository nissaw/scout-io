'use strict';

angular.module('ScoutIOApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('results', {
        url: '/results',
        templateUrl: 'app/results/results.html',
        controller: 'ResultsController',
        controllerAs: 'results'
      });
  });
