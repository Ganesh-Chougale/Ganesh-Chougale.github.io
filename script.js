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

    // Project Modal Functionality
    const projectWrappers = document.querySelectorAll('.project-wrapper');
    const projectModal = new bootstrap.Modal(document.getElementById('projectModal'));
    const modalContent = document.getElementById('modalProjectContent');
    const modalTitle = document.getElementById('projectModalLabel');

    projectWrappers.forEach(wrapper => {
        wrapper.addEventListener('click', function() {
            // Clone the project content
            const projectCard = this.cloneNode(true);
            
            // Remove the click handler and cursor style from the cloned element
            projectCard.style.cursor = 'default';
            projectCard.classList.remove('project-wrapper');
            
            // Get the project title
            const projectTitle = projectCard.querySelector('.card-title').textContent;
            
            // Update modal title
            modalTitle.textContent = projectTitle;
            
            // Clear previous content and add new content
            modalContent.innerHTML = '';
            
            // Create a container for the fullscreen project
            const fullscreenContainer = document.createElement('div');
            fullscreenContainer.className = 'container-fluid h-100';
            fullscreenContainer.innerHTML = `
                <div class="row h-100 align-items-center justify-content-center">
                    <div class="col-12 col-lg-10">
                        ${projectCard.innerHTML}
                    </div>
                </div>
            `;
            
            modalContent.appendChild(fullscreenContainer);
            
            // Show the modal
            projectModal.show();
        });
    });
});

const widget = document.getElementById("careerWidget");
const toggle = document.getElementById("careerToggle");

toggle.addEventListener("click", () => {
    widget.classList.toggle("open");
});
