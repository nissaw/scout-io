angular.module('ScoutIOApp')
  .controller('ResultsController', ResultsController);

function ResultsController($state, $http, NgMap, Search, $rootScope) {
  var results = this;
  var bounds;

  results.place;

  results.search = {
    placeName: '',
    keywords: '',
    setting: {
      indoor: false,
      outdoor: false   
    },
    radius: 5,
    startDate: '',
    endDate: '',
    tag: 'all keywords'
  };
 
  results.name = "Scout IQ";
  results.map = null;
  results.mapStyle = [{"featureType":"landscape","stylers":[{"hue":"#FFBB00"},{"saturation":43.400000000000006},{"lightness":37.599999999999994},{"gamma":1}]},{"featureType":"road.highway","stylers":[{"hue":"#FFC200"},{"saturation":-61.8},{"lightness":45.599999999999994},{"gamma":1}]},{"featureType":"road.arterial","stylers":[{"hue":"#FF0300"},{"saturation":-100},{"lightness":51.19999999999999},{"gamma":1}]},{"featureType":"road.local","stylers":[{"hue":"#FF0300"},{"saturation":-100},{"lightness":52},{"gamma":1}]},{"featureType":"water","stylers":[{"hue":"#0078FF"},{"saturation":-13.200000000000003},{"lightness":2.4000000000000057},{"gamma":1}]},{"featureType":"poi","stylers":[{"hue":"#00FF6A"},{"saturation":-1.0989010989011234},{"lightness":11.200000000000017},{"gamma":1}]}];

  results.$http = $http;
  results.$state = $state;
  $rootScope.photos = [];

  results.query = '';


  results.currentDate = new Date();
  results.maxDate = new Date(
    results.currentDate.getFullYear(),
    results.currentDate.getMonth(),
    results.currentDate.getDate());  //can't we just use 'new Date();' for this?
  results.minDate = results.search.startDate;


  results.getByTagOnly = function (query) {
    results.$state.go('results');

    Search.getByTagOnly(query)
      .then(function (response) {
        if (response.data.photos) {
          $rootScope.photos = response.data.photos.photo;
        } else {
          $rootScope.photos = [];
        }

        results.query = Search.getLastQuery();
        setMarkers();
      })
  };

  results.advancedSearch = function () {
    if (results.place) {
      results.search.geoCoordinates = results.place.geometry;
      results.search.lat = results.search.geoCoordinates.location.lat();
      results.search.lon = results.search.geoCoordinates.location.lng();
    } else {
      results.search.geoCoordinates = null;
    }

    if (results.search.radius === 0){
      results.search.radius = 2;
    }

    // call the factory function and get the result back
    Search.getAdvanced(results.search)
      .then(function (response) {
        if (response.data.photos) {
          $rootScope.photos = response.data.photos.photo;
        } else {
          $rootScope.photos = [];
        }
        results.query = Search.getLastQuery();

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
        var marker = new google.maps.Marker({position: myLatlng, photoID: $rootScope.photos[i].id});

        marker.addListener('click', results.toggleBounceClick);
        marker.setMap(results.map);
        results.map.markers.push(marker);

        $rootScope.photos[i].marker = marker;
        marker.photoId = $rootScope.photos[i].id;

        if ($rootScope.photos[i].latitude > -68) {
          bounds.extend(myLatlng);
        }
      }

      results.map.setCenter(bounds.getCenter());
      results.map.fitBounds(bounds);
    });
  };

  results.onMouseEnter = function (e, img) {
    $(".results-photo").removeClass("hovered");
    var el = e.target;
    el.classList.add("hovered");

    results.toggleBounce(img.marker);
  };

  results.onMouseLeave = function (e, img) {
    $(".results-photo").removeClass("hovered");
  };

  results.toggleBounceClick = function () {
    var marker = this;
    var $card = $("#photo-card-" + marker.photoId);
    var $sidebar = $("#results-sidebar-left");

    $(".results-photo").removeClass("hovered");
    $card.addClass("hovered");
    $sidebar.animate ({scrollTop:$sidebar.scrollTop() + $card.offset().top - 200}, "fast");

    marker.setAnimation(google.maps.Animation.BOUNCE);

    setTimeout(function () {
      marker.setAnimation(null);
    }, 2100);
  };

  results.toggleBounce = function (marker) {
    if (results.map.getZoom() < 10) {
      results.map.setZoom(10);
    }
    results.map.panTo(marker.getPosition());
    marker.setAnimation(google.maps.Animation.BOUNCE);

    setTimeout(function () {
      marker.setAnimation(null);
    }, 2100);
  };

  results.placeChanged = function () {
    results.place = this.getPlace();
  };

  results.toggleAdvancedSearchDiv = function (divStatus) {
    results.advancedSearchOpen = !results.advancedSearchOpen;

    if(!divStatus) {
      results.showHide = 'Hide Advanced Search';
    } else {
      results.showHide = 'Show Advanced Search';
    }
  };
}
