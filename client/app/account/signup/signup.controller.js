'use strict';

class SignupController {
  //start-non-standard
  user = {};
  errors = {};
  submitted = false;
  //end-non-standard

  constructor(Auth, $state) {
    this.Auth = Auth;
    this.$state = $state;
  }

  register(form) {
    this.submitted = true;

    if (form.$valid) {
      this.Auth.createUser({
        name: this.user.name,
        email: this.user.email,
        password: this.user.password
      })
      //Set equal to a variable? 
      .then(() => {
        //Create project
        this.Http.post('/api/users/projects', { name: this.newThing });
        //Set name
        this.newThing = 'My First Project';
        //Create the folder
        this.Http.post('/api/folders', { name: this.newThing });
        //Set the Folder's Name
         this.newThing = 'My First Folder';
        //Join the Folder & Project
        //Join the Project and User
        
        //Option B
           this.Http.post('/api/users/projects')
           .then((projects) => {
               //Set name
               console.log(projects.data);
               //Join projectId and userId
               projects.UserId = user;
           })
           .catch(() => {
               console.log('in catch');
           });
        
        //Create a Folder
       this.Http.post('/api/users/projects')
           .then((projects) => {
               console.log(projects.data);
           })
           .catch(() => {
               console.log('in catch');
           });
        // Account created, redirect to home
        this.$state.go('main');
      })
      .catch(err => {
        err = err.data;
        this.errors = {};

        // Update validity of form fields that match the sequelize errors
        if (err.name) {
          angular.forEach(err.fields, field => {
            form[field].$setValidity('mongoose', false);
            this.errors[field] = err.message;
          });
        }
      });
    }
  }
}

angular.module('ScoutIOApp')
  .controller('SignupController', SignupController);
