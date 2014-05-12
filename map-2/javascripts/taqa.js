
// Load the map
var map = L.mapbox.map('map', 'robertocarroll.taqa-3', {
    center: [25, -15],
    zoom: 2,
    minZoom: 2,
    maxZoom: 4,
    maxBounds: [[-85, -180.0],[85, 180.0]]
});

// Customise some features
map.zoomControl.setPosition('bottomright');
map.scrollWheelZoom.disable();

// Load the geojson data from a file
var geoJsonData;

// Main data
var loadGeoJson =$.getJSON('taqa.geojson', function(data) {
    geoJsonData = data;
 }); // close the loading of the geojson  
       
// Add a marker layer
var mainMarkers = L.mapbox.featureLayer().addTo(map);

// set the lat/lon for marker layer
loadGeoJson.complete(function() {
  mainMarkers.setGeoJSON(geoJsonData);
});

// Create a custom icon for the main
var LeafIcon = L.Icon.extend({
                options: {                   
                    iconSize:     [32, 43],
                    shadowSize:   [32, 43],
                    iconAnchor:   [22, 42],
                    shadowAnchor: [22, 42],
                    className: 'taqa-custom-icon'
                }
            });

// Customise the marker layer

mainMarkers.on('layeradd', function(e) {
    var marker = e.layer,feature = marker.feature;
     
    // this is to get the correct marker icon depending on the type 
    s = feature.properties.type;
    customIcon = new LeafIcon({iconUrl: 'images/'+s+'-off.png',iconRetinaUrl: 'images/'+s+'@2x-off.png'});

    marker.setIcon(customIcon);

});

function resetMarkers() {

  mainMarkers.eachLayer(function(e) {
        s = e.feature.properties.type;
        customIcon = new LeafIcon({iconUrl: 'images/'+s+'-off.png',iconRetinaUrl: 'images/'+s+'@2x-off.png'});
        e.setIcon(customIcon);
  });

}

// Marker clicks: Listen for individual marker clicks
var clicked = "office";
var geoProperties;

mainMarkers.on('click',function(e) {

  resetMarkers();
  
  var marker = e.layer,feature = marker.feature;
       
  // this is to get the correct marker icon depending on the type 
  s = feature.properties.type;
  customIcon = new LeafIcon({iconUrl: 'images/'+s+'-hover.png',iconRetinaUrl: 'images/'+s+'@2x-hover.png'});
  marker.setIcon(customIcon);
    
    // Force the popup closed.
    e.layer.closePopup();

     $.when(closeWindow()).then(openWindow());

    var feature = e.layer.feature;
    var info =           feature.properties.image +
                '<h2>' + feature.properties.country + '</h2>' +
                '<h3 >' + feature.properties.title + '</h3>' +
                feature.properties.description;

    $('#info').hide().html(info).fadeIn('slow');

    map.panTo(e.layer.getLatLng());

});


var closeWindow = function(){
    $("#pop").css({ left: '-100%'});
}   

var openWindow = function(){
    $( "#pop" ).animate({
          left: 0
          }, 125, function() {
            // Animation complete.
          });
}       

map.on('click', closeWindow);

// Filters 
var setTheFilter = function(){
    mainMarkers.setFilter(function(geoJsonData) {

        geoProperties = geoJsonData.properties['type'];
        return geoProperties === clicked;
        
    });

    return false;
}   


$(".toggle").click(function(event) {

    closeWindow();
    
    clicked = event.target.id;
           
    $(".toggle").removeClass('active');
     $(this).addClass('active');
    
    // The setFilter function takes a GeoJSON feature object
    // and returns true to show it or false to hide it.

    setTheFilter ();

});


setTheFilter ();
