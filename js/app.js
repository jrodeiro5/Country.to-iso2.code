// Country code converter application
let countryData = {}; // Will hold all country data
let currentLanguage = 'es'; // Always Spanish
let mode = 'countryToCode'; // Default conversion mode
let isLoading = false;
let translations = {}; // Will hold current translations

// FUNCIÓN PARA NORMALIZAR TEXTO: elimina acentos, convierte a minúsculas
function normalizeText(text) {
    if (!text) return '';
    return text.toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
}

// DOM elements
const input = document.getElementById('input');
const result = document.getElementById('result');
const resultContainer = document.getElementById('result-container');
const suggestionsDiv = document.getElementById('suggestions');
const copyButton = document.getElementById('copy-button');
const countryCard = document.getElementById('country-card');
const loadingSpinner = document.getElementById('loading-spinner');
const errorMessage = document.getElementById('error-message');

// Spanish country names mapping (to support search in Spanish)
// Esta es la lista de nombres de países en español que se usará para facilitar la búsqueda
const spanishCountryNames = {
    "españa": "spain",
    "francia": "france",
    "alemania": "germany",
    "italia": "italy",
    "reino unido": "united kingdom",
    "estados unidos": "united states of america",
    "eeuu": "united states of america",
    "usa": "united states of america",
    "estados unidos de america": "united states of america",
    "estados unidos de américa": "united states of america",
    "ee uu": "united states of america",
    "ee.uu.": "united states of america",
    "usa": "united states of america",
    "united states": "united states of america",
    "us": "united states of america",
    "america": "united states of america",
    "américa": "united states of america",
    "norteamerica": "united states of america",
    "norteamérica": "united states of america",
    "estados unidos norteamericanos": "united states of america",
    "eua": "united states of america",
    "e.u.a.": "united states of america",
    "e.e.u.u.": "united states of america",
    "canadá": "canada",
    "méxico": "mexico",
    "brasil": "brazil",
    "argentina": "argentina",
    "chile": "chile",
    "colombia": "colombia",
    "perú": "peru",
    "venezuela": "venezuela, bolivarian republic of",
    "portugal": "portugal",
    "bélgica": "belgium",
    "holanda": "netherlands, kingdom of the",
    "países bajos": "netherlands, kingdom of the",
    "suiza": "switzerland",
    "austria": "austria",
    "grecia": "greece",
    "suecia": "sweden",
    "noruega": "norway",
    "finlandia": "finland",
    "dinamarca": "denmark",
    "irlanda": "ireland",
    "rusia": "russian federation",
    "japón": "japan",
    "china": "china",
    "india": "india",
    "australia": "australia",
    "nueva zelanda": "new zealand",
    "marruecos": "morocco",
    "egipto": "egypt",
    "sudáfrica": "south africa",
    "kenia": "kenya",
    "nigeria": "nigeria",
    "corea del sur": "korea, republic of",
    "corea del norte": "korea, democratic people's republic of",
    "vietnam": "vietnam",
    "tailandia": "thailand",
    "singapur": "singapore",
    "emiratos árabes unidos": "united arab emirates",
    "austria": "austria",
    "polonia": "poland",
    "hungría": "hungary",
    "rumanía": "romania",
    "bulgaria": "bulgaria",
    "croacia": "croatia",
    "eslovenia": "slovenia",
    "eslovaquia": "slovakia",
    "lituania": "lithuania",
    "letonia": "latvia",
    "estonia": "estonia",
    "chipre": "cyprus",
    "malta": "malta",
    "turquía": "turkey",
    "argentina": "argentina",
    "brasil": "brazil",
    "chile": "chile",
    "colombia": "colombia",
    "venezuela": "venezuela, bolivarian republic of",
    "ecuador": "ecuador",
    "perú": "peru",
    "uruguay": "uruguay",
    "bolivia": "bolivia, plurinational state of",
    "paraguay": "paraguay",
    "cuba": "cuba",
    "república dominicana": "dominican republic",
    "puerto rico": "puerto rico",
    "panamá": "panama",
    "costa rica": "costa rica",
    "el salvador": "el salvador",
    "guatemala": "guatemala",
    "honduras": "honduras",
    "nicaragua": "nicaragua",
    "guyana francesa": "french guiana"
    // Se pueden agregar más nombres de países en español según sea necesario
};

