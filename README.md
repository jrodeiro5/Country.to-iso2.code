# Country Code Converter

An improved tool for converting between country names and ISO country codes with PULL_ prefix.

## Features

- **Convert Country Names to Codes**: Enter a country name (e.g., "Spain") to get its ISO code with PULL_ prefix (e.g., "PULL_ES").
- **Convert Codes to Country Names**: Enter a code (with or without PULL_ prefix) to get the corresponding country name.
- **API Integration**: Uses the REST Countries API to ensure comprehensive and up-to-date country information.
- **Offline Fallback**: Still works without internet connection using built-in country data.
- **Detailed Country Information**: Shows additional information like capital, population, region, and more.
- **Bilingual Support**: Available in English and Spanish.
- **Dark Mode**: Toggle between light and dark themes for better viewing comfort.
- **Mobile Friendly**: Responsive design works on all devices.
- **Smart Search**: Suggestions appear as you type for faster use.

## Technical Improvements

- **API Integration**: Fetches up-to-date country data from REST Countries API
- **Local Caching**: Stores data in localStorage for faster loading and offline use
- **Modular Code**: Separated HTML, CSS, and JavaScript for better maintainability
- **Improved UX**: Enhanced interface with better feedback and animations
- **Optimized Code**: Cleaned up codebase, removed debugging logs, optimized functions
- **Standard JSON Format**: Properly formatted JSON for better compatibility
- **Enhanced Search**: Improved search algorithm with accent and case insensitivity
- **Spanish Support**: Focused on Spanish language user experience

## Usage

1. Choose conversion mode (Country to Code or Code to Country)
2. Type the country name or code in the input field
3. Click "Convert" or select from suggestions
4. View the result and additional country information
5. Copy the result to clipboard with the "Copy" button

## Installation

No installation required. Access the tool directly through GitHub Pages:
https://jrodeiro5.github.io/Country.to-iso2.code/

## Local Development

1. Clone the repository:
```
git clone https://github.com/jrodeiro5/Country.to-iso2.code.git
```

2. Open the project folder and edit the files as needed

3. Push changes to GitHub to update the GitHub Pages site

## License

This project is under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [REST Countries API](https://restcountries.com/) for country data
- [Font Awesome](https://fontawesome.com/) for icons
- [Google Fonts](https://fonts.google.com/) for typography
