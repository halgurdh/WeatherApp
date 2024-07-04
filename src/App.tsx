// src/App.tsx
import React, { useState, useEffect } from 'react';
import Weather from './components/weather';
import AutosuggestComponent from './components/autosuggest';
import Footer from './components/footer';
import Header from './components/header';

const App: React.FC = () => {
    document.title = "WeatherApp"; // Setting document title

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
            <div className="App">
                <Header/>
                <h1>WeatherApp</h1>
                <h3>At home and it rains? Find several cities you can go to for nicer weather.</h3>
                <div>
                    {addedLocation.map((location, index) => (
                        <div key={index}>
                            <button title="Remove" className='buttonRemove' onClick={() => removeLocation(index)}>X</button>
                            <Weather location={location} />
                        </div>
                    ))}
                </div>

                <AutosuggestComponent onLocationSelected={addLocation} />
                <Footer/>
            </div>
    );
};

export default App;
