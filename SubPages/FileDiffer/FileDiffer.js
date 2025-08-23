// SubPages/FileDiffer/FileDiffer.js
import BINGO from "../../Assets/Utils/Bingo.js";

document.getElementById("testBtn").addEventListener("click", () => {
  const out = document.getElementById("output");
  out.textContent = `PieValue is ${BINGO.PieValue}`;
});
