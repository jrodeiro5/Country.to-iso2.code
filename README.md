# Country Code Converter

A simple web application that converts between country names and their corresponding ISO codes with "PULL_" prefix.

## Features

- Convert country names to ISO codes (e.g., "Spain" → "PULL_ES")
- Convert ISO codes to country names (e.g., "PULL_ES" → "Spain")
- Dark/light mode toggle
- Autocomplete suggestions
- Copy to clipboard functionality
- Flag emoji display
- Responsive design

## Project Structure

```
country-code-converter/
├── index.html          # Main HTML file
├── css/
│   └── styles.css     # Styling
├── js/
│   ├── converter.js    # Core conversion logic
│   ├── ui.js          # UI interactions
│   └── data/
│       ├── countries.js  # Country codes data
│       └── flags.js      # Flag emoji data
└── README.md
```

## Usage

Just open `index.html` in a web browser to use the converter.

## Development

To modify or extend the converter:

1. Edit country codes in `js/data/countries.js`
2. Edit flag emojis in `js/data/flags.js`
3. Modify conversion logic in `js/converter.js`
4. Update UI interactions in `js/ui.js`
5. Style changes can be made in `css/styles.css`
