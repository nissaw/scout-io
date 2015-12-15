'use strict';


var _ = require('lodash');

var flickrURL = "https://api.flickr.com/services/rest/?method=" + flickrSearch + "&api_key=" + flickrAPIKey;
var flickrSearch = "flickr.photos.search";
var flickrAPIKey = process.env.FLICKR_API_KEY;
var flickrEnd = "&tag_mode=all&has_geo=1&extras=geo%2Ctags%2C+date_taken%2Cpath_alias%2C+url_s%2C+url_m&format=json&nojsoncallback=1";


// URL: https://api.flickr.com/services/rest/
// ?method=flickr.photos.search
// &api_key=BLAHBLAHBLAH
// &tags=%27eastern+sierra%27%2C+snow
// &tag_mode=all
// &has_geo=1
// &extras=geo%2Ctags%2C+date_taken%2Cpath_alias%2C+url_s%2C+url_m&per_page=
// &format=json
// &nojsoncallback=1 
// &api_sig= not the same as api_key unk what this does

// how do tags need to be parsed, can params be in any order? what does nojsoncallback and api_sig for?
//  url with lat lon:  &tag_mode=all&has_geo=1&lat=37.623617&lon=-119.013540&radius=5&radius_units=mi&extras=

// do we need to require //  var request = require('request');
// should we use the nodeAPI package


function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

function responseWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

// Gets photos by tagSearch only
exports.tags = function(req, res) {
  //  %27 = ''  //  %2C = , // + = space
  // do req.params.tags = " 'eastern sierra', snow " need to be parsed into "%27eastern+sierra%27%2C+snow"
  var query = flickrURL + "&tags=" + req.params.tags + flickrEnd;
  var options = {
    url: query,
    headers: {
      // 'Content-Type': 'application/json'
    }
  };
  request(options, function(err, response, data) {
    if (err) {
      console.log(err);
    }
    res.send(data);
  });

  // Link.findAll()
  //   .then(responseWithResult(res))
  //   .catch(handleError(res));
};

// Gets photos within a radius without filtering by tag
exports.geo = function(req, res) {
  var query = flickrURL;
  // Link.find({
  //   where: {
  //     _id: req.params.id
  //   }
  // })
  //   .then(handleEntityNotFound(res))
  //   .then(responseWithResult(res))
  //   .catch(handleError(res));
};

// Gets photos that match all passed params / all params optional
exports.searchCriteria = function(req, res) {
  // Link.find({
  //   where: {
  //     _id: req.params.id
  //   }
  // })
  //   .then(handleEntityNotFound(res))
  //   .then(responseWithResult(res))
  //   .catch(handleError(res));
};