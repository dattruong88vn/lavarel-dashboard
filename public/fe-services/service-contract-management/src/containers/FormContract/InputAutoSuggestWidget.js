import React, { useState } from 'react';
import { useField, setFieldValue  } from 'formik';
import Autosuggest from 'react-autosuggest';

const languagesArr = [
    {
        name: 'Võ Chí Công',
        year: 1972
    },
    {
        name: 'Hẻm 578/33 Lê Quang Định',
        year: 2000
    },
    {
        name: 'Lê Phụng Hiểu',
        year: 1983
    },
    {
        name: 'Bưng Ông Thòan',
        year: 2007
    },
    {
        name: 'Đường Nguyễn Trọng Thế',
        year: 2012
    },
    {
        name: 'Đường 3 Tháng 2',
        year: 2009
    },
    {
        name: 'Hẻm 805/1 Phan Văn Trị',
        year: 1990
    }
];

// https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
function escapeRegexCharacters(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getSuggestionValue(suggestion) {
    return suggestion.name;
}

function renderSuggestion(suggestion) {
    return (
        <span>{suggestion.name}</span>
    );
}

const InputAutoSuggestWidget = ({ label, ...props }) => {
    const [field, meta, helpers] = useField(props);
    const [value, setValue] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [languages, setLanguages] = useState(languagesArr);

    const getSuggestions = value => {
        const escapedValue = escapeRegexCharacters(value.trim());

        if (escapedValue === '') {
            return [];
        }

        // const regex = new RegExp('^' + escapedValue, 'i');
        const regex = new RegExp(`^.*${escapedValue}.*$`, 'i');

        return languages.filter(language => regex.test(language.name));
    }

    const onChange = (event, { newValue, method }) => {
        setValue(newValue);
        console.log(event.target.value,newValue);
        setFieldValue(newValue)
        field.onChange(event);
    };

    const onBlur = (event, { highlightedSuggestion }) => {
        props.onBlur(event.target.id)
    }

    const onSuggestionsFetchRequested = ({ value }) => {
        setSuggestions(getSuggestions(value))
    };

    const onSuggestionsClearRequested = () => {
        setSuggestions([])
    };

    const inputProps = {
        value,
        onChange
    };

    const renderInputComponent = inputProps => (
        <input {...inputProps}  {...props} />
    );

    return (<>
        <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={onSuggestionsFetchRequested}
            onSuggestionsClearRequested={onSuggestionsClearRequested}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            inputProps={inputProps}
            renderInputComponent={renderInputComponent}
        />
    </>)
}

export default InputAutoSuggestWidget;
