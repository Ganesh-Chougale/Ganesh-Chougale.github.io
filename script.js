document.addEventListener('DOMContentLoaded', function() {

    const yearParagraph = document.querySelector('footer .mb-0');
    if (yearParagraph) {
        yearParagraph.textContent = `© ${new Date().getFullYear()} Ganesh Chougale. All rights reserved.`;
    }

    const words = ["simple", "concise"];
    let i = 0;
    let j = 0;
    let currentWord = "";
    let isDeleting = false;
    const typewriterElement = document.getElementById('typewriter-text');

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

        let typeSpeed = 150;
        if (isDeleting) {
            typeSpeed = 75;
        }

        if (!isDeleting && j === currentWord.length) {
            typeSpeed = 1000;
            isDeleting = true;
        } else if (isDeleting && j === 0) {
            isDeleting = false;
            i = (i + 1) % words.length;
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }

    type();
});