// Initialize the application
document.addEventListener('DOMContentLoaded', async () => {
    // Initialize translations
    translations = esTranslations; // Always Spanish
    
    // Initialize countryData with a basic structure to prevent undefined errors
    countryData = {
    countries: {},
    codes: {},
    details: {},
    spanishNames: {}
    };
    
    // Set event listeners
    document.getElementById('countryToCodeBtn').addEventListener('click', () => switchMode('countryToCode'));
    document.getElementById('codeToCountryBtn').addEventListener('click', () => switchMode('codeToCountry'));
    document.getElementById('mode-toggle').addEventListener('click', toggleDarkMode);
    document.getElementById('convert-button').addEventListener('click', convert);
    document.getElementById('copy-button').addEventListener('click', copyToClipboard);
    
    // Load initial data
    await loadCountryData();
    
    // Set up input event for suggestions
    input.addEventListener('input', debounce(handleInputChange, 100));
    
    // Click away to close suggestions
    document.addEventListener('click', (e) => {
        if (!suggestionsDiv.contains(e.target) && e.target !== input) {
            suggestionsDiv.style.display = 'none';
        }
    });
    
    // Check for saved preferences
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
        document.getElementById('mode-toggle').textContent = '☀️';
    }
    
    // Forzar idioma español
    translations = esTranslations;
    updateUITexts();
    updatePlaceholder();
    
    // Datos cargados exitosamente
});

// Load initial data
async function loadCountryData() {
    showLoading(true);
    
    try {
        // Clear old cache data that may have incorrect structure
        localStorage.removeItem('countryData');
        localStorage.removeItem('countryDataTimestamp');
        
        // Verificar que los datos de días festivos estén cargados
        if (typeof countryHolidays === 'undefined') {
            console.error('Error: Datos de festivos no disponibles');
        }
        
        // Check if we have cached data
        const cachedData = localStorage.getItem('countryData');
        const cacheTimestamp = localStorage.getItem('countryDataTimestamp');
        const oneDayInMs = 24 * 60 * 60 * 1000;
        
        // Use cache if it's less than a day old
        if (cachedData && cacheTimestamp && (Date.now() - parseInt(cacheTimestamp)) < oneDayInMs) {
            countryData = JSON.parse(cachedData);
            // Verificar que los datos en caché tengan la estructura correcta
            if (countryData && countryData.details && Object.keys(countryData.details).length > 0) {
                showLoading(false);
                return;
            } else {
                console.error('Datos en caché corruptos, recargando desde API');
            }
        }
        
        // Fetch from API
        let apiData = null;
        
        try {
            // IMPORTANT: REST Countries API now REQUIRES field filtering for /all endpoint
            // Maximum 10 fields allowed. Without fields parameter, returns 400 Bad Request
            // This is a breaking change implemented in 2025
            // Try multiple API endpoints in order of preference
            const apiEndpoints = [
                // Primary endpoint - REQUIRED fields for /all endpoint (max 10 fields)
                'https://restcountries.com/v3.1/all?fields=name,cca2,capital,population,region,subregion,languages,currencies,flags,translations',
                // Alternative with minimal fields
                'https://restcountries.com/v3.1/all?fields=name,cca2,capital,region,flags',
                // Independent countries only with fields
                'https://restcountries.com/v3.1/independent?status=true&fields=name,cca2,capital,region,flags'
            ];
            let lastError = null;
            
            for (const endpoint of apiEndpoints) {
                try {
                    console.log(`Trying API endpoint: ${endpoint}`);
                    const response = await fetch(endpoint, {
                        method: 'GET',
                        headers: {
                            'Accept': 'application/json'
                        }
                    });
                    
                    if (response.ok) {
                        const data = await response.json();
                        console.log(`API Response from ${endpoint}:`, data);
                        console.log(`Data type:`, typeof data, `Is Array:`, Array.isArray(data), `Length:`, data?.length);
                        
                        if (Array.isArray(data) && data.length > 0) {
                            apiData = data;
                            console.log(`Successfully fetched data from: ${endpoint}`);
                            break;
                        } else {
                            console.warn(`Invalid data structure from ${endpoint}:`, data);
                        }
                    } else {
                        const errorText = await response.text();
                        console.warn(`Endpoint ${endpoint} returned: ${response.status} ${response.statusText}`);
                        console.warn(`Error details:`, errorText);
                        lastError = new Error(`Failed to fetch from ${endpoint}: ${response.status} ${response.statusText}`);
                    }
                } catch (endpointError) {
                    console.warn(`Error with endpoint ${endpoint}:`, endpointError);
                    lastError = endpointError;
                    continue;
                }
            }
            
            if (!apiData) {
                throw lastError || new Error('All API endpoints failed');
            }
            
            // Datos recibidos correctamente
            if (!Array.isArray(apiData) || apiData.length === 0) {
                throw new Error('API returned empty or invalid data structure');
            }
        } catch (fetchError) {
            console.error('Error fetching API data:', fetchError);
            throw fetchError; // Re-throw to be caught by the outer try/catch
        }
        
        // Add final check before processing
        console.log('Final apiData check before processing:', {
            isDefined: apiData !== undefined,
            isNotNull: apiData !== null,
            isArray: Array.isArray(apiData),
            length: apiData?.length,
            sample: apiData?.[0]
        });
        
        // Process API data to our format
        countryData = processApiData(apiData);
        
        // Cache the data
        localStorage.setItem('countryData', JSON.stringify(countryData));
        localStorage.setItem('countryDataTimestamp', Date.now().toString());
        
    } catch (error) {
        console.error('Error loading country data:', error);
        // Fallback to built-in data
        countryData = loadFallbackData();
        
        // Make sure we definitely have data - create minimal structure if needed
        if (!countryData || !countryData.details || Object.keys(countryData.details).length === 0) {
            console.error('Fallback data failed too. Creating minimal structure');
            console.log('Using built-in country codes as final fallback');
            
            // Use the built-in countryCodes from the HTML as absolute fallback
            countryData = loadFallbackData();
            
            // If even that fails, create a very minimal structure
            if (!countryData || Object.keys(countryData.countries || {}).length === 0) {
                countryData = {
                    countries: { 'spain': 'PULL_ES', 'france': 'PULL_FR', 'germany': 'PULL_DE' },
                    codes: { 'pull_es': 'spain', 'pull_fr': 'france', 'pull_de': 'germany' },
                    details: {
                        'spain': {
                            name: 'Spain',
                            spanishName: 'España',
                            code: 'PULL_ES',
                            isoCode: 'ES',
                            capital: 'Madrid',
                            population: 47351567,
                            region: 'Europe',
                            subregion: 'Southern Europe'
                        },
                        'france': {
                            name: 'France',
                            spanishName: 'Francia',
                            code: 'PULL_FR',
                            isoCode: 'FR',
                            capital: 'Paris',
                            population: 67000000,
                            region: 'Europe',
                            subregion: 'Western Europe'
                        },
                        'germany': {
                            name: 'Germany',
                            spanishName: 'Alemania',
                            code: 'PULL_DE',
                            isoCode: 'DE',
                            capital: 'Berlin',
                            population: 83000000,
                            region: 'Europe',
                            subregion: 'Western Europe'
                        }
                    },
                    spanishNames: { 'españa': 'spain', 'francia': 'france', 'alemania': 'germany' }
                };
            }
        }
        
        // Only show error if we really have no data at all
        if (!countryData || Object.keys(countryData.countries || {}).length === 0) {
            showError(true);
        } else {
            console.log(`Loaded fallback data with ${Object.keys(countryData.countries).length} countries`);
        }
    } finally {
        showLoading(false);
    }
}

