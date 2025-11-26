import BINGO from "../Assets/Utils/Bingo.js"; // <-- Check spelling (Assets vs Assests)

document.addEventListener('DOMContentLoaded', function () {
  const correctPassword = BINGO.PieValue;
  const passwordInput = document.getElementById('passwordInput');
  const submitPasswordBtn = document.getElementById('submitPassword');
  const passwordProtectionDiv = document.getElementById('password-protection');
  const card = passwordProtectionDiv.querySelector(".card");
  const toolsContentDiv = document.getElementById('tools-content');
  const passwordError = document.getElementById('passwordError');

  // Clear any previous session to require password on every visit
  sessionStorage.removeItem('accessGranted');

  function handleIncorrectPassword() {
    passwordInput.value = '';
    passwordError.classList.remove('d-none');
    card.classList.add('shake');
    setTimeout(() => card.classList.remove('shake'), 400);
    setTimeout(() => passwordError.classList.add('d-none'), 3000);
  }

  submitPasswordBtn.addEventListener('click', function () {
    submitPasswordBtn.disabled = true;
    setTimeout(() => { submitPasswordBtn.disabled = false; }, 1000);

    if (passwordInput.value === correctPassword) {
      passwordProtectionDiv.classList.add('d-none');
      toolsContentDiv.classList.remove('d-none');
      sessionStorage.setItem('accessGranted', 'true');
    } else {
      handleIncorrectPassword();
    }
  });

  passwordInput.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
      submitPasswordBtn.click();
    }
  });
});
