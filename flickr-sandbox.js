// add dummy photo data - for testing ng-repeat

// map is 100% of page and sidebar is transparent - map visible underneath
// be able to scroll sidebar without map moving
// be able to manually adjust the width of the sidebar 

  // <ul>
  //   <li ng-repeat="image in images">
  //     <img ng-src="{{image.thumbnail}}" alt="{{image.description}}">
  //   </li>
  // </ul>

// http://api.flickr.com/services/rest/?&method=flickr.photos.search
//   &api_key=[your api key here]
//   &user_id=[your user id here]
//   &format=json
//   &per_page=500

     // *extras: geo,tags, date_taken, path_alias, url_sq, url_q

     // URL: https://api.flickr.com/services/rest/
     // ?method=flickr.photos.search
     // &api_key=a8faad8e29a6cfb369a1133d2020ffaf
     // &tags=%27eastern+sierra%27%2C+snow
     // &tag_mode=all
     // &has_geo=1
     // &extras=geo%2Ctags%2C+date_taken%2Cpath_alias%2C+url_sq%2C+url_q&per_page=
     // &format=json
     // &nojsoncallback=1
     // &api_sig=55a4f7f41a3b405d30120bec519036e6


      { 
        "id": "22398481310",
        "owner": "11420421@N06", 
        "secret": "98717d3d71", 
        "server": "5658", 
        "farm": 6, 
        "title": "Convicted", 
        "ispublic": 1, 
        "isfriend": 0, 
        "isfamily": 0, 
        "datetaken": "2015-10-18 14:57:08", 
        "datetakengranularity": 0, 
        "datetakenunknown": 0, 
        "latitude": 37.594563, 
        "longitude": -118.851762, 
        "accuracy": 16, 
        "context": 0, 
        "place_id": "KIW949xQUL.Wj4hEhw", 
        "woeid": "12587695", 
        "geo_is_family": 0, 
        "geo_is_friend": 0, 
        "geo_is_contact": 0, 
        "geo_is_public": 1, 
        
        "tags": "longexposure autumn sky mountain lake inspiration snow reflection fall nature water beautiful clouds landscape outdoors morninglight still lowlight solitude shadows fallcolors exploring details relaxing earlymorning peaceful calm adventure autumncolors invigorating naturephotography newday gulllake easternsierra 2015 upearly landscapephotography junelakeloop mountainpeak smoothwater verticalimage newbeginings fallcolorstrip karltonhuber nikond750",

        "url_sq": "https:\/\/farm6.staticflickr.com\/5658\/22398481310_98717d3d71_s.jpg", 
        "height_sq": 75, 
        "width_sq": 75, 

        // "url_t": "https:\/\/farm6.staticflickr.com\/5658\/22398481310_98717d3d71_t.jpg", 
        // "height_t": 71, 
        // "width_t": 100, 

        // "url_s": "https:\/\/farm6.staticflickr.com\/5658\/22398481310_98717d3d71_m.jpg", 
        // "height_s": "169", 
        // "width_s": "240", 

        "url_q": "https:\/\/farm6.staticflickr.com\/5658\/22398481310_98717d3d71_q.jpg", 
        "height_q": "150", 
        "width_q": "150", 

        // "url_m": "https:\/\/farm6.staticflickr.com\/5658\/22398481310_98717d3d71.jpg", 
        // "height_m": "353", 
        // "width_m": "500", 

        // "url_n": "https:\/\/farm6.staticflickr.com\/5658\/22398481310_98717d3d71_n.jpg", 
        // "height_n": "226", 
        // "width_n": "320", 

        // "url_z": "https:\/\/farm6.staticflickr.com\/5658\/22398481310_98717d3d71_z.jpg", 
        // "height_z": "452", 
        // "width_z": "640", 

        // "url_c": "https:\/\/farm6.staticflickr.com\/5658\/22398481310_98717d3d71_c.jpg", 
        // "height_c": "565", 
        // "width_c": "800", 

        // "url_l": "https:\/\/farm6.staticflickr.com\/5658\/22398481310_98717d3d71_b.jpg", 
        // "height_l": "723", 
        // "width_l": "1024", 

        "pathalias": "process21_calvin" },


///////////////////////////////////////////////
////this all relates to a different API Call///////
////////////////////////////////////////////////
var photos = [];
var addPhoto = function(photoObj){
  var dataObj = {};
  dataObj.tags = [];

  var getTags = function(photo){
    for (var i = 0; i < photo.photo.tags.tag.length; i++){
     dataObj.tags.push(photo.photo.tags.tag[i].raw) 
    }
  };
  getTags(photoObj);

  dataObj.img_src = "http://farm" + photo.photo.farm + ".static.flickr.com/" + photo.photo.server + "/" + photo.photo.id + "_" + photo.photo.secret + "_m.jpg";
  dataObj.id = photo.photo.id;
  dataObj.title = photo.photo.title._content;
  dataObj.taken = photo.photo.dates.taken;
  dataObj.latitude = photo.photo.location.latitude;
  dataObj.longitude = photo.photo.location.longitude;
  dataObj.url = photo.photo.urls.url[0]._content;

  dataObj.locality = photo.photo.location.locality._content;
  dataObj.locality_id = photo.photo.location.locality.place_id;

  dataObj.county = photo.photo.location.county._content;
  dataObj.county_id = photo.photo.location.county.place_id;

  dataObj.region = photo.photo.location.region._content;
  dataObj.region_id = photo.photo.location.region.place_id;

  dataObj.country = photo.photo.location.country._content;
  dataObj.country_id = photo.photo.location.country.place_id;
  
  photos.push(dataObj);
};

