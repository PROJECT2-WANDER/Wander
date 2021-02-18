mapboxgl.accessToken = 'pk.eyJ1Ijoib21nbiIsImEiOiJja2w1Z2FkMGoxa3phMm5vNG5sY2ZmbmJoIn0.Bbu_dXdzyIDaG9jUy6LYhw'; 

const map = new mapboxgl.Map({
  container: 'map', // container ID
  style: 'mapbox://styles/mapbox/dark-v10', // style URL
  center: [13.405, 52.52], // starting position [lng, lat]
  zoom: 9 // starting zoom
});

const nav = new mapboxgl.NavigationControl(); 
map.addControl(nav, 'top-left'); 

// Marker
var marker = new mapboxgl.Marker() // initialize a new marker
  .setLngLat([-122.25948, 37.87221]) // Marker [lng, lat] coordinates
  .addTo(map); // Add the marker to the map

// Searchbar
  var geocoder = new MapboxGeocoder({ // Initialize the geocoder
    accessToken: mapboxgl.accessToken, // Set the access token
    mapboxgl: mapboxgl, // Set the mapbox-gl instance
    marker: false, // Do not use the default marker style
    placeholder: 'Search for places'
  });
  
  // Add the geocoder to the map
  map.addControl(geocoder);
 

  
  //marker 

  // After the map style has loaded on the page,
// add a source layer and default styling for a single point
map.on('load', function() {
  map.addSource('single-point', {
    type: 'geojson',
    data: {
      type: 'FeatureCollection',
      features: []
    }
  });

  map.addLayer({
    id: 'point',
    source: 'single-point',
    type: 'circle',
    paint: {
      'circle-radius': 10,
      'circle-color': '#448ee4'
    }
  });

  // Listen for the `result` event from the Geocoder
  // `result` event is triggered when a user makes a selection
  //  Add a marker at the result's coordinates
  geocoder.on('result', function(e) {
    map.getSource('single-point').setData(e.result.geometry);
    console.log(e.result);

 

    const long = e.result.geometry.coordinates[0];
    const lat = e.result.geometry.coordinates[1]; 
    const name = e.result.text; 
    const address = e.result.place_name; 
    const category = e.result.properties.category; 
    document.querySelector('#saveLocation').onclick = function (){
      console.log(long, lat) 
      axios.post('http://localhost:3000/addPlace', {coordinates: [long, lat], name: name, address: address, category: category} )
      .then(response => {
        showMarkers(); 
      })

      .catch(err => console.log(err))
    }


  });
});




function showMarkers(){
  axios.get('http://localhost:3000/api/favoritesPlaces').then(response =>{
  const places = response.data.data; 
  console.log(places); 
  places.forEach(place => {
    new mapboxgl.Marker({
      scale: 1,
      color: 'red',
  })
      .setLngLat(place.coordinates)
      .addTo(map)
      .on('dragend', (data) => {
          console.log(data);
      })
  })
})
}

showMarkers(); 


//to uptade the markers with the tag
//









  