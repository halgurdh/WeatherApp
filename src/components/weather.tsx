import React, { useState, useEffect } from 'react';
import '../App.css';

interface WeatherData {
    latitude: number;
    longitude: number;
    daily: {
        time: string[];
        temperature_2m_max: number[];
        temperature_2m_min: number[];
        precipitation_sum: number[];
        windspeed_10m_max: number[];
    };
}

interface WeatherProps {
    location: string;
}

const Weather: React.FC<WeatherProps> = ({location}) => {
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [locationInfo, setLocationInfo] = useState<{name: string, country: string} | null>(null);

    const getDate = (date: Date) => {
        const yyyy = date.getFullYear().toString().substring(2);
        let mm: number = date.getMonth() + 1; // Months start at 0!
        let dd: number = date.getDate();
    
        return dd + '/' + mm + '/' + yyyy;
    }

    useEffect(() => {
        const fetchWeatherData = async (location: string) => {
            try {

                let newLocation = location.includes("-") ? location.substring(0, location.indexOf(" -")) : location;


                // First, get coordinates from location name
                const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(newLocation)}&count=1`;

                console.log(geoUrl);
                const geoResponse = await fetch(geoUrl);
                const geoData = await geoResponse.json();

                if (!geoData.results || geoData.results.length === 0) {
                    throw new Error(`Location not found`);
                }

                const { latitude, longitude, name, country } = geoData.results[0];
                setLocationInfo({ name, country });

                // Then, fetch weather data using coordinates
                const forecastURL = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,windspeed_10m_max&timezone=auto`;

                const response = await fetch(forecastURL);
                if (!response.ok) {
                    throw new Error(`Failed to fetch weather data`);
                }
                const data: WeatherData = await response.json();
                setWeatherData(data);
                setLoading(false);
            } catch (error: any) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchWeatherData(location);
    }, [location]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    if (!weatherData || !locationInfo) {
        return null;
    }

    const { name, country } = locationInfo;

    return (
        <div className="weather-info">
            <h2>7-Day Weather Forecast for {name}, {country}</h2>
            <div className="forecast">
                {weatherData.daily.time.map((day, index) => {
                    const avgTemp = (weatherData.daily.temperature_2m_max[index] + weatherData.daily.temperature_2m_min[index]) / 2;
                    const isSunny = avgTemp > 15 && avgTemp < 30 && weatherData.daily.precipitation_sum[index] <= 2 && weatherData.daily.windspeed_10m_max[index] < 30;
                    
                    return (
                        <div key={index} className={`forecast-day ${isSunny ? 'sunny' : ''}`}>
                            <h3>{getDate(new Date(day))}</h3>
                            <h3>{new Date(day).toLocaleString('default', { weekday: 'long' })}</h3>
                            <p>Rain: {weatherData.daily.precipitation_sum[index]} mm</p>
                            <p>Max Temperature: {weatherData.daily.temperature_2m_max[index]}°C</p>
                            <p>Min Temperature: {weatherData.daily.temperature_2m_min[index]}°C</p>
                            <p>Wind: {weatherData.daily.windspeed_10m_max[index]} km/h</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Weather;
