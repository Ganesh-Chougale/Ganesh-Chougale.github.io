import BINGO from "../../Assets/Utils/Bingo.js";

document.addEventListener('DOMContentLoaded', function () {
  try {
    const correctPassword = BINGO.PieValueExtra;
    const passwordInput = document.getElementById('passwordInput');
    const submitPasswordBtn = document.getElementById('submitPassword');
    const passwordProtectionDiv = document.getElementById('password-protection');
    const card = passwordProtectionDiv.querySelector(".card");
    const prompterContentDiv = document.getElementById('prompter-content');
    const passwordError = document.getElementById('passwordError');

    // Check if all elements exist
    if (!passwordInput || !submitPasswordBtn || !passwordProtectionDiv || !prompterContentDiv) {
      console.error('Password protection elements not found');
      return;
    }

    // Clear any previous session to require password on every visit
    sessionStorage.removeItem('prompterAccessGranted');

    function handleIncorrectPassword() {
      passwordInput.value = '';
      passwordError.classList.remove('d-none');
      card.classList.add('shake');
      setTimeout(() => card.classList.remove('shake'), 400);
      setTimeout(() => passwordError.classList.add('d-none'), 3000);
    }

    function handleCorrectPassword() {
      passwordProtectionDiv.classList.add('d-none');
      prompterContentDiv.classList.remove('d-none');
      sessionStorage.setItem('prompterAccessGranted', 'true');
    }

    submitPasswordBtn.addEventListener('click', function () {
      submitPasswordBtn.disabled = true;
      setTimeout(() => { submitPasswordBtn.disabled = false; }, 1000);

      if (passwordInput.value === correctPassword) {
        handleCorrectPassword();
      } else {
        handleIncorrectPassword();
      }
    });

    passwordInput.addEventListener('keypress', function (event) {
      if (event.key === 'Enter') {
        submitPasswordBtn.click();
      }
    });

  } catch (error) {
    console.error('Password protection error:', error);
  }
});
