'use strict';


var _ = require('lodash');
var request = require('request');
var querystring = require("querystring");
var config = require('../../config/environment');

var flickrSearch = "flickr.photos.search";
var flickrAPIKey = config.flickr.apiKey;

var flickrURL = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=" + flickrAPIKey;
var flickrEnd = "&has_geo=1&extras=geo%2Ctags%2C+date_taken%2Cpath_alias%2C+url_s%2C+url_m&format=json&nojsoncallback=1";

// URL: https://api.flickr.com/services/rest/
// ?method=flickr.photos.search
// &api_key=BLAHBLAHBLAH
// &tags=%27eastern+sierra%27%2C+snow
// &tag_mode=all
// &has_geo=1
// &extras=geo%2Ctags%2C+date_taken%2Cpath_alias%2C+url_s%2C+url_m&per_page=
// &format=json
// &nojsoncallback=1 // or pass in a function here for the result to be passed into before being displayed
// &api_sig= not the same as api_key unk what this does

// how do tags need to be parsed, can params be in any order? what does nojsoncallback and api_sig for?
//  url with lat lon:  &tag_mode=all&has_geo=1&lat=37.623617&lon=-119.013540&radius=5&radius_units=mi&extras=

// should we use the nodeFlickrAPI package

//  %27 = ''  //  %2C = , // + = space
// do req.params.tags = " 'eastern sierra', snow " need to be parsed into "%27eastern+sierra%27%2C+snow"
// var query = flickrURL + "&tags=" + req.params.tags + flickrEnd;


function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function (err) {
    res.status(statusCode).send(err);
  };
}

function responseWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function (entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function handleEntityNotFound(res) {
  return function (entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

// Gets photos by tagSearch only
//'eastern sierra', snow   needs to equal:
// tags=%27eastern+sierra%27%2C+snow
//single tag = &tags=washington

exports.tags = function(req, res) {
  console.log("in the tags func");
 
  var input = encodeURIComponent(req.params.query).replace(/'/g, "%27").replace(/%20/g, "+");
  var query = flickrURL + "&tags=" + input + flickrEnd;
  console.log(query);
  // var options = {
  //   url: query
  // };

  request(query, function (err, response, data) {
    if (err) {
      console.log(err);
    }
    res.send(data);
  });
};

// Gets photos within a radius without filtering by tag
exports.geo = function (req, res) {
  var query = flickrURL;

};

// Gets photos that match all passed params / all params optional
exports.searchCriteria = function (req, res) {
  console.log('here in searchCriteria');
  console.log(req.body);

  var obj = req.body;

  var query = flickrURL;
  //check for submitted keywords if they exist uri encode them 
  if (obj.keywords){
    var tags = encodeURIComponent(obj.keywords).replace(/'/g, "%27").replace(/%20/g, "+");
    query += "&tags=" + tags;
  }
  //check for any or all tags
  if (obj.tag === "all keywords"){
    query += "&tag_mode=all";
  } 
  if (obj.tag === "any keywords"){
    query += "tag_mode=any";
  }

  // check for geo input
  if (obj.placeName){
    query+= "&lat=" + obj.lat + "&lon=" + obj.lon + "&radius=" + obj.radius + "&radius_units=mi";
  }
  //check for startDate // if it exists needs to be 10digit unix timestamp
  if (obj.startDate){
    var startDate = Number((Date.parse(obj.startDate)).toString().slice(0,10));
    query+= "&min_taken_date=" + startDate;
  }
  //check for endDate // if it exists needs to be 10digit unix timestamp
  if (obj.endDate){
    var endDate = Number((Date.parse(obj.endDate)).toString().slice(0,10));
    query+= "&max_taken_date=" + endDate;
  }
  // check for indoor/outdoor
  // if ( (obj.setting.outdoor && obj.setting.indoor) || (!obj.setting.outdoor && !obj.setting.indoor) ) {
  //   obj.geo_context= 0;
  // }
  // else if (obj.setting.indoor){
  //   obj.geo_context = 1;
  // }
  // else if (obj.setting.outdoor){
  //   obj.geo_context = 2;
  // }
  // query+= "&geo_context=" + obj.geo_context;

  // limit to 100 per page
  query+= "&per_page=" + 100;

  // check for page requested
  if (obj.pageRequested){
    query+= "&page=" + Number(obj.pageRequested);
  }

  query+= flickrEnd;
  
  var options = {
    url: query
  };

  console.log(options.url);

  request(options, function (err, response, data) {
    if (err) {
      console.log(err);
    }

    console.log("data", data);

    res.send(data);
  });



};


// here in searchCriteria
// { setting: { indoor: false, outdoor: true },
//   radius: 5,
//   startDate: '2015-12-01T08:00:00.000Z',
//   endDate: '',
//   keywords: 'new orleans, cemetary',
//   placeName: 'New Orleans, LA, United States',
//   geoCoordinates: 
//    { location: { lat: 29.95106579999999, lng: -90.0715323 },
//      viewport: 
//       { south: 29.8666609,
//         west: -90.1400739,
//         north: 30.1748625,
//         east: -89.62693109999998 } },
//   lat: 29.95106579999999,
//   lon: -90.0715323 }






