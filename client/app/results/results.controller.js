angular.module('ScoutIOApp')
  .controller('ResultsController', ResultsController);

function ResultsController($state, $http, NgMap, Search, $rootScope) {
  var results = this;
  var bounds;


  results.place;
  results.search = {};
  results.search.placeName;
  results.search.keywords;
  results.search.setting = {};
  results.search.setting.indoor = false;
  results.search.setting.outdoor = false;
  results.search.radius = null;
  results.search.startDate = '';
  results.search.endDate = '';
  results.search.tag = 'all keywords';
  results.showHide = 'Show Advanced Search';
  results.advancedSearchOpen = false;

  results.name = "Scout IQ";
  results.map = null;
  results.mapStyle = [{"featureType":"landscape","stylers":[{"hue":"#FFBB00"},{"saturation":43.400000000000006},{"lightness":37.599999999999994},{"gamma":1}]},{"featureType":"road.highway","stylers":[{"hue":"#FFC200"},{"saturation":-61.8},{"lightness":45.599999999999994},{"gamma":1}]},{"featureType":"road.arterial","stylers":[{"hue":"#FF0300"},{"saturation":-100},{"lightness":51.19999999999999},{"gamma":1}]},{"featureType":"road.local","stylers":[{"hue":"#FF0300"},{"saturation":-100},{"lightness":52},{"gamma":1}]},{"featureType":"water","stylers":[{"hue":"#0078FF"},{"saturation":-13.200000000000003},{"lightness":2.4000000000000057},{"gamma":1}]},{"featureType":"poi","stylers":[{"hue":"#00FF6A"},{"saturation":-1.0989010989011234},{"lightness":11.200000000000017},{"gamma":1}]}];

  results.$http = $http;
  results.$state = $state;
  // results.photos = Search.tagResults();
  $rootScope.photos = [];

  results.getByTagOnly = function (query) {
    results.$state.go('results');

    Search.getByTagOnly(query)
      .then(function (response) {
          $rootScope.photos = response.data.photos.photo;
          results.search.keywords = query;  //TODO: not setting form element text for some reason

          setMarkers();
      })
  };

  results.advancedSearch = function (form) {

    if (results.place) {
      results.search.geoCoordinates = results.place.geometry;
      results.search.lat = results.search.geoCoordinates.location.lat();
      results.search.lon = results.search.geoCoordinates.location.lng();
    }

    if (!results.search.placeName) {
      results.search.geoCoordinates = null;
    }

    if (results.search.radius === 0){
      results.search.radius = null;
    }

    Search.getAdvanced(results.search)
     .then(function (response) {
      $rootScope.photos = response.data.photos.photo;
      setMarkers();
     })

  };

  var setMarkers = function () {
    NgMap.getMap({id: 'resultsmap'}).then(function (map) {
      results.map = map;

      if (results.map.markers) {
        for (var i = 0; i < results.map.markers.length; i++) {
          results.map.markers[i].setMap(null);
        }
      }

      results.map.markers = [];
      bounds = new google.maps.LatLngBounds();

      for (var i = 0; i < $rootScope.photos.length; i++) {
        var myLatlng = new google.maps.LatLng($rootScope.photos[i].latitude, $rootScope.photos[i].longitude);
        var marker = new google.maps.Marker({position: myLatlng});

        marker.addListener('click', results.toggleBounce);
        marker.setMap(results.map);
        results.map.markers.push(marker);

        console.log(results.photos[i].latitude > -68, results.photos[i].latitude);

        if (results.photos[i].latitude > -68) {
          bounds.extend(myLatlng);
        }
      }

      results.map.setCenter(bounds.getCenter());

      results.map.fitBounds(bounds);
      console.log("bounds", bounds);
    });
  };

  results.toggleBounce = function () {
    var marker = this;

    marker.setAnimation(google.maps.Animation.BOUNCE);
    setTimeout(function () {
      marker.setAnimation(null);
    }, 2100);
  };

  results.showPhotoPin = function (evt, photoId) {
    results.photo = $rootScope.photos[id];
    results.map.showInfoWindow('photoInfo', this);
  };

  results.placeChanged = function () {
    results.place = this.getPlace();
  };

  results.toggleAdvancedSearchDiv = function (divStatus) {
    results.advancedSearchOpen = results.advancedSearchOpen ? false : true;
    if(!divStatus) {
      results.showHide = 'Hide Advanced Search';
    } else {
      results.showHide = 'Show Advanced Search';
    }
  };

}


// photo.tag is a space separated string of tags so need to use .split(" ") to get a comma seperated array
// the host url is not on this object but can be created by following this convention https://www.flickr.com/photos/{photo.pathalias}/{photo.id}/
// results.samplePhoto = {
// accuracy: "16"
// context: 0
// datetaken: "2014-07-27 16:29:48"
// datetakengranularity: "0"
// datetakenunknown: "0"
// farm: 1
// geo_is_contact: 0
// geo_is_family: 0
// geo_is_friend: 0
// geo_is_public: 1
// height_m: "414"
// height_s: "199"
// id: "22416075689"
// isfamily: 0
// isfriend: 0
// ispublic: 1
// latitude: "44.077861"
// longitude: "-116.935203"
// owner: "8599745@N08"
// pathalias: "kevystew"
// place_id: "WZREzB1TVry9hify"
// secret: "bcac6035d5"
// server: "751"
// tags: "cityhall idaho courthouse courthouses us95 countycourthouse nationalregister nationalregisterofhistoricplaces payette usccidpayette payettecounty"
// title: "City Hall and Courthouse- Payette ID (1)"
// url_m: "https://farm1.staticflickr.com/751/22416075689_bcac6035d5.jpg"
// url_s: "https://farm1.staticflickr.com/751/22416075689_bcac6035d5_m.jpg"
// width_m: "500"
// width_s: "240"
// woeid: "2469449"
