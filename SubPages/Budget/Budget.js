function money(n) {
  return n.toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  });
}

// Font selection function
function selectFont(fontChoice) {
  // Define font mappings
  const fontMap = {
    'cursive': 'cursive',
    'comic': "'Comic Sans MS', cursive",
    'lucida': "'Lucida Handwriting', cursive"
  };
  
  // Update CSS for the selected font
  const style = document.createElement('style');
  style.textContent = `
    h4, .label, .rule summary, .btn, .section-title {
      font-family: ${fontMap[fontChoice]} !important;
    }
  `;
  document.head.appendChild(style);
  
  // Store the choice in localStorage
  localStorage.setItem('selectedHandwritingFont', fontChoice);
}

// Load saved font choice on page load
document.addEventListener('DOMContentLoaded', function() {
  const savedFont = localStorage.getItem('selectedHandwritingFont');
  if (savedFont) {
    selectFont(savedFont);
  }
});

function calculate() {
  const income = Number(document.getElementById("income").value || 0);

  const needs = income * 0.45;
  const invest = income * 0.30;
  const wants = income * 0.10;
  const festival = income * 0.10;
  const emergency = income * 0.05;

  const buffer = income * 0.05;
  const reserveMin = income * 0.05;
  const reserveMax = income * 0.10;

  document.getElementById("needs").innerText = money(needs);
  document.getElementById("invest").innerText = money(invest);
  document.getElementById("wants").innerText = money(wants);
  document.getElementById("festival").innerText = money(festival);
  document.getElementById("emergency").innerText = money(emergency);

  document.getElementById("buffer").innerText = money(buffer);
  document.getElementById("reserve").innerText =
    `${money(reserveMin)} – ${money(reserveMax)}`;

  document.getElementById("general").innerText = money(festival * 0.60);
  document.getElementById("diwali").innerText = money(festival * 0.40);

  document.getElementById("cy").innerText = money(needs);
  document.getElementById("red").innerText = money(needs);
  document.getElementById("yellow").innerText = money(needs * 3);
  document.getElementById("green").innerText = money(needs * 6);
}
