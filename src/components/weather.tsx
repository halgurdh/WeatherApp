import React, { useState, useEffect } from 'react';
import '../App.css';

interface WeatherData {
    location: {
        name: string;
        country: string;
    };
    forecast: {
        forecastday: {
            date: string;
            day: {
                avgtemp_c: number;
                condition: {
                    text: string;
                    icon: string;
                };
                totalprecip_mm: number;
                maxwind_kph: number;
                totalsnow_cm: number;
            };
        }[];
    };
}

interface WeatherProps {
    location: string;
}

const Weather: React.FC<WeatherProps>  = ({location}) => {
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchWeatherData = async (location:string) => {
            try {
                const forecastURL = "https://api.weatherapi.com/v1/forecast.json?key=" + import.meta.env.VITE_API_KEY_WEATHER + "&q="+ location +"&days=10&aqi=no&alerts=no";

                const response = await fetch(forecastURL);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data: WeatherData = await response.json();
                setWeatherData(data);
                setLoading(false);
            } catch (error:any) {
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

    if (!weatherData) {
        return null;
    }

    const { name, country } = weatherData.location;

    return (
        <div className="weather-info">
        <h2>10-Day Weather Forecast for {name}, {country}</h2>
        <div className="forecast">
            {weatherData.forecast.forecastday.map((day, index) => {
                if ((day.day.condition.text.includes("Sunny") && day.day.maxwind_kph < 25) 
                    || (day.day.totalprecip_mm == 0 && day.day.totalsnow_cm == 0) && day.day.maxwind_kph < 25) {
                    return (
                        <div key={index} className="forecast-day sunny">
                            <h3>{new Date(day.date).toLocaleDateString()}</h3>
                            <h3>{new Date(day.date).toLocaleString('default', { weekday: 'long' })}</h3>
                            <img src={day.day.condition.icon} alt={day.day.condition.text} />
                            <p>Rain: {day.day.totalprecip_mm} mm</p>
                            <p>Temperature: {day.day.avgtemp_c}°C</p>
                            <p>Condition: {day.day.condition.text}</p>
                        </div>
                    );
                } else {
                    return (
                        <div key={index} className="forecast-day">
                            <h3>{new Date(day.date).toLocaleDateString()}</h3>
                            <h3>{new Date(day.date).toLocaleString('default', { weekday: 'long' })}</h3>
                            <img src={day.day.condition.icon} alt={day.day.condition.text} />
                            <p>Rain: {day.day.totalprecip_mm} mm</p>
                            <p>Temperature: {day.day.avgtemp_c}°C</p>
                            <p>Condition: {day.day.condition.text}</p>
                        </div>
                    );
                }
            })}
        </div>
    </div>
    );
};

export default Weather;