// Process API data to match our format with PULL_ prefix
function processApiData(apiData) {
    // Safety check for undefined or invalid data
    if (!apiData) {
        console.error('processApiData: apiData is undefined or null');
        return { countries: {}, codes: {}, details: {}, spanishNames: {} };
    }
    
    if (!Array.isArray(apiData)) {
        console.error('processApiData: apiData is not an array:', typeof apiData, apiData);
        return { countries: {}, codes: {}, details: {}, spanishNames: {} };
    }
    
    if (apiData.length === 0) {
        console.error('processApiData: apiData array is empty');
        return { countries: {}, codes: {}, details: {}, spanishNames: {} };
    }
    
    console.log(`Processing ${apiData.length} countries from API`);
    
    const processedData = {
        countries: {},
        codes: {},
        details: {},
        spanishNames: {} // Add Spanish names from translations
    };
    
    // Mapa de nombres en español
    
    apiData.forEach(country => {
        const name = country.name.common.toLowerCase();
        const code = country.cca2;
        const pullCode = `PULL_${code}`;
        
        // Map country name to PULL_code
        processedData.countries[name] = pullCode;
        
        // If Spanish translation is available, add it
        if (country.translations && country.translations.spa && country.translations.spa.common) {
            const spanishName = country.translations.spa.common.toLowerCase();
            processedData.spanishNames[spanishName] = name;
            console.log(`Added Spanish translation for ${name}: ${spanishName}`);
        }
        
        // Map PULL_code to country name
        processedData.codes[pullCode.toLowerCase()] = name;
        
        // Map code to country name (for searching without PULL_)
        processedData.codes[code.toLowerCase()] = name;
        
        // Comprobar disponibilidad de información de festivos
        let holidayInfo;
        if (typeof countryHolidays !== 'undefined' && countryHolidays[code]) {
            holidayInfo = countryHolidays[code];
        } else {
            holidayInfo = {
                holidays: [],
                workingHours: 'Información no disponible',
                businessCulture: 'Información no disponible'
            };
        }
        
        // Store additional details with safe field access
        processedData.details[name] = {
            name: country.name?.common || country.name || 'Unknown',
            spanishName: country.translations?.spa?.common || country.name?.common || country.name || 'Unknown',
            code: pullCode,
            isoCode: code,
            flag: country.flags?.svg || country.flags?.png || '',
            capital: Array.isArray(country.capital) ? country.capital[0] : (country.capital || ''),
            population: country.population || 0,
            region: country.region || '',
            subregion: country.subregion || '',
            languages: country.languages ? Object.values(country.languages).join(', ') : 'N/A',
            currencies: country.currencies ? Object.values(country.currencies)
                .map(c => `${c.name || 'Unknown'} (${c.symbol || ''})`).join(', ') : 'N/A',
            // New fields from API (with fallbacks)
            area: country.area ? `${country.area.toLocaleString()} km²` : 'N/A',
            timezones: country.timezones ? country.timezones.join(', ') : 'N/A',
            borders: country.borders ? country.borders.join(', ') : 'None',
            drivingSide: country.car?.side || 'N/A',
            callingCodes: (country.idd?.root && country.idd?.suffixes?.[0]) ? 
                (country.idd.root + country.idd.suffixes[0]) : 'N/A',
            // Holiday information
            holidays: holidayInfo.holidays,
            workingHours: holidayInfo.workingHours,
            businessCulture: holidayInfo.businessCulture
        };
    });
    
    // Add our built-in Spanish names
    for (const [spanishName, englishName] of Object.entries(spanishCountryNames)) {
        processedData.spanishNames[spanishName] = englishName;
    }
    
    // Datos procesados correctamente
    
    return processedData;
}

