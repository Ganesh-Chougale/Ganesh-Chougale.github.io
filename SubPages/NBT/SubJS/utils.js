import BINGO from "../../Assets/Utils/Bingo.js";

export async function sendToSheet(data, type) {
  try {
    const res = await fetch(`${BINGO.SheetConfig.url}?type=${type}`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" }
    });
    return await res.json();
  } catch (err) {
    console.error("Error sending to sheet:", err);
  }
}

export async function fetchFromSheet(type) {
  try {
    const res = await fetch(`${BINGO.SheetConfig.url}?type=${type}`);
    return await res.json();
  } catch (err) {
    console.error("Error fetching from sheet:", err);
    return [];
  }
}

// ✅ WhatsApp Integration
export function sendToWhatsApp(message, number = BINGO.WhatsAppNumber) {
  if (!number) {
    console.error("WhatsApp number not set in Bingo.js");
    return;
  }
  const encodedMsg = encodeURIComponent(message);
  const url = `https://wa.me/${number}?text=${encodedMsg}`;
  window.open(url, "_blank");
}

// ✅ Status Helper
export function showStatus(msg, isError = false) {
  const status = document.getElementById("status");
  if (!status) return;
  status.textContent = msg;
  status.className = isError ? "text-danger" : "text-success";
  setTimeout(() => (status.textContent = ""), 3000);
}
