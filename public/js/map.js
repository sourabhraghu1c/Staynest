// Initialize the HERE Maps Platform with your API Key
const platform = new H.service.Platform({
    apikey: mapApi,
});

// Create default layers for the map
const defaultLayers = platform.createDefaultLayers();

// Initialize the map and set it to a default location
const mapContainer = document.getElementById("map");
const map = new H.Map(mapContainer, defaultLayers.vector.normal.map, {
    center: { lat: 22.7196, lng: 75.8577 }, // Default to Indore
    zoom: 11,
    pixelRatio: window.devicePixelRatio || 1,
});

// Add resize listener to ensure the map resizes with the container
window.addEventListener("resize", () => map.getViewPort().resize());

// Enable map interactivity (pan, zoom, etc.)
const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

// Add default UI components (zoom buttons, scalebar, etc.)
const ui = H.ui.UI.createDefault(map, defaultLayers);

// Holds a reference to any infobubble opened
let bubble;

// Function to open or update an infobubble
function openBubble(position, text) {
  if (!bubble) {
    bubble = new H.ui.InfoBubble(position, { content: text });
    ui.addBubble(bubble);
  } else {
    bubble.setPosition(position);
    bubble.setContent(text);
    bubble.open();
  }
}

// // Function to add markers to the map for each location
function addLocationsToMap(locations) {
  const group = new H.map.Group();

  locations.forEach((location) => {
    const marker = new H.map.Marker(location.position);
    marker.label = location.address.label;
    group.addObject(marker);
  });

  group.addEventListener(
    "tap",
    (evt) => {
      map.setCenter(evt.target.getGeometry());
      openBubble(evt.target.getGeometry(), evt.target.label);
    },
    false
  );

  map.addObject(group);
  map.setCenter(group.getBoundingBox().getCenter());
}

// Function to geocode a location and display results
function geocodeLocation(query) {
  const geocoder = platform.getSearchService();
  geocoder.geocode(
    { q: query },
    (result) => {
      const locations = result.items;
      addLocationsToMap(locations);
    },
    (error) => {
      alert("Error fetching location details: " + error);
    }
  );
}


// Initial call to move the map to Indore and geocode its location
geocodeLocation(address);