for (var i = 0; i < rawphotos.length; i++){
    addPhoto(rawphotos[i])
}

var img_src =  "http://farm" + photo.photo.farm + ".static.flickr.com/" + photo.photo.server + "/" + photo.photo.id + "_" + photo.photo.secret + "_m.jpg";
var id = photo.photo.id;
var title = photo.photo.title._content;
var taken = photo.photo.dates.taken;
var latitude = photo.photo.location.latitude;
var longitude = photo.photo.location.longitude;
var url = photo.photo.urls.url[0]._content;
var getTags = function(photo){
  var tags = [];
  for (var i = 0; i < photo.photo.tags.tag.length; i++){
   tg.push(photo.photo.tags.tag[i].raw) 
 }
  return tags;
};
var locality = {
  locality: photo.photo.location.locality._content,
  locality_id: photo.photo.location.locality.place_id
}
var county = {
  county: photo.photo.location.county._content,
  county_id: photo.photo.location.county.place_id
};
var region = {
  region: photo.photo.location.region._content,
  region_id: photo.photo.location.region.place_id
}
var country = {
  country: photo.photo.location.country._content,
  country_id: photo.photo.location.country.place_id
}
////////////////////
///////////example////////
//////////////////////////
var photo = {
  "photo": { 
    "id": "4919288182", 
    "secret": "d485356e84", 
    "server": "4119", 
    "farm": 5, 
    "dateuploaded": "1282544703", 
    "isfavorite": 0, 
    "license": 0, 
    "safety_level": 0, 
    "rotation": 0, 
    "originalsecret": "50a6ae49b1", 
    "originalformat": "jpg", 
    "owner": { 
      "nsid": "44695308@N00", 
      "username": "el daybeh", 
      "realname": "Davey Gonzalez", 
      "location": "los angeles, usa", 
      "iconserver": 58, 
      "iconfarm": 1, 
      "path_alias": "daveyg" 
      }, 
    "title": { 
      "_content": "Mammoth Lakes, CA" 
      }, 
    "description": { 
      "_content": "" 
      }, 
    "visibility": { 
      "ispublic": 1, 
      "isfriend": 0, 
      "isfamily": 0 
      }, 
    "dates": { 
      "posted": "1282544703", 
      "taken": "2010-08-21 09:31:02", 
      "takengranularity": 0, 
      "takenunknown": 0, 
      "lastupdate": "1358055265" 
    }, 
    "views": "132", 
    "editability": { 
      "cancomment": 0, 
      "canaddmeta": 0 
    }, 
    "publiceditability": { 
      "cancomment": 1, 
      "canaddmeta": 0 
    }, 
    "usage": { 
      "candownload": 1, 
      "canblog": 0, 
      "canprint": 0, 
      "canshare": 1 
    }, 
    "comments": { 
      "_content": 0 
      }, 
    "notes": { 
      "note": [
        
      ] }, 
    "people": { 
      "haspeople": 0 
      }, 
    "tags": { 
      "tag": [
        { "id": "1869273-4919288182-340820", "author": "44695308@N00", "authorname": "el daybeh", "raw": "Eastern Sierra", "_content": "easternsierra", "machine_tag": 0 },
        { "id": "1869273-4919288182-32471", "author": "44695308@N00", "authorname": "el daybeh", "raw": "Mammoth Lakes", "_content": "mammothlakes", "machine_tag": 0 },
        { "id": "1869273-4919288182-10632260", "author": "44695308@N00", "authorname": "el daybeh", "raw": "Mammoth Lakes, California", "_content": "mammothlakescalifornia", "machine_tag": 0 },
        { "id": "1869273-4919288182-4959", "author": "44695308@N00", "authorname": "el daybeh", "raw": "hiking", "_content": "hiking", "machine_tag": 0 },
        { "id": "1869273-4919288182-29215289", "author": "44695308@N00", "authorname": "el daybeh", "raw": "Twin Lakes Campground", "_content": "twinlakescampground", "machine_tag": 0 },
        { "id": "1869273-4919288182-152950", "author": "44695308@N00", "authorname": "el daybeh", "raw": "Mammoth Mountain", "_content": "mammothmountain", "machine_tag": 0 },
        { "id": "1869273-4919288182-27178225", "author": "44695308@N00", "authorname": "el daybeh", "raw": "Mammoth Mountain trail", "_content": "mammothmountaintrail", "machine_tag": 0 },
        { "id": "1869273-4919288182-1178574", "author": "44695308@N00", "authorname": "el daybeh", "raw": "bottomless pit", "_content": "bottomlesspit", "machine_tag": 0 },
        { "id": "1869273-4919288182-247463", "author": "44695308@N00", "authorname": "el daybeh", "raw": "green hat", "_content": "greenhat", "machine_tag": 0 },
        { "id": "1869273-4919288182-702830", "author": "44695308@N00", "authorname": "el daybeh", "raw": "capilene", "_content": "capilene", "machine_tag": 0 },
        { "id": "1869273-4919288182-60042999", "author": "44695308@N00", "authorname": "el daybeh", "raw": "Twin Lakes falls", "_content": "twinlakesfalls", "machine_tag": 0 },
        { "id": "1869273-4919288182-25752", "author": "44695308@N00", "authorname": "el daybeh", "raw": "Twin Lakes", "_content": "twinlakes", "machine_tag": 0 },
        { "id": "1869273-4919288182-788950", "author": "44695308@N00", "authorname": "el daybeh", "raw": "Inyo National Forest", "_content": "inyonationalforest", "machine_tag": 0 },
        { "id": "1869273-4919288182-42167958", "author": "44695308@N00", "authorname": "el daybeh", "raw": "Inyo NF", "_content": "inyonf", "machine_tag": 0 },
        { "id": "1869273-4919288182-11580", "author": "44695308@N00", "authorname": "el daybeh", "raw": "National Forest", "_content": "nationalforest", "machine_tag": 0 },
        { "id": "1869273-4919288182-376546", "author": "44695308@N00", "authorname": "el daybeh", "raw": "Inyo", "_content": "inyo", "machine_tag": 0 },
        { "id": "1869273-4919288182-155146", "author": "44695308@N00", "authorname": "el daybeh", "raw": "hiking trail", "_content": "hikingtrail", "machine_tag": 0 },
        { "id": "1869273-4919288182-12349", "author": "44695308@N00", "authorname": "el daybeh", "raw": "trail", "_content": "trail", "machine_tag": 0 }
      ] }, 
    "location": { 
      "latitude": 37.623617, 
      "longitude": -119.013540, 
      "accuracy": 15, 
      "context": 0, 
      "locality": { 
        "_content": "Mammoth Lakes", 
        "place_id": "QWhYY7BTVr60xFAC", 
        "woeid": "2444595" 
      }, 
      "county": { 
        "_content": "Mono", 
        "place_id": "KIW949xQUL.Wj4hEhw", 
        "woeid": "12587695" 
      }, 
      "region": { 
        "_content": "California", 
        "place_id": "NsbUWfBTUb4mbyVu", 
        "woeid": "2347563" 
      }, 
      "country": { 
        "_content": "United States", 
        "place_id": "nz.gsghTUb4c2WAecA", 
        "woeid": "23424977" 
      }, 
      "place_id": "QWhYY7BTVr60xFAC", 
      "woeid": "2444595" 
    }, 
    "geoperms": { 
      "ispublic": 1, 
      "iscontact": 0, 
      "isfriend": 0, 
      "isfamily": 0 
    }, 
    "urls": { 
      "url": [
        { "type": "photopage", "_content": "https:\/\/www.flickr.com\/photos\/daveyg\/4919288182\/" }
      ] 
    }, 
    "media": "photo" }, 
    "stat": "ok" }


