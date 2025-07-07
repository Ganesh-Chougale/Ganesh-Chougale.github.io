// SubPages/Tools.js
document.addEventListener('DOMContentLoaded', function() {
    const correctPassword = "3.14";
    const passwordInput = document.getElementById('passwordInput');
    const submitPasswordBtn = document.getElementById('submitPassword');
    const passwordProtectionDiv = document.getElementById('password-protection');
    const toolsContentDiv = document.getElementById('tools-content');
    const passwordError = document.getElementById('passwordError');

    // Check if the user has already successfully entered the password (using sessionStorage)
    if (sessionStorage.getItem('accessGranted') === 'true') {
        passwordProtectionDiv.classList.add('d-none');
        toolsContentDiv.classList.remove('d-none');
    }

    submitPasswordBtn.addEventListener('click', function() {
        if (passwordInput.value === correctPassword) {
            passwordProtectionDiv.classList.add('d-none');
            toolsContentDiv.classList.remove('d-none');
            passwordError.classList.add('d-none');
            sessionStorage.setItem('accessGranted', 'true'); // Store access status
        } else {
            passwordInput.value = ''; // Clear the input
            passwordError.classList.remove('d-none');
        }
    });

    // Allow pressing Enter key to submit password
    passwordInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            submitPasswordBtn.click();
        }
    });
});