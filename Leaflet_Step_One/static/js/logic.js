//Store API endpoint inside queryUrl
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson";
  
// Perform a GET request to the query URL
d3.json(queryUrl, function(data) {
    var earthquakes = L.geoJSON(data.features)
    console.log(earthquakes);
});

