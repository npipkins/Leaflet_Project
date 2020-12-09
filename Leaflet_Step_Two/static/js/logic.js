// Create a map object
var myMap = L.map("map", {
    center: [37.09, -95.71],
    zoom: 5
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
  
// Perform a GET request to the query URL
d3.json(queryUrl, function(data) {
    console.log(data);

// Loop thru the earthquaks data and create a color for a circle dependent on earthquaks' deepths
    features.forEach(function(feature){
    
    var color = "";

    if(features.geometry.coordinates[2] > 500){
         color = "red";
        }
    else if(features.geometry.coordinates[2] > 98){
        color = "orange";
        }
    else if(features.geometry.coordinates[2] > 18){
        color = "yellow";
        }  
    else{
        color = "green"
        };

    // add circles to map
    L.circle([features.geometry.coordinates[1], features.geometry.coordinates[0]],{
    fillOpacity: 0.75,
    color: "black",
    fillColor: color
    }).addTo(myMap);
    })
});




  