// DOM Elements
const input = document.getElementById('input');
const result = document.getElementById('result');
const suggestionsDiv = document.getElementById('suggestions');
const copyButton = document.querySelector('button[onclick="copyToClipboard()"]');
const flagImg = document.getElementById('flag');
const typicalElementDiv = document.getElementById('typicalElement');

function switchMode(newMode) {
    mode = newMode;
    document.getElementById('countryToCodeBtn').classList.toggle('active', mode === 'countryToCode');
    document.getElementById('codeToCountryBtn').classList.toggle('active', mode === 'codeToCountry');
    input.value = '';
    result.textContent = '';
    copyButton.style.display = 'none';
    input.placeholder = mode === 'countryToCode' ? 'Enter country name' : 'Enter ISO code';
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
            result.textContent = "Country not found";
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
            result.textContent = "Code not found";
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
        alert('Copied to clipboard!');
    });
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}

function showSuggestions(suggestions) {
    if (suggestions.length > 0 && input.value) {
        suggestionsDiv.innerHTML = suggestions.map(s => {
            const displayText = s.split(' ')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');
            return `<div class="suggestion-item">${displayText}</div>`;
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
