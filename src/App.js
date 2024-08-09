// src/App.js
import 'leaflet/dist/leaflet.css';

import React, { useState } from 'react';
import axios from 'axios';
import PackageForm from './components/PackageForm';
import Map from './components/Map';
import geolib from 'geolib';

const App = () => {
  const [sourceCoords, setSourceCoords] = useState(null);
  const [destinationCoords, setDestinationCoords] = useState(null);
  const [transportMode, setTransportMode] = useState('flight');
  const [shipDistance, setShipDistance] = useState(null);
  const [flightDistance, setFlightDistance] = useState(null);

  const handlePackageSubmit = async (packageData) => {
    console.log('Submitting package data:', packageData);

    try {
      const response = await axios.post('http://localhost:5000/api/packages', packageData);
      console.log('Package Data Saved:', response.data);

      const sourceCoordsMap = {
        Heidelberg: [49.3988, 8.6724],
        Karlsruhe: [49.0069, 8.4037],
        Berlin: [52.5200, 13.4050],
        Frankfurt: [50.1109, 8.6821],
      };

      const destinationCoordsMap = {
        London: [51.5074, -0.1278],
        Manchester: [53.4808, -2.2426],
        Birmingham: [52.4862, -1.8904],
      };

      const sourceCoords = sourceCoordsMap[packageData.sourceCity];
      const destinationCoords = destinationCoordsMap[packageData.destinationCity];

      setSourceCoords(sourceCoords);
      setDestinationCoords(destinationCoords);

      // Determine transport mode
      if (packageData.weight <= 10) {
        setTransportMode('flight');
      } else {
        setTransportMode('ship');
      }

      // Calculate distances
      const shipDistance = geolib.getDistance(sourceCoords, destinationCoords) / 1000; // Convert to kilometers
      const flightDistance = geolib.getDistance(sourceCoords, destinationCoords) / 1000; // Convert to kilometers
      setShipDistance(shipDistance);
      setFlightDistance(flightDistance);
    } catch (error) {
      console.error('Error saving package data:', error);
    }
  };

  return (
    <div>
      <h1>Worldwide Delivery System</h1>
      <PackageForm onPackageSubmit={handlePackageSubmit} />
      {transportMode === 'flight' && (
        <p>
          Flight distance: {flightDistance ? `${flightDistance.toFixed(2)} kilometers` : 'Unable to calculate'}
        </p>
      )}
      {transportMode === 'ship' && (
        <p>
          Ship distance: {shipDistance ? `${shipDistance.toFixed(2)} kilometers` : 'Unable to calculate'}
        </p>
      )}
      <Map sourceCoords={sourceCoords} destinationCoords={destinationCoords} transportMode={transportMode} />
    </div>
  );
};

export default App;