/////////
/**
http://www.lovelldsouza.com/webdev/flickr-to-website/
 * Function to get images from Flickr
 *
 * @setId The flickr set the images belong to.
 */  
function getImgs(setId) {
  var URL = "https://api.flickr.com/services/rest/" +  // Wake up the Flickr API gods.
    "?method=flickr.photosets.getPhotos" +  // Get photo from a photoset. http://www.flickr.com/services/api/flickr.photosets.getPhotos.htm
    "&api_key={{INSERT YOUR API KEY HERE}}" +  // API key. Get one here: http://www.flickr.com/services/apps/create/apply/
    "&photoset_id=" + setId +  // The set ID.
    "&privacy_filter=1" +  // 1 signifies all public photos.
    "&per_page=20" + // For the sake of this example I am limiting it to 20 photos.
    "&format=json&nojsoncallback=1";  // Er, nothing much to explain here.

  // See the API in action here: http://www.flickr.com/services/api/explore/flickr.photosets.getPhotos
  $.getJSON(URL, function(data){
    $.each(data.photoset.photo, function(i, item){
      // Creating the image URL. Info: http://www.flickr.com/services/api/misc.urls.html
      var img_src = "http://farm" + item.farm + ".static.flickr.com/" + item.server + "/" + item.id + "_" + item.secret + "_m.jpg";
      var img_thumb = $("<img/>").attr("src", img_src).css("margin", "8px")
      $(img_thumb).appendTo("#flickr-images");
    });
  });
}

$(document).ready(function() {
  getImgs("72157632700264359"); // Call the function!
});



