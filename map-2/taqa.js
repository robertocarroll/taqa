
// Load the geojson data from a file

var geoJsonData;
$.getJSON('taqa.geojson', function(data) {
    geoJsonData = data;

   


// Load the map
var map = L.mapbox.map('map', 'robertocarroll.taqa-3', {

    center: [25, -15],
    zoom: 2,
    minZoom: 2,
    maxZoom: 5,
    maxBounds: [[-85, -180.0],[85, 180.0]]
});


// Add a marker layer
var mainMarkers = L.mapbox.markerLayer();

// set the lat/lon for marker layer
mainMarkers.setGeoJSON(geoJsonData);

map.addLayer(mainMarkers);


}); // close the loading of the geojson 