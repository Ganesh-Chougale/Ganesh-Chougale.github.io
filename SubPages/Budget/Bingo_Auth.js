import BINGO from "../../Assets/Utils/Bingo.js";

const gate = document.getElementById("password-protection");
const content = document.getElementById("budget-content");

const input = document.getElementById("passwordInput");
const button = document.getElementById("submitPassword");
const error = document.getElementById("passwordError");

// Auto-unlock for same tab session
if (sessionStorage.getItem("budgetUnlocked") === "true") {
  unlock();
}

button.addEventListener("click", checkPassword);
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") checkPassword();
});

function checkPassword() {
  if (input.value === BINGO.BudgetPassword) {
    sessionStorage.setItem("budgetUnlocked", "true");
    unlock();
  } else {
    error.classList.remove("d-none");
    input.value = "";
  }
}

function unlock() {
  gate.classList.add("d-none");
  content.classList.remove("d-none");
}
