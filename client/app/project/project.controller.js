'use strict';

(function() {

  class ProjectController {

    constructor($http, $scope, socket) {
      this.$http = $http;
      this.projects = [];

      $http.get('/api/projects').then(response => {
        this.projects = response.data;
      });

      $scope.$on('$destroy', function() {
        socket.unsyncUpdates('project');
      });
    }

    getProjectFolders(project) {
      this.$http.get('/api/projects/' + project._id + '/folders').then(response => {
        console.log(response.data);
      });
    }

    addProject() {
      if (this.newProject) {
        this.$http.post('/api/projects', { name: this.newProject });
        this.newProject = '';
      }
    }

    deleteProject(project) {
      this.$http.delete('/api/projects/' + project._id);
    }
  }

  angular.module('sqlTest2App')
    .controller('ProjectController', ProjectController);

})();
