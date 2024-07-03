// src/App.tsx
import React, { useState, useEffect } from 'react';
import Weather from './components/weather';
import AutosuggestComponent from './components/autosuggest';

const App: React.FC = () => {
    document.title = "K*tRegen"; // Setting document title

    const [addedLocation, setAddedLocation] = useState<string[]>(() => {
        const storedLocations = localStorage.getItem('addedLocations');
        return storedLocations ? JSON.parse(storedLocations) : ["Almere"];
    });

    const addLocation = (newLocation: string) => {
        setAddedLocation([...addedLocation, newLocation]);
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
            <h1>K*tRegen</h1>
            <div>
                {addedLocation.map((location, index) => (
                    <div key={index}>
                        <button className='buttonRemove' onClick={() => removeLocation(index)}>X</button>
                        <Weather location={location} />
                    </div>
                ))}
            </div>
            <button className='buttonAdd' onClick={() => {}}>
                Add Location
            </button>
            <AutosuggestComponent onLocationSelected={addLocation} />
        </div>
    );
};

export default App;