// Load fallback country data function
function loadFallbackData() {
    // Cargando datos de respaldo
    const fallbackData = {
        countries: {},
        codes: {},
        details: {},
        spanishNames: {} // Include Spanish names mapping
    };
    
    // Verify we have countryCodes data available
    if (typeof countryCodes === 'undefined') {
        console.error('countryCodes object not found! This should be defined in the HTML file.');
        return fallbackData; // Return empty object as fallback
    }
    
    // Load from the built-in countryCodes object
    for (const [country, code] of Object.entries(countryCodes)) {
        fallbackData.countries[country.toLowerCase()] = code;
        fallbackData.codes[code.toLowerCase()] = country;
        
        // Also add entries without the PULL_ prefix for easier searching
        const shortCode = code.replace('PULL_', '').toLowerCase();
        fallbackData.codes[shortCode] = country;
        
        // Add basic details
        fallbackData.details[country.toLowerCase()] = {
            name: country,
            code: code,
            isoCode: code.replace('PULL_', ''),
        };
    }
    
    // Add our built-in Spanish names
    for (const [spanishName, englishName] of Object.entries(spanishCountryNames)) {
        fallbackData.spanishNames[spanishName] = englishName;
    }
    
    return fallbackData;
}

// Switch between country-to-code and code-to-country modes
function switchMode(newMode) {
    mode = newMode;
    document.getElementById('countryToCodeBtn').classList.toggle('active', mode === 'countryToCode');
    document.getElementById('codeToCountryBtn').classList.toggle('active', mode === 'codeToCountry');
    
    // Reset input and results
    input.value = '';
    result.textContent = '';
    countryCard.style.display = 'none';
    resultContainer.style.display = 'none';
    
    // Update placeholder according to mode and language
    updatePlaceholder();
    
    // Modo cambiado
}



// Update all UI text elements based on current language
function updateUITexts() {
    document.getElementById('title').textContent = translations.title;
    document.getElementById('countryToCodeBtn').textContent = translations.countryToCode;
    document.getElementById('codeToCountryBtn').textContent = translations.codeToCountry;
    document.getElementById('convert-button').textContent = translations.convert;
    document.getElementById('copy-button').textContent = translations.copyToClipboard;
    
    // Update detail labels
    document.querySelectorAll('.detail-label').forEach(label => {
        const key = label.getAttribute('data-key');
        if (key && translations[key]) {
            label.textContent = translations[key];
        }
    });
    
    updatePlaceholder();
}

