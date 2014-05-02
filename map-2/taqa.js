
// Load the map
var map = L.mapbox.map('map', 'robertocarroll.taqa-3', {
    center: [25, -15],
    zoom: 2,
    minZoom: 2,
    maxZoom: 4,
    maxBounds: [[-85, -180.0],[85, 180.0]]
});

map.zoomControl.setPosition('bottomright');
map.scrollWheelZoom.disable();

// Load the geojson data from a file

var geoJsonData;
$.getJSON('taqa.geojson', function(data) {
        geoJsonData = data;
       
    // Add a marker layer
    var mainMarkers = L.mapbox.featureLayer().addTo(map);

    // set the lat/lon for marker layer
    mainMarkers.setGeoJSON(geoJsonData);



// Marker clicks: Listen for individual marker clicks



mainMarkers.on('click',function(e) {
        // Force the popup closed.
        e.layer.closePopup();

        
        $.when(closeWindow()).then(openWindow());

        var feature = e.layer.feature;
        var info = '<h2>' + feature.properties.title + '</h2>';
    
        $('#info').hide().html(info).fadeIn('slow');

    });


var closeWindow = function(){
    $('#close-button a')[0].click();
}   

var openWindow = function(){
    $('#trigger a')[0].click();
}       

map.on('click', closeWindow);

 // Filters 

var clicked;
var geoProperties;

 $(".toggle").click(function(event) {

    closeWindow();
    
    clicked = event.target.id;
           
    $(".toggle").removeClass('active');
     $(this).addClass('active');
    // The setFilter function takes a GeoJSON feature object
    // and returns true to show it or false to hide it.

    mainMarkers.setFilter(function(geoJsonData) {

        if (clicked == "filter-all") {
            return true;
        }

        else {

            geoProperties = geoJsonData.properties['type'];

            return geoProperties === clicked;

        }
        
    });

    return false;

});


}); // close the loading of the geojson 