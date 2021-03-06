// Load the map 
var map = L.mapbox.map('map', 'robertocarroll.taqa-2', {

    center: [25, -15],
    zoom: 2,
    minZoom: 2,
    maxZoom: 5,
    maxBounds: [[-85, -180.0],[85, 180.0]]
});

var activeCountries = L.mapbox.tileLayer('robertocarroll.taqa');
activeCountries.addTo(map);

var grid = L.mapbox.gridLayer('robertocarroll.taqa');

grid.addTo(map);

grid
    .on('mousemove',function(o) {
        document.getElementById('info').innerHTML = (o.data.scalerank);
    }).on('mouseout', function(o) {
        document.getElementById('info').innerHTML = '';
    });