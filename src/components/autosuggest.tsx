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
        "Washington, D.C. - United States",
        "Ottawa - Canada",
        "London - United Kingdom",
        "Paris - France",
        "Berlin - Germany",
        "Madrid - Spain",
        "Rome - Italy",
        "Athens - Greece",
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
        "Barcelona - Spain",
        "Milan - Italy",
        "Munich - Germany",
        "St. Petersburg - Russia",
        "Istanbul - Turkey",
        "Lisbon - Portugal",
        "Edinburgh - United Kingdom",
        "Manchester - United Kingdom",
        "Frankfurt - Germany",
        "Zurich - Switzerland",
        "Geneva - Switzerland",
        "Venice - Italy",
        "Florence - Italy",
        "Naples - Italy",
        "Seville - Spain",
        "Valencia - Spain",
        "Brussels - Belgium",
        "Antwerp - Belgium",
        "Ghent - Belgium",
        "Bruges - Belgium",
        "Lyon - France",
        "Marseille - France",
        "Toulouse - France",
        "Bordeaux - France",
        "Nice - France",
        "Lille - France",
        "Rotterdam - Netherlands",
        "Utrecht - Netherlands",
        "The Hague - Netherlands",
        "Gothenburg - Sweden",
        "Malmo - Sweden",
        "Bergen - Norway",
        "Trondheim - Norway",
        "Tampere - Finland",
        "Turku - Finland",
        "Krakow - Poland",
        "Wroclaw - Poland",
        "Gdansk - Poland",
        "Lodz - Poland",
        "Plovdiv - Bulgaria",
        "Varna - Bulgaria",
        "Burgas - Bulgaria",
        "Cluj-Napoca - Romania",
        "Timișoara - Romania",
        "Iasi - Romania",
        "Constanța - Romania",
        "Debrecen - Hungary",
        "Szeged - Hungary",
        "Miskolc - Hungary",
        "Pécs - Hungary",
        "Ostrava - Czech Republic",
        "Brno - Czech Republic",
        "Liberec - Czech Republic",
        "Olomouc - Czech Republic",
        "Kosice - Slovakia",
        "Prešov - Slovakia",
        "Nitra - Slovakia",
        "Zilina - Slovakia",
        "Split - Croatia",
        "Dubrovnik - Croatia",
        "Rijeka - Croatia",
        "Osijek - Croatia",
        "Durres - Albania",
        "Vlore - Albania",
        "Shkoder - Albania",
        "Zadar - Croatia",
        "Sibenik - Croatia",
        "Rovinj - Croatia",
        "Pula - Croatia",
        "Belgrade - Serbia",
        "Novi Sad - Serbia",
        "Niš - Serbia",
        "Kragujevac - Serbia",
        "Nikšić - Montenegro",
        "Pljevlja - Montenegro",
        "Bijelo Polje - Montenegro",
        "Bitola - North Macedonia",
        "Ohrid - North Macedonia",
        "Tetovo - North Macedonia",
        "Banja Luka - Bosnia and Herzegovina",
        "Mostar - Bosnia and Herzegovina",
        "Tuzla - Bosnia and Herzegovina",
        "Kopavogur - Iceland",
        "Hafnarfjordur - Iceland",
        "Akureyri - Iceland",
        "Cork - Ireland",
        "Limerick - Ireland",
        "Galway - Ireland",
        "Birkirkara - Malta",
        "Mosta - Malta",
        "Qormi - Malta",
        "Limassol - Cyprus",
        "Larnaca - Cyprus",
        "Paphos - Cyprus",
        "Schaan - Liechtenstein",
        "Balzers - Liechtenstein",
        "Eschen - Liechtenstein",
        "Basel - Switzerland",
        "Esch-sur-Alzette - Luxembourg",
        "Differdange - Luxembourg",
        "Dudelange - Luxembourg",
        "Amsterdam - Netherlands",
        "Rotterdam - Netherlands",
        "The Hague - Netherlands",
        "Eindhoven - Netherlands",
        "Tilburg - Netherlands",
        "Groningen - Netherlands",
        "Almere - Netherlands",
        "Breda - Netherlands",
        "Nijmegen - Netherlands",
        "Apeldoorn - Netherlands",
        "Haarlem - Netherlands",
        "Arnhem - Netherlands",
        "Zaanstad - Netherlands",
        "Amersfoort - Netherlands",
        "'s-Hertogenbosch - Netherlands",
        "Zwolle - Netherlands",
        "Leiden - Netherlands",
        "Dordrecht - Netherlands",
        "Ede - Netherlands",
        "Emmen - Netherlands"
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
        console.log(event);
        this.setState({
            value: newValue,
        });
    };

    onSuggestionSelected = (event: React.FormEvent, { suggestionValue }: { suggestionValue: string }) => {
        console.log(event);
        this.props.onLocationSelected(suggestionValue);
        this.setState({
            value: '', // Clear input value after selecting a suggestion
        });
    };

    handleAddCustomLocation = () => {
        const { value } = this.state;
        if (value.trim() !== '') {
            this.props.onLocationSelected(value);
            this.setState({ value: '' }); // Clear input value after adding custom location
        }
    };

    render() {
        const { value, suggestions } = this.state;

        const inputProps = {
            placeholder: 'Fill in a location...',
            value,
            onChange: this.onChange,
        };

        return (
            <div className='autoSuggest'>
                <Autosuggest
                    suggestions={suggestions}
                    onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                    onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                    getSuggestionValue={suggestion => suggestion}
                    renderSuggestion={suggestion => <div className="suggestions">{suggestion}</div>}
                    inputProps={inputProps}
                    onSuggestionSelected={this.onSuggestionSelected}
                />

                {inputProps.value && 
                    <button className="zoek" onClick={this.handleAddCustomLocation}>Search Location</button>
                }
            </div>
        );
    }
}

export default AutosuggestComponent;
