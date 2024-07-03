// src/App.tsx
import React, { useState, useEffect } from 'react';
import Weather from './components/weather';

const App: React.FC = () => {
  const [addedLocation, setAddedLocation] = useState<string[]>(() => {
      const storedLocations = localStorage.getItem('addedLocations');
      return storedLocations ? JSON.parse(storedLocations) : ["Almere"];
  });
  
    const addLocation = () => {
        const newLocation = prompt('Enter a location:');
        if (newLocation) {
            setAddedLocation([...addedLocation, newLocation]);
        }
    }

    const removeLocation = (index: number) => {
      const updatedLocations = addedLocation.filter((_, i) => i !== index);
      setAddedLocation(updatedLocations);
    }

	useEffect(() => {
        localStorage.setItem('addedLocations', JSON.stringify(addedLocation));
    }, [addedLocation]);

    return (
        <div>
            <h1>Weather App</h1>
            <div>
                {addedLocation.map((location, index) => (
                  <div>
                        <button className='buttonRemove' onClick={() => removeLocation(index)}>X</button>
                        <Weather key={index} location={location} />
                  </div>
                ))}
            </div>
            <button className='buttonAdd' onClick={addLocation}>Add Location</button>
        </div>
    );
};

export default App;
