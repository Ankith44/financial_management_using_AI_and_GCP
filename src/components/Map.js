// src/components/Map.js
import React from 'react';
import { MapContainer, TileLayer, Polyline, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import shipIconUrl from './icons/ship.avif'; // Ship icon path
import flightIconUrl from './icons/flight.avif'; // Flight icon path

const shipIcon = new L.Icon({
  iconUrl: shipIconUrl,
  iconSize: [32, 32], // Size of the icon
});

const flightIcon = new L.Icon({
  iconUrl: flightIconUrl,
  iconSize: [32, 32], // Size of the icon
});

const Map = ({ sourceCoords, destinationCoords, transportMode }) => {
  const mapRef = React.useRef();

  React.useEffect(() => {
    if (mapRef.current && sourceCoords && destinationCoords) {
      const map = mapRef.current;

      // Clear existing routes
      map.eachLayer((layer) => {
        if (layer._url === undefined) {
          map.removeLayer(layer);
        }
      });

      // Create sea route with intermediate points to simulate sea travel
      const seaRoute = [
        sourceCoords,
        [52.0, 3.0], // Example intermediate point in the North Sea
        [51.5, -1.0], // Example intermediate point near UK coast
        destinationCoords,
      ];

      // Create air route directly between source and destination
      const airRoute = [sourceCoords, destinationCoords];

      // Choose the appropriate route based on the transport mode
      const route = transportMode === 'ship' ? seaRoute : airRoute;
      const icon = transportMode === 'ship' ? shipIcon : flightIcon;

      // Add markers for source and destination
      L.marker(sourceCoords, { icon }).addTo(map);
      L.marker(destinationCoords, { icon }).addTo(map);

      // Add routing layer
      L.polyline(route, { color: 'blue', weight: 4 }).addTo(map);
    }
  }, [sourceCoords, destinationCoords, transportMode]);

  return (
    <MapContainer center={[51.505, -0.09]} zoom={5} style={{ height: '400px', width: '100%' }} ref={mapRef}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
    </MapContainer>
  );
};

export default Map;
