// src/App.tsx
import React, { useState, useEffect } from 'react';
import Weather from './components/weather';
import AutosuggestComponent from './components/autosuggest';
import Footer from './components/footer';
import Header from './components/header';

const App: React.FC = () => {
    document.title = "WeatherCompare"; // Setting document title

    const [addedLocation, setAddedLocation] = useState<string[]>(() => {
        const storedLocations = localStorage.getItem('addedLocations');
        return storedLocations ? JSON.parse(storedLocations) : ["Almere"];
    });

    const addLocation = (newLocation: string) => {
        setAddedLocation([...addedLocation, newLocation]);
    }

    const moveLocationUp = (index:number) => {
        if (index === 0) return; // Already at the top, can't move further up

        const updatedLocations = [...addedLocation];
        const temp = updatedLocations[index - 1];
        updatedLocations[index - 1] = updatedLocations[index];
        updatedLocations[index] = temp;

        setAddedLocation(updatedLocations);
    }

    const moveLocationDown = (index:number) => {
        if (index === addedLocation.length - 1) return; // Already at the bottom, can't move further down

        const updatedLocations = [...addedLocation];
        const temp = updatedLocations[index + 1];
        updatedLocations[index + 1] = updatedLocations[index];
        updatedLocations[index] = temp;

        setAddedLocation(updatedLocations);
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
        <Header />
        <h1>WeatherCompare</h1>
        <h3>At home and it rains? Find several cities you can go to for a nicer weather.</h3>
        <div>
            {addedLocation.map((location, index) => (
                <div className="weather-container">
                    <div className="container" key={index}>
                        <button title="Remove" className='buttonRemove' onClick={() => removeLocation(index)}>X</button>
                        <div className='upDown'>
                            {index === 0 && addedLocation.length > 1 && (
                                <button title="Down" onClick={() => moveLocationDown(index)}>DOWN</button>
                            )}
                            {index > 0 && index < addedLocation.length - 1 && (
                                <div>
                                    <button title="Up" onClick={() => moveLocationUp(index)}>UP</button>
                                    <button title="Down" onClick={() => moveLocationDown(index)}>DOWN</button>
                                </div>
                            )}
                            {index === addedLocation.length - 1 && addedLocation.length > 1 && (
                                <button title="Up" onClick={() => moveLocationUp(index)}>UP</button>
                            )}
                        </div>
                        <Weather location={location} />
                    </div>
                </div>

            ))}
        </div>
            <AutosuggestComponent onLocationSelected={addLocation} />
            <Footer/>
        </div>
    );
};

export default App;
