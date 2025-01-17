// Create an efficient lookup structure for country names in all languages
const countryNameLookup = {};
Object.entries(countryNames).forEach(([code, translations]) => {
    Object.values(translations).forEach(namesArray => {
        namesArray.forEach(name => {
            countryNameLookup[name.toLowerCase()] = code;
        });
    });
});

// Create a reverse mapping for code to country (case-insensitive)
const codeToCountryMap = {};
Object.entries(countryNames).forEach(([code, translations]) => {
    codeToCountryMap[code.toLowerCase()] = translations.en[0]; // Use English as default
});

let mode = 'countryToCode';
let currentLanguage = 'en'; // Default language

function setLanguage(lang) {
    if (Object.keys(countryNames[Object.keys(countryNames)[0]]).includes(lang)) {
        currentLanguage = lang;
        updatePlaceholders();
    }
}

function updatePlaceholders() {
    const input = document.getElementById('input');
    input.placeholder = mode === 'countryToCode' 
        ? translations[currentLanguage].enterCountryName 
        : translations[currentLanguage].enterCode;
}

function convertCountryToCode(country) {
    const inputValue = country.toLowerCase();
    return countryNameLookup[inputValue] || null;
}

function convertCodeToCountry(code) {
    const inputValue = code.toLowerCase();
    if (codeToCountryMap.hasOwnProperty(inputValue)) {
        // Return the country name in the current language
        const countryCode = code.startsWith('PULL_') ? code : `PULL_${code}`;
        const translations = countryNames[countryCode];
        if (translations && translations[currentLanguage]) {
            return translations[currentLanguage][0]; // Return the primary name
        }
    }
    return null;
}

function getSuggestions(inputValue, currentMode) {
    const value = inputValue.toLowerCase();
    if (currentMode === 'countryToCode') {
        // Search through all country names in all languages
        return Object.entries(countryNames)
            .flatMap(([code, translations]) => 
                translations[currentLanguage]
                    .filter(name => name.toLowerCase().includes(value))
                    .map(name => ({
                        display: name,
                        code: code
                    }))
            )
            .slice(0, 10); // Limit to 10 suggestions
    } else {
        // Search through codes
        return Object.keys(countryNames)
            .filter(code => code.toLowerCase().includes(value))
            .map(code => ({
                display: code,
                code: code
            }))
            .slice(0, 10);
    }
}

// Language-specific translations
const translations = {
    en: {
        enterCountryName: "Enter country name",
        enterCode: "Enter country code",
        countryToCode: "Country to Code",
        codeToCountry: "Code to Country",
        countryNotFound: "Country not found",
        codeNotFound: "Code not found",
        copyToClipboard: "Copy to Clipboard",
        copied: "Copied to clipboard!"
    },
    es: {
        enterCountryName: "Ingrese nombre del país",
        enterCode: "Ingrese código del país",
        countryToCode: "País a Código",
        codeToCountry: "Código a País",
        countryNotFound: "País no encontrado",
        codeNotFound: "Código no encontrado",
        copyToClipboard: "Copiar al portapapeles",
        copied: "¡Copiado al portapapeles!"
    },
    fr: {
        enterCountryName: "Entrez le nom du pays",
        enterCode: "Entrez le code du pays",
        countryToCode: "Pays vers Code",
        codeToCountry: "Code vers Pays",
        countryNotFound: "Pays non trouvé",
        codeNotFound: "Code non trouvé",
        copyToClipboard: "Copier dans le presse-papier",
        copied: "Copié dans le presse-papier!"
    }
    // Add more languages as needed
};