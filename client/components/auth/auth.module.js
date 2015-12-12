'use strict';

angular.module('ScoutIOApp.auth', [
    'ScoutIOApp.constants',
    'ScoutIOApp.util',
    'ngCookies',
    'ui.router'
  ])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