// Update input placeholder
function updatePlaceholder() {
    input.placeholder = mode === 'countryToCode' 
        ? translations.inputPlaceholderCountry 
        : translations.inputPlaceholderCode;
}

// Toggle dark mode
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    
    // Update the moon/sun icon
    const modeToggle = document.getElementById('mode-toggle');
    modeToggle.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
    
    // Save preference
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
    
    // Modo oscuro actualizado
}

// Handle input change for suggestions
function handleInputChange() {
    const rawInput = input.value.trim();
    // Aplicar normalización para hacer la búsqueda insensible a mayúsculas/minúsculas y acentos
    const inputValue = normalizeText(rawInput);
    
    if (inputValue.length < 1) {
        suggestionsDiv.style.display = 'none';
        return;
    }
    
    // Ensure countryData is initialized
    if (!countryData || !countryData.countries) {
        console.error('Country data not initialized for suggestions');
        return;
    }
    
    let suggestions = [];
    
    if (mode === 'countryToCode') {
        // For country name search, also check Spanish names if in Spanish mode
        let potentialMatches = [];
        
        // IMPORTANTISIMO: Siempre dar mayor prioridad a las coincidencias en español
        // También debemos manejar los casos como "france" -> "francia" para no confundir
        if (countryData.spanishNames) {
            // Preprocesar las claves de spanishNames para la búsqueda insensible a mayúsculas y acentos
            const normalizedSpanishKeys = Object.keys(countryData.spanishNames).map(key => ({
                original: key,
                normalized: normalizeText(key)
            }));
            
            // Verifica si el input está en inglés buscando el equivalente español
            const foundSpanishForEnglish = Object.entries(countryData.spanishNames)
                .filter(([spanish, english]) => {
                    const normalizedEnglish = normalizeText(english);
                    return normalizedEnglish === inputValue || normalizedEnglish.includes(inputValue);
                });
            
            if (foundSpanishForEnglish.length > 0) {
                // Si el usuario está buscando en inglés, convertimos a español y lo mostramos
                foundSpanishForEnglish.forEach(([spanishName, englishName]) => {
                    potentialMatches.push({
                        englishName: englishName,
                        spanishName: spanishName
                    });
                });
            }
            
            // Luego buscar coincidencias en español usando las versiones normalizadas
            const matchingSpanishNames = normalizedSpanishKeys
                .filter(entry => entry.normalized.includes(inputValue))
                .map(entry => entry.original);
                

            
            // Add Spanish matches directly
            matchingSpanishNames.forEach(spanishName => {
                const englishName = countryData.spanishNames[spanishName];
                if (englishName && countryData.countries && countryData.countries[englishName]) {
                    potentialMatches.push({
                        englishName: englishName,
                        spanishName: spanishName
                    });
                }
            });
        }
            
        // Then check English names (as fallback or in English mode)
        if (countryData.countries) {
            Object.keys(countryData.countries)
                .filter(country => country.includes(inputValue))
                .forEach(englishName => {
                    // Find Spanish name if available
                    let spanishName = englishName;
                    
                    // Try to find Spanish name in details
                    if (countryData.details && countryData.details[englishName] && 
                        countryData.details[englishName].spanishName) {
                        spanishName = countryData.details[englishName].spanishName.toLowerCase();
                    }
                    
                    potentialMatches.push({
                        englishName: englishName,
                        spanishName: spanishName
                    });
                });
        } else {
            console.error('Country data missing countries object');
        }
        
        // Debug info for Spanish mode
        if (currentLanguage === 'es') {
            console.log('Spanish mode active for search');
        }
        
        // Sort and remove duplicates (based on english names as they're unique)
        const uniqueNames = [];
        suggestions = potentialMatches
            .filter(match => {
                if (uniqueNames.includes(match.englishName)) {
                    return false;
                }
                uniqueNames.push(match.englishName);
                return true;
            })
            .sort((a, b) => {
                // Sort by Spanish name (usando versiones normalizadas para comparar)
                const normalizedNameA = normalizeText(a.spanishName);
                const normalizedNameB = normalizeText(b.spanishName);
                
                // Prioritize matches that start with the input (usando versiones normalizadas)
                const aStartsWith = normalizedNameA.startsWith(inputValue);
                const bStartsWith = normalizedNameB.startsWith(inputValue);
                
                if (aStartsWith && !bStartsWith) return -1;
                if (!aStartsWith && bStartsWith) return 1;
                return normalizedNameA.localeCompare(normalizedNameB);
            })
            .slice(0, 8); // Limit to 8 suggestions
            
    
    } else {
        // For code to country, handle with and without PULL_ prefix
        // Primero normalizar todos los códigos disponibles para la búsqueda
        const allCodes = Object.keys(countryData.codes)
            .filter(code => code.startsWith('pull_'))
            .map(code => ({ 
                original: code,
                normalized: normalizeText(code),
                short: normalizeText(code.replace('pull_', ''))
            }));
        
        // Recopila todos los códigos que coinciden con la búsqueda
        let matchingCodes = [];
        
        if (inputValue.startsWith('pull_')) {
            // Si el usuario ya escribió "pull_", buscar códigos que coincidan con el input completo
            matchingCodes = allCodes
                .filter(code => code.normalized.startsWith(inputValue))
                .map(code => code.original.toUpperCase());
        } else {
            // Si el usuario escribió solo la parte del código sin "pull_", buscar coincidencias con la parte corta
            matchingCodes = allCodes
                .filter(code => code.short.startsWith(inputValue))
                .map(code => code.original.toUpperCase());
        }
        
        suggestions = matchingCodes.slice(0, 8);
    }
    
    showSuggestions(suggestions);
}

