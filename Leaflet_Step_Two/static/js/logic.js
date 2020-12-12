// Create a map object
var myMap = L.map("map", {
    center: [14.60, 28.67],
    zoom: 2
});
  
// Add a tile layer
L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
    {
    maxZoom:18,
    id:"streets-v11",
    accessToken: API_KEY
    }).addTo(myMap);

//Store API endpoint inside queryUrl
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson";

function markerSize(mag){
    return mag * 3;
} 
// Perform a GET request to the query URL
d3.json(queryUrl, function(data) {

//add earthquakes
    L.geoJSON(data.features, {
        pointToLayer: function (feature, latlng){
            //switch fillColor
            var fillColor;
            switch (true) {
                case (feature.geometry.coordinates[2] > 500):
                    fillColor = 'red';
                    break;
                case (feature.geometry.coordinates[2] > 98):
                    fillColor = 'orange';
                    break;
                case (feature.geometry.coordinates[2] > 18):
                    fillColor = 'yellow';
                    break;
                default:
                    fillColor = 'green';
                    break;
            }
            //circleMarker
            return L.circleMarker(latlng, {
                radius: markerSize(feature.properties.mag),
                fillColor: fillColor,
                color: 'black',
                weight: 1,
                fillOpacity: 0.75
            })
        }
    }).addTo(myMap)
});
