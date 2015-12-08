'use strict';

angular.module('sqlTest2App.auth', [
  'sqlTest2App.constants',
  'sqlTest2App.util',
  'ngCookies',
  'ui.router'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
