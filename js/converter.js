// Create a case-insensitive version of the countryCodes object
const caseInsensitiveCountryCodes = Object.fromEntries(
    Object.entries(countryCodes).map(([country, code]) => [country.toLowerCase(), code])
);

// Create a reverse mapping for code to country (case-insensitive)
const caseInsensitiveCodeToCountry = Object.fromEntries(
    Object.entries(countryCodes).map(([country, code]) => [code.toLowerCase(), country])
);

let mode = 'countryToCode';

function convertCountryToCode(country) {
    const inputValue = country.toLowerCase();
    if (caseInsensitiveCountryCodes.hasOwnProperty(inputValue)) {
        return caseInsensitiveCountryCodes[inputValue];
    }
    return null;
}

function convertCodeToCountry(code) {
    const inputValue = code.toLowerCase();
    if (caseInsensitiveCodeToCountry.hasOwnProperty(inputValue)) {
        const countryName = caseInsensitiveCodeToCountry[inputValue];
        return countryName.charAt(0).toUpperCase() + countryName.slice(1);
    }
    return null;
}

function getSuggestions(inputValue, currentMode) {
    const value = inputValue.toLowerCase();
    if (currentMode === 'countryToCode') {
        return Object.keys(caseInsensitiveCountryCodes).filter(country => 
            country.startsWith(value)
        );
    } else {
        return Object.keys(caseInsensitiveCodeToCountry).filter(code => 
            code.startsWith(value)
        );
    }
}