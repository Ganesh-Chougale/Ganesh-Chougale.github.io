// SubPages/Vocabulary/Vocabulary.js

document.addEventListener('DOMContentLoaded', () => {
    // Get DOM elements
    const universalInput = document.getElementById('universalInput');
    // Removed translateBtn as it's no longer in use
    
    const marathiResultContainer = document.getElementById('marathiResultContainer');
    const hindiResultContainer = document.getElementById('hindiResultContainer');
    const englishResultContainer = document.getElementById('englishResultContainer'); 
    
    const marathiOutput = document.getElementById('marathiOutput');
    const hindiOutput = document.getElementById('hindiOutput');
    const englishOutput = document.getElementById('englishOutput'); 
    
    const loadingMessage = document.getElementById('loadingMessage');
    const errorMessage = document.getElementById('errorMessage');
    // Updated noResultFound to target the new container if applicable, or keep original
    const noResultFound = document.getElementById('noResultFound'); 
    const noResultFoundContainer = document.getElementById('noResultFoundContainer'); // Get the new container

    // --- Debounce Function ---
    let debounceTimer;
    const debounce = (func, delay) => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(func, delay);
    };

    // --- Core Translation Function ---
    async function fetchTranslation(text, targetLang) {
        if (!text || text.trim() === '') {
            return ''; 
        }

        const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`;

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            
            if (data && data[0] && Array.isArray(data[0][0])) {
                return data[0].map(sentence => sentence[0]).join('');
            } else if (data && data[0] && typeof data[0][0] === 'string') {
                return data[0][0];
            } else {
                console.warn('Unexpected API response structure:', data);
                return ''; 
            }

        } catch (error) {
            console.error(`Error translating to ${targetLang}:`, error); 
            return `Translation failed for ${targetLang}.`;
        }
    }

    // --- Display Results Function ---
    function displayResults(translations, originalWord) {
        // Hide all result containers and messages initially
        marathiResultContainer.classList.add('d-none');
        hindiResultContainer.classList.add('d-none');
        englishResultContainer.classList.add('d-none');
        noResultFound.classList.add('d-none'); // Hide the text
        if (noResultFoundContainer) { // Hide its container too
            noResultFoundContainer.classList.add('d-none');
        }
        errorMessage.classList.add('d-none');

        let hasTranslation = false;

        if (translations.marathi && translations.marathi !== `Translation failed for mr.`) {
            marathiOutput.textContent = translations.marathi;
            marathiResultContainer.classList.remove('d-none');
            hasTranslation = true;
        }
        if (translations.hindi && translations.hindi !== `Translation failed for hi.`) {
            hindiOutput.textContent = translations.hindi;
            hindiResultContainer.classList.remove('d-none');
            hasTranslation = true;
        }
        if (translations.english && translations.english !== `Translation failed for en.`) {
            englishOutput.textContent = translations.english;
            englishResultContainer.classList.remove('d-none');
            hasTranslation = true;
        }

        if (!hasTranslation && originalWord.trim() !== '') {
            noResultFound.classList.remove('d-none'); // Show the text
            if (noResultFoundContainer) { // Show its container
                noResultFoundContainer.classList.remove('d-none');
            }
        }
    }

    // --- Main Translation Handler ---
    async function handleTranslation() {
        const text = universalInput.value.trim();

        if (text === '') {
            displayResults({}); 
            noResultFound.classList.add('d-none');
            if (noResultFoundContainer) {
                noResultFoundContainer.classList.add('d-none');
            }
            errorMessage.classList.add('d-none');
            loadingMessage.classList.add('d-none');
            return;
        }

        loadingMessage.classList.remove('d-none');
        errorMessage.classList.add('d-none'); 
        noResultFound.classList.add('d-none'); 
        if (noResultFoundContainer) {
            noResultFoundContainer.classList.add('d-none');
        }

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
            displayResults({});
        } finally {
            loadingMessage.classList.add('d-none'); 
        }
    }

    // --- Event Listeners ---
    universalInput.addEventListener('input', () => {
        debounce(handleTranslation, 500); 
    });

    // Removed translateBtn.addEventListener('click', handleTranslation);
    // Removed sourceLanguageSelect related event listeners
});