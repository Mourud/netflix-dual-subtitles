# Netflix Double Subtitles Extension

This extension enhances your Netflix viewing experience by displaying subtitles in two languages simultaneously. It is especially useful for language learners or bilingual viewers who want to enjoy content in their native language while also practicing another.

## Features
- **Dual Subtitles:** Displays subtitles in two languages simultaneously.
- **Customizable Translation:** Allows selecting source and target languages for translation (in code only for now).
- **Google Translate Integration:** Utilizes Google Translate API for accurate translations.

## Getting Started

### Prerequisites
- A modern web browser (Works seamlessly for Safari, other browsers will need some tweaks)
- A Google Translate API key for fetching translations.

### Installation
1. Clone or download the repository:
  ```bash
  git clone https://github.com/yourusername/netflix-double-subtitles.git
  ```
2. Change languages to your preferences on content.js
3. Run the project on XCode
4. Enable Developer Mode.
5. Enable unsigned extensions.
6. Open your browser and navigate to the Extensions page and enable netflix-dual-subtitles

### Usage
1.	Open Netflix and play a video.
2.	The extension will automatically detect and display subtitles.
3.	By default, the original subtitles are displayed along with their translation in French.
4.	Customize the source and target languages by modifying the translateText function parameters in content.js.


## TODOs
-	Add OAuth2.0 for secure API key usage.
-	Enable user-selectable source and target languages from UI.
-	Optimize performance:
	-	Use batch API calls for multiple translations (If possible).
	-	Scope DOM observers to specific elements.

## Technical Details
-	Languages: JavaScript (for browser extension logic).
-	Dependencies: Google Translate API.
-	File Structure:
-	content.js: Main logic for handling subtitles, translation, and DOM manipulation.

## Known Issues
- **Performance**: Translation speed may vary based on the API response time.
- **UI**: If Netflix shows subtitles on top, dual subtitles get difficult to read
 

## Contributing

Contributions are welcome! To contribute:
1.	Fork the repository.
2.	Create a new branch:
  ```bash
  git checkout -b feature/YourFeatureName
  ```
3.	Commit your changes and push the branch:
  ```bash
  git commit -m "Add Your Feature"
  git push origin feature/YourFeatureName
  ```
4.	Open a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgments
- Powered by [Google Translate API](https://cloud.google.com/translate).
- Inspired by the need to make multilingual content more accessible.

Enjoy seamless language learning with Netflix!

