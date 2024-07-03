// src/components/Autosuggest.tsx
import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';

interface AutosuggestProps {
    onLocationSelected: (location: string) => void;
}

interface AutosuggestState {
    value: string;
    suggestions: string[];
}

class AutosuggestComponent extends Component<AutosuggestProps, AutosuggestState> {
    state: AutosuggestState = {
        value: '',
        suggestions: [],
    };

    // Mock data for suggestions (you would fetch this from an API in a real app)
    locations = [
        "Beijing - China",
        "New Delhi - India",
        "Tokyo - Japan",
        "Moscow - Russia",
        "Jakarta - Indonesia",
        "Cairo - Egypt",
        "Dhaka - Bangladesh",
        "Bangkok - Thailand",
        "Tehran - Iran",
        "Islamabad - Pakistan",
        "Manila - Philippines",
        "Ankara - Turkey",
        "Baku - Azerbaijan",
        "Kabul - Afghanistan",
        "Baghdad - Iraq",
        "Riyadh - Saudi Arabia",
        "Kiev - Ukraine",
        "Addis Ababa - Ethiopia",
        "Kuala Lumpur - Malaysia",
        "Mexico City - Mexico",
        "Buenos Aires - Argentina",
        "Brasília - Brazil",
        "Santiago - Chile",
        "Lima - Peru",
        "Bogotá - Colombia",
        "Caracas - Venezuela",
        "Quito - Ecuador",
        "La Paz - Bolivia",
        "Montevideo - Uruguay",
        "Asunción - Paraguay",
        "Georgetown - Guyana",
        "Paramaribo - Suriname",
        "Washington - United States",
        "Ottawa - Canada",
        "London - United Kingdom",
        "Paris - France",
        "Berlin - Germany",
        "Madrid - Spain",
        "Rome - Italy",
        "Athens - Greece",
        "Amsterdam - Netherlands",
        "Brussels - Belgium",
        "Vienna - Austria",
        "Stockholm - Sweden",
        "Copenhagen - Denmark",
        "Oslo - Norway",
        "Helsinki - Finland",
        "Warsaw - Poland",
        "Budapest - Hungary",
        "Prague - Czech Republic",
        "Bucharest - Romania",
        "Sofia - Bulgaria",
        "Belgrade - Serbia",
        "Zagreb - Croatia",
        "Skopje - North Macedonia",
        "Tirana - Albania",
        "Ljubljana - Slovenia",
        "Bratislava - Slovakia",
        "Sarajevo - Bosnia and Herzegovina",
        "Podgorica - Montenegro",
        "Reykjavik - Iceland",
        "Dublin - Ireland",
        "Valletta - Malta",
        "Nicosia - Cyprus",
        "Vaduz - Liechtenstein",
        "Bern - Switzerland",
        "Luxembourg City - Luxembourg",
        "San Marino - San Marino",
        "Vatican City - Vatican City",
        "Monaco - Monaco",
        "Andorra la Vella - Andorra",
        "Gibraltar - Gibraltar",
        "Nuuk - Greenland (Denmark)",
        "Basseterre - Saint Kitts and Nevis",
        "Nassau - Bahamas",
        "Bridgetown - Barbados",
        "Saint John's - Antigua and Barbuda",
        "Kingstown - Saint Vincent and the Grenadines",
        "Castries - Saint Lucia",
        "Roseau - Dominica",
        "Port of Spain - Trinidad and Tobago",
        "Saint George's - Grenada",
        "Kingston - Jamaica",
        "Belmopan - Belize",
        "Panama City - Panama",
        "San José - Costa Rica",
        "Tegucigalpa - Honduras",
        "Guatemala City - Guatemala",
        "San Salvador - El Salvador",
        "Managua - Nicaragua",
        "San Juan - Puerto Rico (US)",
        "Santo Domingo - Dominican Republic",
        "Port-au-Prince - Haiti",
        "Havana - Cuba",
        "Mexico City - Mexico",
        "Kingston - Jamaica",
        "San José - Costa Rica",
        "Guatemala City - Guatemala",
        "San Salvador - El Salvador",
        "Managua - Nicaragua"
    ];

    getSuggestions = (value: string) => {
        const inputValueLowerCase = value.trim().toLowerCase();
        return this.locations.filter(location =>
            location.toLowerCase().includes(inputValueLowerCase)
        );
    };

    onSuggestionsFetchRequested = ({ value }: { value: string }) => {
        this.setState({
            suggestions: this.getSuggestions(value),
        });
    };

    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: [],
        });
    };

    onChange = (event: React.FormEvent, { newValue }: { newValue: string }) => {
        this.setState({
            value: newValue,
        });
    };

    onSuggestionSelected = (event: React.FormEvent, { suggestionValue }: { suggestionValue: string }) => {
        this.props.onLocationSelected(suggestionValue);
        this.setState({
            value: '', // Clear input value after selecting a suggestion
        });
    };

    render() {
        const { value, suggestions } = this.state;

        const inputProps = {
            placeholder: 'Enter a location...',
            value,
            onChange: this.onChange,
        };

        return (
            <Autosuggest
                suggestions={suggestions}
                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                getSuggestionValue={suggestion => suggestion}
                renderSuggestion={suggestion => <div className="suggestions">{suggestion}</div>}
                inputProps={inputProps}
                onSuggestionSelected={this.onSuggestionSelected}
            />
        );
    }
}

export default AutosuggestComponent;