// Display suggestions
function showSuggestions(suggestions) {
    if (suggestions.length > 0 && input.value.trim()) {
        suggestionsDiv.innerHTML = suggestions.map(item => {
            // Format the display text
            let displayText;
            let dataValue;
            
            if (mode === 'countryToCode') {
                // Para países, mostramos SIEMPRE los nombres en español si están disponibles
                if (typeof item === 'object' && item.englishName) {
                    const nameToShow = item.spanishName;
                    
                    // Capitalizar cada palabra del nombre a mostrar
                    displayText = nameToShow.split(' ')
                        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                        .join(' ');
                    
                    // IMPORTANTE: guardar el nombre en ESPAÑOL como valor para usar en la búsqueda
                    // Esto es clave para solucionar el problema de "france" vs "francia"
                    dataValue = item.spanishName;
                } else {
                    // Fallback para el formato antiguo (string simple)
                    displayText = String(item).split(' ')
                        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                        .join(' ');
                    dataValue = item;
                }
            } else {
                // For codes, display the PULL_XX format but when clicked use full format
                displayText = item;
                
                // User should see the full code when they click a suggestion
                dataValue = item;
            }
            
            return `<div class="suggestion-item" data-value="${dataValue}">${displayText}</div>`;
        }).join('');
        
        suggestionsDiv.style.display = 'block';
        
        // Add click event for suggestions
        suggestionsDiv.querySelectorAll('.suggestion-item').forEach(item => {
            item.addEventListener('click', function() {
                input.value = this.getAttribute('data-value');
                suggestionsDiv.style.display = 'none';
                convert();
            });
        });
    } else {
        suggestionsDiv.style.display = 'none';
    }
}

// Convert country name to code or vice versa
function convert() {
    const inputValue = input.value.trim();
    // Utilizamos toLowerCase solo para comparaciones, manteniendo el original para mostrar
    const lowerInputValue = inputValue.toLowerCase();
    
    if (!inputValue) {
        return;
    }
    
    if (mode === 'countryToCode') {
        convertCountryToCode(lowerInputValue);
    } else {
        convertCodeToCountry(inputValue);
    }
}

