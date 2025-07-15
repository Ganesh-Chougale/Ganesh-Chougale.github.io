// SubPages/TTS_Notes/TTS_Notes.js

// **IMPORTANT SECURITY NOTE:**
// For a production application, NEVER expose your API key directly in client-side JavaScript.
// Use a backend server to proxy your API requests to OpenAI to keep your key secure.
// This example is for demonstration purposes only.
const OPENAI_API_KEY = 'YOUR_OPENAI_API_KEY'; // Replace with your actual key or environment variable

document.addEventListener('DOMContentLoaded', function() {
    const inputText = document.getElementById('inputText');
    const filenameInput = document.getElementById('filenameInput');

    const enableAdvancedOptionsToggle = document.getElementById('enableAdvancedOptionsToggle');
    const advancedOptionsContainer = document.getElementById('advancedOptionsContainer');
    const instructionsText = document.getElementById('instructionsText');
    const voiceSelect = document.getElementById('voiceSelect');

    const listenSpeechBtn = document.getElementById('listenSpeechBtn');
    const downloadSpeechBtn = document.getElementById('downloadSpeechBtn');
    const loadingMessage = document.getElementById('loadingMessage');
    const errorMessage = document.getElementById('errorMessage');
    const audioPlayerContainer = document.getElementById('audioPlayerContainer');
    const audioPlayer = document.getElementById('audioPlayer');

    let generatedAudioBlob = null; // To store the blob for download

    // Default voice instructions for when advanced options are enabled
    const defaultInstructions = `Voice Affect: Soft, gentle, soothing; embody tranquility.

Tone: Calm, reassuring, peaceful; convey genuine warmth and serenity.

Pacing: Slow, deliberate, and unhurried; pause gently after instructions to allow the listener time to relax and follow along.

Emotion: Deeply soothing and comforting; express genuine kindness and care.

Pronunciation: Smooth, soft articulation, slightly elongating vowels to create a sense of ease.

Pauses: Use thoughtful pauses, especially between breathing instructions and visualization guidance, enhancing relaxation and mindfulness.
`;
    // Set instructions only if advanced options are enabled by default (which they won't be now)
    // We will set this when the toggle is turned ON for the first time or if user clears it.

    // Set initial state of advanced options
    function setAdvancedOptionsState() {
        if (enableAdvancedOptionsToggle.checked) {
            advancedOptionsContainer.classList.remove('d-none');
            // Ensure instructions are populated when enabled, but only if they are empty
            if (instructionsText.value.trim() === '') {
                instructionsText.value = defaultInstructions;
            }
            // Default select 'alloy' when advanced options are enabled for general use,
            // or 'ash' if we want to push the OPENAI.fm feature. Let's stick with 'alloy' as the new default
            // when advanced is turned on, as per HTML.
            // If you specifically want 'ash' to be the default ONLY when the toggle is enabled
            // and instructions are shown, you'd set voiceSelect.value = 'ash'; here.
            // Current HTML has alloy as default *when* advanced is shown.
        } else {
            advancedOptionsContainer.classList.add('d-none');
        }
    }

    // Initialize state on load
    setAdvancedOptionsState(); // This will hide it by default now

    // Toggle listener
    enableAdvancedOptionsToggle.addEventListener('change', setAdvancedOptionsState);

    // Function to generate speech
    async function generateSpeech() {
        const input = inputText.value.trim();
        const filename = filenameInput.value.trim();

        // Clear previous messages and audio
        errorMessage.classList.add('d-none');
        audioPlayerContainer.classList.add('d-none');
        audioPlayer.removeAttribute('src');
        audioPlayer.load();
        downloadSpeechBtn.classList.add('d-none');
        generatedAudioBlob = null;

        if (!input) {
            errorMessage.textContent = 'Please enter some text to convert.';
            errorMessage.classList.remove('d-none');
            return;
        }

        loadingMessage.classList.remove('d-none');
        listenSpeechBtn.disabled = true;
        downloadSpeechBtn.disabled = true;

        // Build request body dynamically based on toggle state
        const requestBody = {
            model: 'gpt-4o-mini-tts',
            input: input,
            response_format: 'mp3'
        };

        if (enableAdvancedOptionsToggle.checked) {
            requestBody.voice = voiceSelect.value;
            requestBody.instructions = instructionsText.value.trim();
        } else {
            // If advanced options are disabled, use a generic default voice (e.g., 'nova' or 'alloy')
            // and omit instructions for a simpler request.
            requestBody.voice = 'nova'; // Or 'alloy', 'echo', etc.
            // No instructions needed.
        }

        try {
            const response = await fetch('https://api.openai.com/v1/audio/speech', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${OPENAI_API_KEY}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`API Error: ${response.status} - ${errorData.error ? errorData.error.message : 'Unknown error'}`);
            }

            generatedAudioBlob = await response.blob();
            const audioUrl = URL.createObjectURL(generatedAudioBlob);

            audioPlayer.src = audioUrl;
            audioPlayerContainer.classList.remove('d-none');
            audioPlayer.play();
            downloadSpeechBtn.classList.remove('d-none');
            downloadSpeechBtn.disabled = false;

        } catch (error) {
            console.error('Error generating speech:', error);
            errorMessage.textContent = `Failed to generate speech: ${error.message}`;
            errorMessage.classList.remove('d-none');
            downloadSpeechBtn.classList.add('d-none');
        } finally {
            loadingMessage.classList.add('d-none');
            listenSpeechBtn.disabled = false;
        }
    }

    // Listen button functionality
    listenSpeechBtn.addEventListener('click', generateSpeech);

    // Download button functionality
    downloadSpeechBtn.addEventListener('click', () => {
        if (generatedAudioBlob) {
            const defaultFilename = filenameInput.value.trim() || 'audio_snippet';
            const fileExtension = '.mp3';

            const a = document.createElement('a');
            a.href = URL.createObjectURL(generatedAudioBlob);
            a.download = `${defaultFilename}${fileExtension}`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(a.href);
        } else {
            errorMessage.textContent = 'No audio generated yet to download.';
            errorMessage.classList.remove('d-none');
        }
    });

    // Optional: Add default filename based on current date/time
    const now = new Date();
    const defaultFilename = `audio_${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}_${now.getHours().toString().padStart(2, '0')}${now.getMinutes().toString().padStart(2, '0')}${now.getSeconds().toString().padStart(2, '0')}`;
    filenameInput.value = defaultFilename;
});