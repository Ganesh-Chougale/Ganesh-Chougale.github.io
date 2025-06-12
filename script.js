document.addEventListener('DOMContentLoaded', function() {
    // Dynamic Year in Footer
    const yearParagraph = document.querySelector('footer .mb-0');
    if (yearParagraph) {
        yearParagraph.textContent = `© ${new Date().getFullYear()} Ganesh Chougale. All rights reserved.`;
    }

    // Typewriter effect for header
    const words = ["simple", "concise"];
    let i = 0;
    let j = 0;
    let currentWord = "";
    let isDeleting = false;
    const typewriterElement = document.getElementById('typewriter-text'); // Target the new span by its ID

    function type() {
        if (!typewriterElement) return;

        currentWord = words[i];

        if (isDeleting) {
            typewriterElement.textContent = currentWord.substring(0, j - 1);
            j--;
        } else {
            typewriterElement.textContent = currentWord.substring(0, j + 1);
            j++;
        }

        // Adjust typing/deleting speed
        let typeSpeed = 150; // Typing speed
        if (isDeleting) {
            typeSpeed = 75; // Deleting speed is faster
        }

        if (!isDeleting && j === currentWord.length) {
            typeSpeed = 1000; // Pause at end of typing
            isDeleting = true;
        } else if (isDeleting && j === 0) {
            isDeleting = false;
            i = (i + 1) % words.length; // Move to next word
            typeSpeed = 500; // Pause before starting new word
        }

        setTimeout(type, typeSpeed);
    }

    type(); // Start the typewriter effect
});