// Convert country name to code
function convertCountryToCode(countryName) {
    // Normalizar entrada para buscar insensible a mayúsculas/minúsculas y acentos
    const normalizedCountryName = normalizeText(countryName);
    
    // Make sure countryData is initialized
    if (!countryData || !countryData.countries || !countryData.details) {
        console.error('countryData is not fully initialized!');
        result.textContent = 'Error: Data not loaded';
        resultContainer.style.display = 'block';
        countryCard.style.display = 'none';
        return;
    }
    
    // Convertir de nombre en español a nombre en inglés para búsqueda
    let englishName = countryName;
    let spanishName = '';
    
    // Normalizar nombres en español para búsqueda
    const normalizedKeys = Object.keys(countryData.spanishNames).map(key => ({ 
        original: key, 
        normalized: normalizeText(key) 
    }));
    
    // Buscar coincidencia exacta (insensible a mayúsculas/minúsculas y acentos)
    const exactMatch = normalizedKeys.find(entry => entry.normalized === normalizedCountryName);
    
    if (exactMatch) {
        englishName = countryData.spanishNames[exactMatch.original];
        spanishName = exactMatch.original;
    }
    // Si no hay coincidencia exacta, buscar coincidencias parciales en español
    else {
        const spanishMatches = normalizedKeys
            .filter(entry => entry.normalized.includes(normalizedCountryName));
        
        if (spanishMatches.length > 0) {
            // Usar la primera coincidencia si hay varias
            spanishName = spanishMatches[0].original;
            englishName = countryData.spanishNames[spanishName];
        }
        // Si no hay coincidencia en español, se usa el valor original (inglés)
    }
    
    // Ahora buscar el código usando el nombre en inglés
    let code = countryData.countries[englishName];
    
    if (code) {
        result.textContent = code;
        resultContainer.style.display = 'block';
        
        // Mostrar detalles del país
        if (countryData.details && countryData.details[englishName]) {
            showCountryDetails(englishName);
            countryCard.style.display = 'block';
        } else {
            console.error('No details found for', englishName);
            countryCard.style.display = 'none';
        }
    } else {
        result.textContent = translations.countryNotFound;
        resultContainer.style.display = 'block';
        countryCard.style.display = 'none';
    }
}

// Convert code to country name
function convertCodeToCountry(code) {
    // Mantener el formato original pero normalizar para la búsqueda
    const normalizedCode = normalizeText(code);
    
    // Make sure countryData is initialized
    if (!countryData || !countryData.codes || !countryData.details) {
        console.error('countryData is not fully initialized!');
        result.textContent = 'Error: Data not loaded';
        resultContainer.style.display = 'block';
        countryCard.style.display = 'none';
        return;
    }
    
    // Handle both with and without PULL_ prefix
    let searchCode = normalizedCode;
    if (!normalizedCode.startsWith('pull_')) {
        searchCode = `pull_${normalizedCode}`;
    }
    
    // Buscar país con el código normalizado
    
    // Buscar con normalización pero sin alterar mayúsculas/minúsculas en lo que se muestra
    const englishName = countryData.codes[searchCode];
    
    if (englishName) {
        // Format the country name for display based on language
        let displayName;
        
        if (countryData.details[englishName]?.spanishName) {
            // Use Spanish name if available
            displayName = countryData.details[englishName].spanishName;
        } else {
            // Format the English name
            displayName = englishName.split(' ')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');
        }
        
        result.textContent = displayName;
        resultContainer.style.display = 'block';
        
        // Show country details safely
        if (countryData.details && countryData.details[englishName]) {
            showCountryDetails(englishName);
            // Ensure the country card is displayed
            countryCard.style.display = 'block';
        } else {
            console.error('No details found for', englishName);
            countryCard.style.display = 'none';
        }
    } else {
        result.textContent = translations.codeNotFound;
        resultContainer.style.display = 'block';
        countryCard.style.display = 'none';
    }
}

