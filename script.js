$(document).ready(function() {

    // Update footer year
    $('footer .mb-0').text(`© ${new Date().getFullYear()} Ganesh Chougale. All rights reserved.`);

    // Typewriter effect
    const words = ["simple", "concise"];
    let i = 0, j = 0, currentWord = "", isDeleting = false;
    const $typewriter = $('#typewriter-text');

    function type() {
        if ($typewriter.length === 0) return;

        currentWord = words[i];

        if (isDeleting) {
            $typewriter.text(currentWord.substring(0, j - 1));
            j--;
        } else {
            $typewriter.text(currentWord.substring(0, j + 1));
            j++;
        }

        let typeSpeed = isDeleting ? 75 : 150;

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
    const $projectWrappers = $('.project-wrapper');
    const projectModal = new bootstrap.Modal($('#projectModal')[0]);
    const $modalContent = $('#modalProjectContent');
    const $modalTitle = $('#projectModalLabel');

    $projectWrappers.each(function() {
        $(this).on('click', function() {
            // Clone the project content
            const $projectCard = $(this).clone();

            // Remove click handler and cursor
            $projectCard.css('cursor', 'default').removeClass('project-wrapper');

            // Update modal title
            const projectTitle = $projectCard.find('.card-title').text();
            $modalTitle.text(projectTitle);

            // Clear previous content
            $modalContent.empty();

            // Add fullscreen container
            const $fullscreenContainer = $(`
                <div class="container-fluid h-100">
                    <div class="row h-100 align-items-center justify-content-center">
                        <div class="col-12 col-lg-10">
                            ${$projectCard.html()}
                        </div>
                    </div>
                </div>
            `);

            $modalContent.append($fullscreenContainer);

            // Show modal
            projectModal.show();
        });
    });

    // Career widget toggle
    const $widget = $("#careerWidget");
    const $toggle = $("#careerToggle");

    $toggle.on("click", function() {
        $widget.toggleClass("open");
    });
});
