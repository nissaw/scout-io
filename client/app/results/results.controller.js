angular.module('ScoutIOApp')
.controller('ResultsController', ResultsController);

function ResultsController(){
  this.name = "Scout IQ";
  this.search = {
    text: "Wisconsin, campfire, canoe"
  }
};

