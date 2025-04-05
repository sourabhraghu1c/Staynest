import { useEffect, useRef } from "react";

const Map = ({ address, apiKey }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (!window.H || !apiKey) {
      console.error("HERE Maps API key is required or script not loaded yet.");
      return;
    }

    const platform = new window.H.service.Platform({ apikey: apiKey });
    const defaultLayers = platform.createDefaultLayers();
    
    const map = new window.H.Map(
      mapRef.current,
      defaultLayers.vector.normal.map,
      {
        center: { lat: 22.7196, lng: 75.8577 }, // Default to Indore
        zoom: 11,
        pixelRatio: window.devicePixelRatio || 1,
      }
    );

    // Add behavior control
    const behavior = new window.H.mapevents.Behavior(new window.H.mapevents.MapEvents(map));

    // Add UI controls
    const ui = window.H.ui.UI.createDefault(map, defaultLayers);

    const addLocationsToMap = (locations) => {
  const group = new window.H.map.Group();

locations.forEach((location) => {
  // Define a custom SVG marker with a proper inverted drop shape
  const customIcon = new window.H.map.Icon(
    `<svg width="40" height="50" viewBox="0 0 40 50" xmlns="http://www.w3.org/2000/svg">
      <!-- Drop Shape -->
      <path d="M20,48 C34,30 38,22 38,14 A18,13 0 1 0 2,14 C2,22 6,30 20,48 Z" 
            fill="maroon" stroke="black" stroke-width="2"/>
      <!-- White Circle at the Top -->
      <circle cx="20" cy="14" r="6" fill="white"/>
    </svg>`,
    { anchor: { x: 20, y: 48 } } // Anchor at the pointed tip
  );

  const marker = new window.H.map.Marker(location.position, { icon: customIcon });
  marker.label = location.address.label;
  group.addObject(marker);
});




  group.addEventListener("tap", (evt) => {
    map.setCenter(evt.target.getGeometry());
    openBubble(evt.target.getGeometry(), evt.target.label);
  });

  map.addObject(group);
  map.setCenter(group.getBoundingBox().getCenter());
};


    // Function to display an info bubble
    const openBubble = (position, text) => {
      const bubble = new window.H.ui.InfoBubble(position, { content: text });
      ui.addBubble(bubble);
    };

    // Function to fetch geolocation based on address
    const geocodeLocation = (query) => {
      const geocoder = platform.getSearchService();
      geocoder.geocode(
        { q: query },
        (result) => {
          if (result.items.length > 0) {
            addLocationsToMap(result.items);
          } else {
            console.warn("No locations found for the given address.");
          }
        },
        (error) => {
          console.error("Error fetching location details: ", error);
        }
      );
    };

    // Fetch location based on provided address
    if (address) {
      geocodeLocation(address);
    }

    // Cleanup function to dispose of the map instance when component unmounts
    return () => map.dispose();
  }, [address, apiKey]);

  return <div className='map-container' ref={mapRef} style={{ width: "100%", height: "400px" }}></div>;
};

export default Map;

