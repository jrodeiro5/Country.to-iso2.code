// DOM Elements
const input = document.getElementById('input');
const result = document.getElementById('result');
const suggestionsDiv = document.getElementById('suggestions');
const copyButton = document.querySelector('button[onclick="copyToClipboard()"]');
const flagImg = document.getElementById('flag');
const typicalElementDiv = document.getElementById('typicalElement');
const languageSelect = document.getElementById('languageSelect');

// Initialize language based on browser settings
function initializeLanguage() {
    const browserLang = navigator.language.split('-')[0];
    if (translations.hasOwnProperty(browserLang)) {
        setLanguage(browserLang);
        languageSelect.value = browserLang;
    } else {
        setLanguage('en');
        languageSelect.value = 'en';
    }
}

// Update all text content based on selected language
function updateUIText() {
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[currentLanguage]?.[key]) {
            if (element.tagName === 'INPUT' && element.type === 'text') {
                element.placeholder = translations[currentLanguage][key];
            } else {
                element.textContent = translations[currentLanguage][key];
            }
        }
    });

    // Update document direction for RTL languages
    document.documentElement.dir = ['ar', 'he', 'fa'].includes(currentLanguage) ? 'rtl' : 'ltr';
}

function switchMode(newMode) {
    mode = newMode;
    document.getElementById('countryToCodeBtn').classList.toggle('active', mode === 'countryToCode');
    document.getElementById('codeToCountryBtn').classList.toggle('active', mode === 'codeToCountry');
    input.value = '';
    result.textContent = '';
    copyButton.style.display = 'none';
    input.placeholder = translations[currentLanguage][mode === 'countryToCode' ? 'enterCountryName' : 'enterCode'];
    hideFlag();
}

function convert() {
    const inputValue = input.value;
    let conversionResult;

    if (mode === 'countryToCode') {
        conversionResult = convertCountryToCode(inputValue);
        if (conversionResult) {
            result.textContent = conversionResult;
            copyButton.style.display = 'block';
            showFlag(inputValue.toLowerCase());
        } else {
            result.textContent = translations[currentLanguage].countryNotFound;
            copyButton.style.display = 'none';
            hideFlag();
        }
    } else {
        conversionResult = convertCodeToCountry(inputValue);
        if (conversionResult) {
            result.textContent = conversionResult;
            copyButton.style.display = 'block';
            showFlag(conversionResult.toLowerCase());
        } else {
            result.textContent = translations[currentLanguage].codeNotFound;
            copyButton.style.display = 'none';
            hideFlag();
        }
    }
}

function showFlag(country) {
    if (typicalElements[country]) {
        typicalElementDiv.textContent = typicalElements[country];
        typicalElementDiv.style.opacity = '1';
        typicalElementDiv.style.transform = 'translate(-50%, -50%) scale(1.2)';
    } else {
        typicalElementDiv.style.opacity = '0';
    }
}

function hideFlag() {
    typicalElementDiv.style.opacity = '0';
    typicalElementDiv.style.transform = 'translate(-50%, -50%) scale(1)';
}

function copyToClipboard() {
    navigator.clipboard.writeText(result.textContent).then(() => {
        alert(translations[currentLanguage].copied);
    });
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}

function showSuggestions(suggestions) {
    if (suggestions.length > 0 && input.value) {
        suggestionsDiv.innerHTML = suggestions.map(suggestion => {
            const displayText = suggestion.display.split(' ')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');
            return `<div class="suggestion-item" data-code="${suggestion.code}">${displayText}</div>`;
        }).join('');
        
        suggestionsDiv.style.display = 'block';

        suggestionsDiv.querySelectorAll('.suggestion-item').forEach(item => {
            item.addEventListener('click', function() {
                input.value = this.textContent;
                suggestionsDiv.style.display = 'none';
                convert();
            });
        });
    } else {
        suggestionsDiv.style.display = 'none';
    }
}

// Event Listeners
input.addEventListener('input', function() {
    const suggestions = getSuggestions(this.value, mode);
    showSuggestions(suggestions);
});

document.addEventListener('click', function(e) {
    if (e.target !== input && e.target !== suggestionsDiv) {
        suggestionsDiv.style.display = 'none';
    }
});

// Initialize the UI with the correct language
initializeLanguage();
updateUIText();