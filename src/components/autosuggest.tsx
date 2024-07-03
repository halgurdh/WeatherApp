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
        'Amsterdam',
        'Rotterdam',
        'Utrecht',
        'The Hague',
        'Eindhoven',
        // Add more locations as needed
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
            placeholder: 'Voer een locatie in...',
            value,
            onChange: this.onChange,
        };

        return (
            <div>
                <Autosuggest
                    suggestions={suggestions}
                    onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                    onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                    getSuggestionValue={suggestion => suggestion}
                    renderSuggestion={suggestion => <div>{suggestion}</div>}
                    inputProps={inputProps}
                    onSuggestionSelected={this.onSuggestionSelected}
                />

                {inputProps.value && 
                    <button onClick={this.handleAddCustomLocation}>Locatie toevoegen</button>
                }
            </div>
        );
    }
}

export default AutosuggestComponent;
