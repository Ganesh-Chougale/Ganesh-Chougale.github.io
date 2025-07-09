document.addEventListener('DOMContentLoaded', () => {
    const universalInput = document.getElementById('universalInput');
    const marathiResultContainer = document.getElementById('marathiResultContainer');
    const hindiResultContainer = document.getElementById('hindiResultContainer');
    const englishResultContainer = document.getElementById('englishResultContainer');
    const marathiOutput = document.getElementById('marathiOutput');
    const hindiOutput = document.getElementById('hindiOutput');
    const englishOutput = document.getElementById('englishOutput');
    const loadingMessage = document.getElementById('loadingMessage');
    const errorMessage = document.getElementById('errorMessage');
    const noResultFound = document.getElementById('noResultFound');
    const noResultFoundContainer = document.getElementById('noResultFoundContainer');

    // Updated elements for CSV copy box
    const csvOutputContainer = document.getElementById('csvOutputContainer'); // The parent div that's clickable
    const csvOutputDisplay = document.getElementById('csvOutputDisplay'); // The div where CSV text is displayed
    const copyFeedback = document.getElementById('copyFeedback');

    let debounceTimer;
    const debounce = (func, delay) => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(func, delay);
    };

    async function fetchTranslation(text, targetLang) {
        if (!text || text.trim() === '') {
            return '';
        }
        // Using a more robust Google Translate API endpoint (still unofficial, for demonstration)
        // For production, consider official, paid APIs like Google Cloud Translation API.
        const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                // If response status is not OK (e.g., 404, 500), throw an error
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            // The structure for single words or short phrases often returns data[0][0][0]
            if (data && data[0] && Array.isArray(data[0][0]) && data[0][0][0]) {
                return data[0][0][0]; // Extract the main translation
            } else if (data && data[0] && typeof data[0][0] === 'string') {
                return data[0][0]; // Fallback for other structures
            } else {
                console.warn('Unexpected API response structure:', data);
                return ''; // Return empty string for unexpected structure
            }
        } catch (error) {
            console.error(`Error translating to ${targetLang}:`, error);
            // Return an empty string or a specific error message if translation fails
            return ''; // Changed to empty string to avoid "Translation failed for X" in CSV
        }
    }

    function displayResults(translations, originalWord) {
        // Hide all translation containers initially
        marathiResultContainer.classList.add('d-none');
        hindiResultContainer.classList.add('d-none');
        englishResultContainer.classList.add('d-none');
        noResultFound.classList.add('d-none');
        if (noResultFoundContainer) {
            noResultFoundContainer.classList.add('d-none');
        }
        errorMessage.classList.add('d-none');
        csvOutputContainer.classList.add('d-none'); // Hide CSV container by default

        let hasTranslation = false;
        let marathiTrans = '';
        let hindiTrans = '';
        let englishTrans = '';

        if (translations.marathi && translations.marathi !== '') { // Check against empty string now
            marathiOutput.textContent = translations.marathi;
            marathiResultContainer.classList.remove('d-none');
            marathiTrans = translations.marathi;
            hasTranslation = true;
        }
        if (translations.hindi && translations.hindi !== '') { // Check against empty string now
            hindiOutput.textContent = translations.hindi;
            hindiResultContainer.classList.remove('d-none');
            hindiTrans = translations.hindi;
            hasTranslation = true;
        }
        if (translations.english && translations.english !== '') { // Check against empty string now
            englishOutput.textContent = translations.english;
            englishResultContainer.classList.remove('d-none');
            englishTrans = translations.english;
            hasTranslation = true;
        }

        if (hasTranslation) {
            // Populate CSV output display
            csvOutputDisplay.textContent = `${originalWord}, ${marathiTrans}, ${hindiTrans}`;
            csvOutputContainer.classList.remove('d-none'); // Show CSV container
        } else if (originalWord.trim() !== '') {
            // Only show "No translation found" if the input is not empty and no translation was found
            noResultFound.classList.remove('d-none');
            if (noResultFoundContainer) {
                noResultFoundContainer.classList.remove('d-none');
            }
            csvOutputContainer.classList.add('d-none'); // Ensure CSV container is hidden if no translation
        }
        // Clear CSV display if no translation or input is empty
        if (!hasTranslation && originalWord.trim() === '') {
            csvOutputDisplay.textContent = '';
        }
    }

    async function handleTranslation() {
        const text = universalInput.value.trim();
        if (text === '') {
            displayResults({}); // Clear previous results and hide containers
            noResultFound.classList.add('d-none');
            if (noResultFoundContainer) {
                noResultFoundContainer.classList.add('d-none');
            }
            errorMessage.classList.add('d-none');
            loadingMessage.classList.add('d-none');
            csvOutputContainer.classList.add('d-none'); // Also hide CSV when input is empty
            csvOutputDisplay.textContent = ''; // Clear the CSV display content
            return;
        }

        loadingMessage.classList.remove('d-none');
        errorMessage.classList.add('d-none');
        noResultFound.classList.add('d-none');
        if (noResultFoundContainer) {
            noResultFoundContainer.classList.add('d-none');
        }
        csvOutputContainer.classList.add('d-none'); // Hide CSV during loading
        csvOutputDisplay.textContent = ''; // Clear CSV display during loading

        try {
            const translations = {};
            const targetLanguages = ['en', 'mr', 'hi'];
            const promises = targetLanguages.map(target =>
                fetchTranslation(text, target)
                    .then(result => ({ target, result }))
            );

            const results = await Promise.all(promises);
            results.forEach(({ target, result }) => {
                if (target === 'mr') translations.marathi = result;
                if (target === 'hi') translations.hindi = result;
                if (target === 'en') translations.english = result;
            });

            displayResults(translations, text);
        } catch (error) {
            console.error('Overall translation error:', error);
            errorMessage.textContent = 'An error occurred during translation. Please try again.';
            errorMessage.classList.remove('d-none');
            displayResults({}); // Clear results on error
            csvOutputContainer.classList.add('d-none'); // Hide CSV on error
            csvOutputDisplay.textContent = ''; // Clear CSV display on error
        } finally {
            loadingMessage.classList.add('d-none');
        }
    }

    // Event listener for clicking anywhere on the CSV output container
    csvOutputContainer.addEventListener('click', async () => {
        const textToCopy = csvOutputDisplay.textContent;
        if (textToCopy) { // Only attempt to copy if there's text
            try {
                await navigator.clipboard.writeText(textToCopy);
                copyFeedback.classList.remove('d-none');
                setTimeout(() => {
                    copyFeedback.classList.add('d-none');
                }, 1500); // Hide "Copied!" message after 1.5 seconds
            } catch (err) {
                console.error('Failed to copy text: ', err);
                // Optionally, provide user feedback that copying failed
            }
        }
    });

    universalInput.addEventListener('input', () => {
        debounce(handleTranslation, 500);
    });
});