// Fix country details display
function showCountryDetails(countryName) {
    // Defensive check
    if (!countryData || !countryData.details) {
        console.error('Country data or details object missing');
        countryCard.style.display = 'none';
        return;
    }
    
    const details = countryData.details[countryName];
    
    if (!details) {
        countryCard.style.display = 'none';
        console.error('No details found for:', countryName);
        return;
    }
    
    // Mostrar detalles del país
    
    // Set basic info
    if (details.spanishName) {
    document.getElementById('country-name').textContent = details.spanishName;
    } else {
    document.getElementById('country-name').textContent = details.name;
    }
    
    document.getElementById('country-code').textContent = details.code;
    
    // Set the flag image if available
    const flagElement = document.getElementById('country-flag');
    if (flagElement && details.flag) {
        flagElement.style.backgroundImage = `url(${details.flag})`;
    } else if (flagElement) {
        // Si no hay bandera disponible, mostrar un color de fondo con el código del país
        flagElement.style.backgroundColor = '#f0f0f0';
        flagElement.style.display = 'flex';
        flagElement.style.alignItems = 'center';
        flagElement.style.justifyContent = 'center';
        flagElement.textContent = details.isoCode;
    }
    
    // Añadir enlace a Pull&Bear
    const pullBearLink = document.getElementById('pullbear-link');
    if (pullBearLink) {
        // Convertir el código ISO a minúsculas para la URL
        const isoCodeLower = details.isoCode.toLowerCase();
        pullBearLink.href = `https://www.pullandbear.com/${isoCodeLower}/`;
        pullBearLink.style.display = 'inline-flex';
    }
    
    // Set standard details
    document.getElementById('capital').textContent = details.capital || 'N/A';
    document.getElementById('population').textContent = details.population ? details.population.toLocaleString() : 'N/A';
    document.getElementById('region').textContent = details.region || 'N/A';
    document.getElementById('subregion').textContent = details.subregion || 'N/A';
    
    // Set API-sourced details
    document.getElementById('area').textContent = details.area || 'N/A';
    document.getElementById('timezones').textContent = details.timezones || 'N/A';
    document.getElementById('languages').textContent = details.languages || 'N/A';
    document.getElementById('currencies').textContent = details.currencies || 'N/A';
    // Ensure we have direct access to callingCodes field
    if (details.callingCodes) {
        document.getElementById('callingCode').textContent = details.callingCodes;
    } else if (details.isoCode && countryData.details[countryName] && countryData.details[countryName].idd) {
        // Extract directly from the country details
        const idd = countryData.details[countryName].idd;
        document.getElementById('callingCode').textContent = idd.root + (idd.suffixes?.[0] || '');
    } else {
        document.getElementById('callingCode').textContent = 'N/A';
    }
    document.getElementById('drivingSide').textContent = details.drivingSide || 'N/A';
    
    // Set business information
    const workingHoursEl = document.getElementById('workingHours');
    const businessCultureEl = document.getElementById('businessCulture');
    
    workingHoursEl.textContent = details.workingHours || 'Information not available';
    businessCultureEl.textContent = details.businessCulture || 'Information not available';
    
    // Generate holidays list
    const holidaysList = document.getElementById('holidays-list');
    holidaysList.innerHTML = '';
    
    console.log('Holidays for', details.name, ':', details.holidays);
    
    if (details.holidays && details.holidays.length > 0) {
        // Sort holidays by date
        const sortedHolidays = [...details.holidays].sort((a, b) => {
            const dateA = a.date.split('-'); // MM-DD format
            const dateB = b.date.split('-');
            // Compare months first, then days
            return dateA[0] - dateB[0] || dateA[1] - dateB[1];
        });
        
        sortedHolidays.forEach(holiday => {
            const [month, day] = holiday.date.split('-');
            const formattedDate = `${month}/${day}`;
            
            const holidayItem = document.createElement('div');
            holidayItem.className = 'holiday-item';
            
            const holidayDate = document.createElement('div');
            holidayDate.className = 'holiday-date';
            holidayDate.textContent = formattedDate;
            
            const holidayName = document.createElement('div');
            holidayName.className = 'holiday-name';
            holidayName.textContent = holiday.name;
            
            const localName = document.createElement('div');
            localName.className = 'holiday-local-name';
            localName.textContent = holiday.localName;
            
            holidayItem.appendChild(holidayDate);
            holidayItem.appendChild(holidayName);
            holidayItem.appendChild(localName);
            
            holidaysList.appendChild(holidayItem);
        });
    } else {
        holidaysList.innerHTML = '<div>No hay información de festivos disponible</div>';
    }
    
    // Update labels
    document.querySelectorAll('.detail-label, h3').forEach(label => {
        const key = label.getAttribute('data-key');
        if (key && translations[key]) {
            label.textContent = translations[key];
        }
    });
    
    // Make sure the country card is visible
    countryCard.style.display = 'block';
    console.log('Showing country card for:', details.name);
}

// Copy result to clipboard
function copyToClipboard() {
    if (!result.textContent || result.textContent === translations.countryNotFound || result.textContent === translations.codeNotFound) {
        return;
    }
    
    const textToCopy = result.textContent;
    
    navigator.clipboard.writeText(textToCopy).then(() => {
        // Show copied notification
        const originalText = copyButton.textContent;
        copyButton.textContent = translations.copied;
        
        setTimeout(() => {
            copyButton.textContent = originalText;
        }, 2000);
    });
    

}

// Show or hide loading indicator
function showLoading(show) {
    isLoading = show;
    loadingSpinner.style.display = show ? 'block' : 'none';
    
    // Disable input during loading
    input.disabled = show;
    document.getElementById('convert-button').disabled = show;
}

// Show or hide error message
function showError(show) {
    errorMessage.style.display = show ? 'block' : 'none';
    if (show) {
        errorMessage.textContent = translations.error;
    }
}

// Debounce function to limit how often a function is called
function debounce(func, wait) {
    let timeout;
    
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}