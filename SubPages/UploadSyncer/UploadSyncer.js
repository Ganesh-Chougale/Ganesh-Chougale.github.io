import BINGO from "../../Assets/Utils/Bingo.js";

document.addEventListener('DOMContentLoaded', () => {
    const correctPassword = BINGO.UploadSyncer;
    const passwordInput = document.getElementById('passwordInput');
    const submitBtn = document.getElementById('submitPassword');
    const protectionDiv = document.getElementById('password-protection');
    const card = protectionDiv.querySelector(".card");
    const passwordError = document.getElementById('passwordError');

    function handleIncorrectPassword() {
        passwordInput.value = '';
        passwordError.classList.remove('d-none');
        card.classList.add('shake');
        setTimeout(() => card.classList.remove('shake'), 400);
        setTimeout(() => passwordError.classList.add('d-none'), 3000);
    }

    submitBtn.addEventListener('click', () => {
        submitBtn.disabled = true;
        setTimeout(() => { submitBtn.disabled = false; }, 1000);

        if (passwordInput.value === correctPassword) {
            window.location.href = BINGO.scriptUrl.UploadSyncerUrl; // redirect target
        } else {
            handleIncorrectPassword();
        }
    });

    passwordInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') submitBtn.click();
    });
});
