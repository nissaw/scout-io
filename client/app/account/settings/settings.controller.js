'use strict';

class SettingsController {
  //start-non-standard
  errors = {};
  submitted = false;
  //end-non-standard

  constructor(Auth, User, $http) {
    this.Auth = Auth;
    this.User = User;
    this.Http = $http;
  }

  changePassword(form) {
    this.submitted = true;

    if (form.$valid) {
      this.Auth.changePassword(this.user.oldPassword, this.user.newPassword)
        .then(() => {
          this.message = 'Password successfully changed.';
        })
        .catch(() => {
          form.password.$setValidity('mongoose', false);
          this.errors.other = 'Incorrect password';
          this.message = '';
        });
    }
  }

  userProjects() {
    this.Http.get('/api/users/projects')
      .then((projects) => {
        console.log(projects.data);
      })
      .catch(() => {
        console.log("in catch")
      });
  }

  projectFolders() {
    this.Http.get('/api/projects/1/folders')
      .then((folders) => {
        console.log(folders.data);
      })
      .catch(() => {
        console.log("in catch")
      });
  }

  folderLinks() {
    this.Http.get('/api/folders/1/links')
      .then((links) => {
        console.log(links.data);
      })
      .catch(() => {
        console.log("in catch")
      });
  }

  folderAssets() {
    this.Http.get('/api/folders/1/assets')
      .then((assets) => {
        console.log(assets.data);
      })
      .catch(() => {
        console.log("in catch")
      });
  }


  assetUser() {
    this.Http.get('/api/assets/1/user')
      .then((user) => {
        console.log(user.data);
      })
      .catch(() => {
        console.log("in catch")
      });
  }

  assetComments() {
    this.Http.get('/api/assets/1/comments')
      .then((comments) => {
        console.log(comments.data);
      })
      .catch(() => {
        console.log("in catch")
      });
  }

  linkUser() {
    this.Http.get('/api/links/1/user')
      .then((user) => {
        console.log(user.data);
      })
      .catch(() => {
        console.log("in catch")
      });
  }

  linkComments() {
    this.Http.get('/api/links/1/comments')
      .then((comments) => {
        console.log(comments.data);
      })
      .catch(() => {
        console.log("in catch")
      });
  }

  commentUser() {
    this.Http.get('/api/comments/1/user')
      .then((user) => {
        console.log(user.data);
      })
      .catch(() => {
        console.log("in catch")
      });
  }
}

angular.module('ScoutIOApp')
  .controller('SettingsController', SettingsController);
