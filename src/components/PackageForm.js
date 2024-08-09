// src/components/PackageForm.js
import React, { useState, useEffect } from 'react';

const hubs = {
  Heidelberg: 'Packstation 111',
  Karlsruhe: 'Packstation 231',
  Berlin: 'Packstation 321',
  Frankfurt: 'Packstation 890',
  London: 'Outlet 401',
  Manchester: 'Outlet 100',
  Birmingham: 'Outlet 903',
  Hyderabad: 'RGIA',
  Mumbai: 'Navi Mumbai',
  Delhi: 'Air Pack Delhi',
};

const PackageForm = ({ onPackageSubmit }) => {
  const [numPackages, setNumPackages] = useState(1);
  const [weight, setWeight] = useState(10);
  const [deliveryMode, setDeliveryMode] = useState('standard');
  const [sourceCity, setSourceCity] = useState('');
  const [destinationCity, setDestinationCity] = useState('');
  const [sourceHub, setSourceHub] = useState('');
  const [destinationHub, setDestinationHub] = useState('');

  useEffect(() => {
    setSourceHub(hubs[sourceCity] || '');
    setDestinationHub(hubs[destinationCity] || '');
  }, [sourceCity, destinationCity]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const packageData = { numPackages, weight, deliveryMode, sourceCity, sourceHub, destinationCity, destinationHub };
    console.log('Submitting package data:', packageData);
    onPackageSubmit(packageData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Number of Packages (1-50):
        <input type="number" value={numPackages} min="1" max="50" onChange={e => setNumPackages(e.target.value)} />
      </label>
      <br />
      <label>
        Weight (tons):
        <select value={weight} onChange={e => setWeight(e.target.value)}>
          <option value="10">10</option>
          <option value="11">11</option>
          <option value="12">12</option>
          {/* Add more options as needed */}
          <option value="50">50</option>
        </select>
      </label>
      <br />
      <label>
        Delivery Mode:
        <select value={deliveryMode} onChange={e => setDeliveryMode(e.target.value)}>
          <option value="standard">Standard</option>
          <option value="express">Express</option>
        </select>
      </label>
      <br />
      <label>
        Source City:
        <input type="text" value={sourceCity} onChange={e => setSourceCity(e.target.value)} />
      </label>
      <br />
      <label>
        Source Hub:
        <input type="text" value={sourceHub} readOnly />
      </label>
      <br />
      <label>
        Destination City:
        <input type="text" value={destinationCity} onChange={e => setDestinationCity(e.target.value)} />
      </label>
      <br />
      <label>
        Destination Hub:
        <input type="text" value={destinationHub} readOnly />
      </label>
      <br />
      <button type="submit">Generate</button>
    </form>
  );
};

export default PackageForm;
